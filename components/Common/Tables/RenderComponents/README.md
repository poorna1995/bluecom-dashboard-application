these are the custom components for rendering data in table :

# RenderAppImage

The `RenderAppImage` function is a React function that renders an app image. The function takes the following props:

- `display_image`: This prop specifies the URL of the image to render.
- `...props`: This prop is an object that can be used to pass additional props to the `AppImage` component.

The `RenderAppImage` function can be used to render app images in a consistent way.

# RenderImageWithTextAndNavigation

The `RenderImageWithTextAndNavigation` function is a React function that renders an image with text and navigation. The function takes the following props:

- `display_image`: This prop specifies the URL of the image to render.
- `title`: This prop specifies the title of the image.
- `href`: This prop specifies the URL of the page to navigate to when the image is clicked.
- `...props`: This prop is an object that can be used to pass additional props to the `AppImage` and `Typography` components.

The `RenderImageWithTextAndNavigation` function can be used to render images with text and navigation in a consistent way.

# RenderChannelAsIcon

The `RenderChannelAsIcon` function is a React function that renders an icon for a channel. The function takes the following props:

- `value`: This prop specifies the name of the channel.

The `RenderChannelAsIcon` function can be used to render icons for channels in a consistent way.

# RenderLinearProgressBar

The `RenderLinearProgressBar` function is a React function that renders a linear progress bar. The function takes the following props:

- `x`: This prop specifies the current value of the progress bar.
- `y`: This prop specifies the total value of the progress bar.

The `RenderLinearProgressBar` function can be used to render linear progress bars in a consistent way.

# RenderProductDetails

The `RenderProductDetails` function is a React function that renders the details of a product. The function takes the following props:

- `display_image`: This prop specifies the URL of the image to render for the product.
- `href`: This prop specifies the URL of the page to navigate to when the product is clicked.
- `title`: This prop specifies the title of the product.
- `product_id`: This prop specifies the ID of the product.
- `sku`: This prop specifies the SKU of the product.
- `barcode`: This prop specifies the barcode of the product.
- `hide_display_image`: This prop specifies whether or not to hide the image of the product.
- `openInNewTab`: This prop specifies whether or not to open the product page in a new tab.

# RenderStatusAsChip

The `RenderStatusAsChip` function is a React function that renders a chip with the status of an item. The function takes the following props:

- `status`: This prop specifies the status of the item.

The function returns a `<Chip>` component with props

The `RenderStatusAsChip` function can be used to render chips with different statuses in a consistent way.
