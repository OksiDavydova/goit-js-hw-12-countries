import "./sass/main.scss";
import _debounce from "lodash.debounce";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

import getRefs from './js/refs.js';
import { fetchCountries } from "./js/fetchCountries.js";
import markupCountryInfo from './js/markup-info.js';
import markupList from './js/markup-list.js';

const refs = getRefs();
let searchQuery = "";

refs.search.addEventListener("input", _debounce(onSearchCountry, 500));

function onSearchCountry() {
  refs.countryOverlay.innerHTML = ''; //clear input
  searchQuery = refs.search.value;
  // console.log(searchQuery);
  fetchCountries(searchQuery)
    .then(renderCollection)
    .catch((error) => console.log(error))
}

function renderCollection(countries) {
  if (countries.length > 10) {
    return error({
      text: "Too many matches found. Please enter a more specific query!",
    });
  }
  if (countries.length >= 2 && countries.length <= 10) {
    markupList(countries);
    return;
  }
  markupCountryInfo(countries);
}


