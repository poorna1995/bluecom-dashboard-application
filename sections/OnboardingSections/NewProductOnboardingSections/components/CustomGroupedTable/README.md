## CustomGrouped Table

A custom grouped table component that can be used to display a list of items in a grouped table view.

This is used in the New Product Onboarding flow to display the list of variants for a product.

The props to pass to this component are:

```js
-  newData = [{}], // the data to be displayed in the table
-  baseCardStyles, // the styles for the base card
-  columnsData = [], // the data for the columns
-  columnGroups = [], // the data for the column groups
-  handleSaveRow, // the function to be called when a row is saved
-  handleSaveCell, // the function to be called when a cell is saved
-  handleFetchProductData = () => {}, // the function to be called when the product data is fetched
```
