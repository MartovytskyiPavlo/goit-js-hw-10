import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import {fetchCountries, renderCard} from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");



const debouncedHandle = debounce(get_country, DEBOUNCE_DELAY)

input.addEventListener("input",debouncedHandle);

function get_country() {
    const country = input.value.trim(); 
    if (country !== '') {
        fetchCountries(country).then(renderCard);
    }
}



