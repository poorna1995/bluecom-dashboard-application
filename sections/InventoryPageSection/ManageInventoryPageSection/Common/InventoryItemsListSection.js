import { PRODUCT } from "constants/API_URL";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InventoryItemCard from "./InventoryItemCard";
import lodash from "lodash";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import appFetch from "utils/appFetch";
import { useQuery } from "@tanstack/react-query";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function InventoryItemsListSection() {
  const { currentUser } = useSelector(mapState);

  // const [productsList, setProductsList] = useState([]);
  const { data: productsList, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: () =>
      appFetch(PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT, {
        user_id: currentUser.merchant_id,
      }).then((json) => json.result),
  });

  // const [isLoading, setIsLoading] = useState(false);
  // const handleFetchInventoryWithItemID = () => {
  // 	setIsLoading(true);
  // 	const URL = PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 	};
  // 	appFetch(URL, data).then((json) => {
  // 		setIsLoading(false);
  // 		console.log(json);
  // 		setProductsList(json.result);
  // 	});
  // };
  // useEffect(() => {
  // 	handleFetchInventoryWithItemID();
  // }, []);

  // Use useCallback to memoize the function to get uniqProducts
  const getUniqProducts = useCallback(() => {
    return lodash.uniqBy(productsList, "inventory_item_id");
  }, [productsList]);

  const uniqProducts = getUniqProducts();
  // const uniqProducts = lodash.uniqBy(productsList, "inventory_item_id");

  // Use useCallback to memoize the function to get filterProductsList

  const getFilterProductsList = useCallback(() => {
    return lodash.groupBy(productsList, "master_product_id");
  }, [productsList]);

  const filterProductsList = getFilterProductsList();
  // const filterProductsList = lodash.groupBy(
  // 	productsList,
  // 	"master_product_id",
  // );
  // Use useCallback to memoize the function to get getItems
  const getItems = useCallback(() => {
    return Object.entries(filterProductsList).map(([key, value]) => {
      // const {} = obj;
      return { key, value };
    });
  }, [filterProductsList]);
  const myItems = getItems();
  // const getItems = Object.entries(filterProductsList).map(([key, value]) => {
  // 	// const {} = obj;
  // 	return { key, value };
  // });

  console.log({ filterProductsList, productsList, myItems, uniqProducts });

  return (
    <div>
      {" "}
      {isLoading && <SectionLoader />}
      <div>
        {Array.isArray(myItems) &&
          myItems.map((item, index) => {
            return (
              <InventoryItemCard
                key={index}
                productId={item.key}
                data={item.value}
                productDetails={item}
              />
            );
          })}
      </div>
    </div>
  );
}
