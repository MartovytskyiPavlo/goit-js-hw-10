import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
    country = "ge";
    
    const data=fetchCountries(country);
    countryList.innerHTML = "<pre>" + JSON.stringify(data, null, "  ") + "</pre>";
}

function fetchCountries(name) {
    return fetch(API_URL+name+ "?fields=" + filterFields.join(",")).then(response => { console.log(response.json()); return response.json(); }) 
}
