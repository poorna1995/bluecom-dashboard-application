// schema
/**
		 * "user_id": "138940023846722390",
    "product_id":"238940023846722399",
    "product_desc": "test product desc",
    "product_title": "Baggy Pant",
    "status": "draft",
    "channel_id": 3,
    "unit_retail_price": 145,
	"unit_cost_price": 145,
    "items": [
        {
            "item_title": "L/Black",
            "item_desc": "test desc",
            "barcode": "000",
            "inventory": [
                {
                    "wh_id": "75970904346",
                    "available": 100
                }
            ]
        },
    ],
    "weight": 100,
    "weight_unit":"gm",
    "display_image": "testimage",
    "images": [
        "testimage1",
        "testimage2"
    ]
		 */

import { PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";

export async function addProduct(data, enqueueSnackbar) {
  try {
    const url = PRODUCT.MERCHANT.ADD_PRODUCT;
    const json = await appFetch(url, data);
    enqueueSnackbar(json.message || "Product added successfully!");
    // onSuccess(json);
  } catch (error) {
    enqueueSnackbar("Something went wrong!");
    console.error(error);
  }
}
