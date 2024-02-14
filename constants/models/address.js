let listOfAddressKeys = [
  "address_1",
  "address_2",
  "city",
  "state",
  "country",
  "zipcode",
];

const getAddressList = (data) => {
  let result =
    listOfAddressKeys
      .map((item) => {
        return data[item];
      })
      .filter((item) => item) ?? [];
  return result;
};

export { getAddressList, listOfAddressKeys };
