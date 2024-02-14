import Cookies from "universal-cookie";
import getCurrentCurrency from "./getCurrentCurrency";

const cookies = new Cookies();
const merchant_currency = cookies.get("merchant_currency");
// console.log({ merchant_currency });

function getCurrencyValue(currencyValue: number, currency: string | undefined) {
  // if (currency === undefined) return "";

  const currentCurrency = getCurrentCurrency() || "USD" || undefined;
  // console.log({ currentCurrency });
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || merchant_currency || currentCurrency || "USD",
    maximumFractionDigits: 2,
  }).format(currencyValue ?? 0);
  // console.log({ formattedValue, currencyValue });

  return formattedValue;
}
export default getCurrencyValue;
