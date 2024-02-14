import currencyCodes from "currency-codes";
import allCountries from "countries-and-timezones";
import getCurrentCountry from "./getCurrentCountry";

export default function getCurrentCurrency() {
  const currentCurrency =
    (Array.isArray(currencyCodes.country(getCurrentCountry())) &&
      currencyCodes.country(getCurrentCountry())[0] &&
      currencyCodes.country(getCurrentCountry())[0].code) ??
    "USD";
  // console.log({ currentCurrency });
  return currentCurrency;
}
