export const mergeFieldsForTable = (list = []) => {
  const mergedFields = list.reduce((acc, field) => {
    const { name, fields } = field;
    return {
      ...acc,
      [name]: fields,
    };
  }, {});
  return mergedFields;
};

export default function convertObjectArrayToStringArrays(selectedOptions = []) {
  // get values from the selectedOptions from state
  const itemsListed = mergeFieldsForTable(selectedOptions);

  const getValues = Object.values(itemsListed);
  const getKeys = Object.keys(itemsListed);
  const myItems =
    Array.isArray(getValues) &&
    getValues.map((item, index) => {
      const mapItem = item
        .map((i, id) => {
          return i.value;
        })
        .flat();
      return mapItem;
    });
  const getCombinations = (arrays) => {
    const result = [];
    const f = (prefix, arrays) => {
      for (let i = 0; i < arrays[0]?.length; i++) {
        const current = prefix.concat(arrays[0][i]);
        if (arrays?.length > 1) {
          f(current, arrays.slice(1));
        } else {
          result.push(current);
        }
      }
    };
    f([], arrays);
    return result;
  };
  const getCombo =
    Array.isArray(myItems) && myItems?.length > 0 && getCombinations(myItems);
  return getCombo;
}
