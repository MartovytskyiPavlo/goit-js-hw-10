import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import {fetchCountries} from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;



const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


const debouncedHandle = debounce(get_country, 300)

input.addEventListener("input",debouncedHandle);

function get_country() {
    const country = input.value.trim();    
    fetchCountries(country).then(renderCard);
}

function renderCard(data) {
    if (data.status == 404 && data.message === "Not Found") {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length > 1) {
        countryList.innerHTML = prepareList(data);
        countryInfo.innerHTML = "";
    } else {
        console.log(data);
        countryList.innerHTML = "";
        countryInfo.innerHTML = prepareInfo(data[0]);
    }
}

// function fetchCountries(name) {
//     return fetch(API_URL + name + "?fields=" + filterFields.join(",")).then(r => r.json())
// }


function getLanguages(languages) { 
    let result = "";

    for (let key in languages) {
        result = result + languages[key] + ", ";
    }

    return result.slice(0, -2);    
}


function getOneCountry(country) {
    return `<div class="Container">
                <img alt="${country.name.official}" src="${country.flags.png}" class='Flag'></img>
                <div><b>${country.name.official}</b></div>
            </div>`;
}

function prepareList(data) {
    let result = "";
    for (const item of data) {
        result += getOneCountry(item);
    }

    return result;
}

function prepareInfo(data) {
    return `<div class="Container">
                <img alt="${data.name.official}" src="${data.flags.png}" class='Flag'></img>
                <div class="Country"><b>${data.name.official}</b></div>
            </div>
            <div class='Capital'><b>Capital: </b>${data.capital}</div>
            <div class='Population'><b>Country: </b>${data.population}</div>
            <div class='Languages'><b>Languages: </b>${getLanguages(data.languages)}</div>`;
}

