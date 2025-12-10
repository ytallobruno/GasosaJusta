export const handleEmptyInput = (value: string) => {
  return value === "" ? "0" : value;
};

export const formatPrice = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  const formattedValue = (parseInt(numericValue, 10) / 100)
    .toFixed(2)
    .replace(".", ",");
  return formattedValue;
};

export const formatInputValue = (name: string, value: string) => {
  if (name === "price" || name === "tollValue") {
    return formatPrice(value);
  }
  return value.replace(/^0+(?!$)/, "");
};

export const parseFloatWithComma = (value: string): number => {
  return parseFloat(value.replace(",", "."));
};