import React from "react";
import MobileViewInventoryLocationCardSkeleton from "sections/InventoryPageSection/components/MobileViewComponents/MobileViewInventoryLocationsComponents/MobileViewInventoryLocationCardSkeleton";
import MobileViewInventoryLocationsCard from "sections/InventoryPageSection/components/MobileViewComponents/MobileViewInventoryLocationsComponents/MobileViewInventoryLocationsCard";
import MobileViewInventoryLocationCard from "./MobileViewInventoryLocationCard";

const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8];
export default function MobileViewInventoryList({ data, loading }) {
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
                <MobileViewInventoryLocationCard key={item.wh_id} data={item} />
              );
            })}
        </>
      )}
    </div>
  );
}
