import "./sass/main.scss";
import { error, alert } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

import articleTpl from "./template/article-tpl.hbs";
import countriesListTpl from "./template/countries-list-tpl.hbs";
import _debounce from "lodash.debounce";
import { fetchCountries } from "./js/fetchCountries.js";

const refs = {
  search: document.querySelector("#search"),
  country: document.querySelector(".country"),
};
let searchQuery = "";

refs.search.addEventListener("input", _debounce(onSearchCountry, 500));

function onSearchCountry() {
  refs.country.innerHTML = ''; //clear input
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

function markupList(countries) {
  const markupList = countriesListTpl(countries);
  refs.country.insertAdjacentHTML("beforeend", markupList);
}

function markupCountryInfo(countries) {
  const markupArticle = articleTpl(countries);
  refs.country.insertAdjacentHTML("beforeend", markupArticle);
}
