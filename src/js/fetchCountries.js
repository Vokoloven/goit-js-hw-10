export function fetchCountries(country) {
  const url = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(respone => {
      return respone.json();
    })
    .catch(error => error);
}
