export default function getFormattedNumber(
  numberValue: number,
  locale: string | undefined
) {
  const result = new Intl.NumberFormat(locale ?? "en-US").format(numberValue);
  return result;
}
