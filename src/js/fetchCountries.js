import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(country) {
  const url = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(resp => {
      if (resp.status === 404) {
        Notify.failure('Oops, there is no country with that name');
      }
      return resp.json();
    })
    .catch(error => error);
}
