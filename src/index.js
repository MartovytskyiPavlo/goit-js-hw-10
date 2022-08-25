import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;

const API_URL = "https://restcountries.com/v3.1/name/";
const filterFields = [
    "name",             // имя страны
    "capital",          // столица
    "population",       // население
    "flags",            // ссылка на изображение флага
    "languages"         // массив языков
  ];

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

input.addEventListener("input",get_country);

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
        countryList.innerHTML = "<pre>" + JSON.stringify(data, null, "  ") + "</pre>";
    }
}

function fetchCountries(name) {
    return fetch(API_URL + name + "?fields=" + filterFields.join(",")).then(r => r.json())
}

