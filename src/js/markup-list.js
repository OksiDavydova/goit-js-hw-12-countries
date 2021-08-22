import countriesListTpl from "../template/countries-list-tpl.hbs";
import getRefs from './refs.js';

const refs = getRefs();

function markupList(countries) {
  const markupList = countriesListTpl(countries);
  refs.countryOverlay.insertAdjacentHTML("beforeend", markupList);
}
export default markupList;