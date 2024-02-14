This section represents purchase order main page and PO detail page

# index.js

This page shows collection of PO under a single table with tabs that shows filtered PO according to status of PO

## handleCreatePdf() function

The `handleCreatePdf()` function is a function that creates a PDF of a purchase order. The function takes the following props:

- `PO_DATA`: This prop specifies the data of the purchase order.

The function first sets the `pdfLoading` state to `true`. Then, it creates an object `productsData` that contains the following information about the products in the purchase order:

- `product_title`: The title of the product.
- `sku`: The SKU of the product.
- `item_unit_cost_price`: The unit cost price of the product.
- `qty_ordered`: The quantity of the product that was ordered.
- `total_cost`: The total cost of the product.

The function then creates an object `productsForPDF` that contains the following information about the products in the purchase order:

- `product`: The title of the product.
- `sku`: The SKU of the product.
- `unit cost`: The unit cost price of the product.
- `order qty`: The quantity of the product that was ordered.
- `total($)`: The total cost of the product, formatted as `$xx.xx`.

The function then gets the `billingAddress` from the `pageData` object. The `billingAddress` is the address of the warehouse where the products will be shipped.

The function then formats the `created_at` and `promise_date` dates in the `pageData` object.

The function then creates an object `data` that contains the following information about the purchase order:

- `vendor_name`: The name of the vendor who supplied the products.
- `shipping_address`: The address of the warehouse where the products will be shipped.
- `po_id`: The ID of the purchase order.
- `billing_address`: The address of the warehouse where the products will be shipped.
- `table`: An array of objects that contain the information about the products in the purchase order.
- `issue_date`: The date the purchase order was issued.
- `expected_date`: The date the products are expected to be delivered.
- `sub_total`: The subtotal of the purchase order.
- `tax`: The tax amount of the purchase order.
- `total`: The total amount of the purchase order.
- `currency`: The currency of the purchase order.

The function then uses the `fetch()` API to make a POST request to the `REPORT.CREATE_PDF` URL. The request body is the `data` object.

The `fetch()` API returns a promise. The `then()` method of the promise is used to get the response body from the request. The response body is a blob.

The `then()` method of the promise is also used to set the `pdfLoading` state to `false`.

The `blob` is then used to create a download URL. The download URL is used to open the PDF in a new window.

# PurchaseOrderDetailsPageSection

## ## handleUpdateButtonClick() function

The `handleUpdateButtonClick()` function is a function that is called when a user clicks on the "Update" button. The function takes the following props:

- `PRODUCTS_TO_UPDATE`: This prop specifies an array of objects that contain the information about the products that are to be updated.

The function first checks if all of the products in the `PRODUCTS_TO_UPDATE` array have been fully received. If all of the products have been fully received, the function calls the `handleDialogOpenForClosed()` function. The `handleDialogOpenForClosed()` function opens a dialog that allows the user to close the purchase order.

If not all of the products have been fully received, the function calls the `handleUpdatePurchaseOrder()` function. The `handleUpdatePurchaseOrder()` function updates the purchase order with the information in the `PRODUCTS_TO_UPDATE` array.

## isFullyReceived() function

The `isFullyReceived()` function is a function that checks if all of the products in an array have been fully received. The function takes the following props:

- `PRODUCTS_TO_UPDATE`: This prop specifies an array of objects that contain the information about the products that are to be checked.

The function iterates through the `PRODUCTS_TO_UPDATE` array and checks if the `received_qty` of each product is greater than or equal to the `qty_ordered` of each product. If all of the `received_qty` values are greater than or equal to the `qty_ordered` values, the function returns `true`. Otherwise, the function returns `false`.
