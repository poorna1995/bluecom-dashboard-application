import React from "react";
import FormSelectInput from "./index";

import currencyCodes from "currency-codes";
import allCountries from "countries-and-timezones";
import getCurrentCurrency from "utils/currencyConversion/getCurrentCurrency";
export default function CurrencyInput({ value, onChange, ...props }) {
  // console.log({ currencyCodes });
  const currencies = currencyCodes.data;
  // let currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // if (currentTimezone === "Asia/Calcutta") currentTimezone = "Asia/Kolkata";
  // const currentCountry = allCountries.getCountryForTimezone(currentTimezone);
  // const currentCountryName = currentCountry.name;
  // const getCurrentCurrency =
  // 	currencyCodes.country(currentCountryName)[0]
  const currentCurrency = getCurrentCurrency();

  const currencyOptions = currencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} - ${currency.currency}`,
  }));

  // {
  //     "code": "AED",
  //     "number": "784",
  //     "digits": 2,
  //     "currency": "UAE Dirham",
  //     "countries": [
  //         "United Arab Emirates (The)"
  //     ]
  // }
  console.log({ value });
  const currecyFromLabel = currencyCodes.code(
    value.value?.code || value.label?.code || value.value
  );
  const currencyValue =
    currecyFromLabel ||
    // (value && value.value && currencyCodes.code(value.value)) ||
    // currencyCodes.code(getCurrentCurrency);
    currentCurrency;
  console.log({ currencyValue });
  const currentValueOfCurrency = {
    value: currencyValue.code,
    label: `${currencyValue.code} - ${currencyValue.currency}`,
  };

  return (
    <FormSelectInput
      options={currencyOptions}
      value={currentValueOfCurrency}
      onChange={onChange}
      {...props}
    />
  );
}
