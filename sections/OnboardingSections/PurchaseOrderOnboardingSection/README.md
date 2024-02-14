This section is for PO creation

index.js is the main file which contain first step of PO creation in which by selecting vendor we can choose and add products for our PO ,

POPreviewSection is the component for second step .
it contains two subsection

1. POemailPage
2. POPdfPage

## handleClickEmailSend() function

The `handleClickEmailSend()` function is a function that is called when the user clicks on the "Send Email" button. The function takes the following props:

- `subject`: This prop specifies the subject of the email.
- `description`: This prop specifies the description of the email.
- `email`: This prop specifies the email address of the recipient.
- `file`: This prop specifies the file that is attached to the email.

The function first sets the `loading` state to `true`. Then, the function creates a `FormData` object. The `FormData` object is used to send the email data to the server. The `FormData` object contains the following fields:

- `subject`: The subject of the email.
- `description`: The description of the email.
- `emails`: An array of email addresses.
- `file`: The file that is attached to the email.

The function then uses the `fetch()` API to send the `FormData` object to the server. The `fetch()` API returns a `Promise` object. The `Promise` object resolves to the response from the server.

The function then uses the `await` keyword to wait for the `Promise` object to resolve. The function then gets the `status` and `message` properties from the response object.

If the `status` property is `success`, the function sets the `loading` state to `false` and displays a success message in the snackbar.

If the `status` property is not `success`, the function displays an error message in the snackbar.
