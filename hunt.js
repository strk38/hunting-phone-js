const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phone);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {

    const phoneContianer = document.getElementById("phone-container");
    // clear phoneContianer
    phoneContianer.innerHTML = '';

    // show all button unhide if items more than 5
    const showAllContianer = document.getElementById("show-all-container");
    if (phones.length > 12 && !isShowAll) {
        showAllContianer.classList.remove('hidden');
    }
    else {
        showAllContianer.classList.add('hidden');
    }
    // display only 5 items
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact w-96 bg-slate-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="mt-4"><img src=${phone.image}
        alt="phones" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.brand}</h2>
            <p>${phone.phone_name}</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContianer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// const handleSearch2 = () => {
//     const searchField = document.getElementById("search-field");
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else { loadingSpinner.classList.add('hidden'); }
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const details = data.data;
    console.log(details);
    showPhoneDetails(details);
}

const showPhoneDetails = (phone) => {
    show_details_modal.showModal();
    const phoneName = document.getElementById("show-detail-phone-name");
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById("show-detail-container");
    showDetailContainer.innerHTML = `
    <img src=${phone.image} alt='' />
    <p><span> Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span> Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span> Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span> Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span> Release Date:</span>${phone?.releaseDate}</p>
    `;
}

const handleShowAll = () => {
    handleSearch(true)
}
// https://openapi.programming-hero.com/api/phone/${id}
