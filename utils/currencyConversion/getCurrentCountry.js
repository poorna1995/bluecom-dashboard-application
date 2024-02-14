import currencyCodes from "currency-codes";
import allCountries from "countries-and-timezones";
import timezones from "./allTimezones";
export default function getCurrentCountry() {
  let allTimezones = timezones;
  //  Intl.supportedValuesOf("timeZone");

  let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // if (currentTimezone === "Asia/Calcutta") currentTimezone = "Asia/Kolkata";
  const matchedTimezone =
    allTimezones.find((timezone) => timezone === currentTimezone) ??
    currentTimezone;
  const currentCountry = allCountries.getCountryForTimezone(matchedTimezone);
  // ||"India";
  // ||"India"
  const currentCountryName = currentCountry.name;
  // console.log({
  // 	currentCountryName,

  // 	currentTimezone,
  // 	currentCountry,
  // 	allCountries: allCountries.getAllCountries(),
  // 	matchedTimezone,
  // });
  return currentCountryName;
}
