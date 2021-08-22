import getRefs from './refs.js';
import articleTpl from "../template/article-tpl.hbs";

const refs = getRefs();

function markupCountryInfo(countries) {
  const markupArticle = articleTpl(countries);
  refs.countryOverlay.insertAdjacentHTML("beforeend", markupArticle);
}
export default markupCountryInfo;