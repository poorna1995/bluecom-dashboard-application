import { Box } from "@mui/system";
import React from "react";
import InventoryFilterSection from "./Common/InventoryFilterSection";
import InventoryItemsListSection from "./Common/InventoryItemsListSection";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function InventorySection() {
  // const { currentUser } = useSelector(mapState);

  // const [productsList, setProductsList] = useState([]);

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
  // const uniqProducts = lodash.uniqBy(productsList, "inventory_item_id");

  // const filterProductsList = lodash.groupBy(
  // 	productsList,
  // 	"master_product_id",
  // );
  // const getItems = Object.entries(filterProductsList).map(([key, value]) => {
  // 	// const {} = obj;
  // 	return { key, value };
  // });

  // console.log({ filterProductsList, productsList, getItems, uniqProducts });
  return (
    <div>
      <InventoryFilterSection />
      <Box>
        <InventoryItemsListSection />
      </Box>
    </div>
  );
}

const data = [
  {
    productId: "123r412",
    data: [
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
    ],
  },
  {
    productId: "123r412",
    data: [
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
    ],
  },
  {
    productId: "123r412",
    data: [
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
    ],
  },
  {
    productId: "123r412",
    data: [
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
    ],
  },
  {
    productId: "123r412",
    data: [
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
      {
        itemId: "54645",
        itemDesc: "qirufewbfjbaf",
        QtyAvailable: 789,
      },
    ],
  },
];
