export {fetchCountries};

function fetchCountries(name) {
    return fetch(API_URL + name + "?fields=" + filterFields.join(",")).then(r => r.json())
}