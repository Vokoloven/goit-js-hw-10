import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
  listOfCountries: document.querySelector('.country-list'),
  infoOfCountries: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(inputCountryName, DEBOUNCE_DELAY)
);

function inputCountryName(e) {
  const countryName = e.target.value.trim();

  if (countryName === '') {
    resetRequest();
  } else {
    resetRequest();
    fetchCountries(countryName).then(countries => disperseCountries(countries));
  }
}

function disperseCountries(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  for (let i = 0; i < countries.length; i += 1) {
    const countriesObj = {
      countryName: countries[i].name.common,
      countryNameOfficial: countries[i].name.official,
      countryCapital: countries[i].capital,
      countryPopupaltion: countries[i].population,
      countryFlagsSvg: countries[i].flags.svg,
      countryLanguages: countries[i].languages,
    };

    countriesObj.countryLanguages = Object.values(
      countriesObj.countryLanguages
    );
    countriesObj.countryLanguages = countriesObj.countryLanguages.join(', ');

    if (countries.length > 2 && countries.length < 10) {
      getCoutriesListResult(countriesObj);
    } else if (countries.length === 1) {
      getCountryInfo(countriesObj);
    }
  }
}

function getCoutriesListResult({ countryName, countryFlagsSvg }) {
  refs.listOfCountries.insertAdjacentHTML(
    'beforeend',
    `<li><img src=" ${countryFlagsSvg}" alt="Country Flag" width="20px"><span> ${countryName}</span></li>`
  );
  refs.listOfCountries.style.listStyleType = 'none';
}

function getCountryInfo({
  countryNameOfficial,
  countryCapital,
  countryPopupaltion,
  countryFlagsSvg,
  countryLanguages,
}) {
  refs.infoOfCountries.insertAdjacentHTML(
    'beforeend',

    `<ul style="list-style-type: none" >
  <li><img src="${countryFlagsSvg}" alt="Country Flag" width="40px"></img><span style="font-size: 30px  "><b> ${countryNameOfficial}</b></span></li>
    <li><span><b>Capital:</b> ${countryCapital}</span></li>
    <li><span><b>Population</b>: ${countryPopupaltion}</span></li>
    <li><span><b>Languages</b>: ${countryLanguages}</span></li>
  </ul>`
  );
}

function resetRequest() {
  refs.listOfCountries.innerHTML = '';
  refs.infoOfCountries.innerHTML = '';
}
