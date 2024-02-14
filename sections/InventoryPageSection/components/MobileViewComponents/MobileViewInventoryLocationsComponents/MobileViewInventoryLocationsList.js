import React from "react";
import MobileViewInventoryLocationsCard from "./MobileViewInventoryLocationsCard";
import MobileViewInventoryVariantCardSkeleton from "../MobileViewInventoryVariantsComponents/MobileViewInventoryVariantCardSkeleton";
import MobileViewInventoryLocationCardSkeleton from "./MobileViewInventoryLocationCardSkeleton";

const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8];
export default function MobileViewInventoryLocationsList({ data, loading }) {
  console.log({ data }, "list");
  return (
    <div>
      {loading ? (
        <>
          {skeletonData.map((item) => (
            <MobileViewInventoryLocationCardSkeleton key={item} />
          ))}
        </>
      ) : (
        <>
          {Array.isArray(data) &&
            data.map((item) => {
              return (
                <MobileViewInventoryLocationsCard
                  key={item.wh_id}
                  data={item}
                />
              );
            })}
        </>
      )}
    </div>
  );
}

/**
 * {
    "available": 250,
    "channel_id": 4,
    "items_count": 1,
    "shop": "143.244.133.144/wordpress",
    "store_id": "418382994072378257",
    "wh_id": "139092214916112311",
    "wh_name": "Default Woocommerce Warehouse",
    "Warehouse": "Default Woocommerce Warehouse",
    "# Items": "1 Variants"
}
 */
