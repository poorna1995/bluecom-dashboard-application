import { Typography } from "@mui/material";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import { BUNDLE } from "constants/API_URL";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
function ComponentSection() {
  const { currentUser } = useSelector(mapState);
  const [data, setData] = React.useState([]);
  const router = useRouter();
  const { productId } = router.query;
  const FetchBundleChildren = () => {
    const URL = BUNDLE.FETCH_BUNDLE;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: productId,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          setData(json.result[0]);
          // console.log(json.result[0]);
        }
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    FetchBundleChildren();
  }, []);

  const mapBundleChildren =
    Array.isArray(data.children) &&
    data.children.map((item, index) => {
      return {
        ...item,
        available: item.available,
        cost_price: item.cost_price,
        created_at: item.created_at,
      };
    });

  console.log(mapBundleChildren);

  // cost_price: 60,
  // created_at: '2023-05-12T14:22:41.957699',
  // display_image:
  //   'https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/a7d4b230-9fd7-4af2-810a-d99fa3b5039c.jpg',
  // images: Array(1) [ 'https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/a7d4b230-9fd7-4af2-810a-d99fa3b5039c.jpg' ],
  // is_bundle: false,
  // is_component: false,
  // item_display_image:
  //   'https://sfo3.digitaloceanspaces.com/ringtoneapp/inventory_planner/a7d4b230-9fd7-4af2-810a-d99fa3b5039c.jpg',
  // item_title: 'red',
  // item_unit_cost_price: 12,
  // item_unit_retail_price: 122,
  // level: 0,
  // master_item_id: '139031941619576320',
  // master_product_id: '1683901257752',
  // parent_product_id: '139036743846395890',
  // product_barcode: 'BAR',
  // product_desc: '<p>test</p>\n',
  // product_sku: 'SKU',
  // product_title: 'test',
  // product_type: '',
  // qty: 5,
  // retail_price: 610,
  // tags: [],
  // type: 'Dress',
  // unit_cost_price: 12,
  // unit_retail_price: 122,
  // updated_at:

  const tableData = [
    {
      field: "master_item_id",
      headerName: "Bundle Details",
      renderCell: (params) => (
        <RenderProductDetails
          display_image={params.row.display_image}
          title={params.row.product_title}
          href={`/app/products/${params.row.master_product_id}?tab=overview`}
          product_id={params.row.master_product_id}
          sku={params.row.product_sku || "N/A"}
        />
      ),

      flex: 1,
    },
    {
      field: "qty",
      headerName: "Units",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {params.value}
        </Typography>
      ),
      width: 100,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "item_unit_cost_price",
      headerName: "Unit Cost Price",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {params.value}
        </Typography>
      ),

      width: 180,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "item_unit_retail_price",
      headerName: "Unit Retail Price",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {params.value}
        </Typography>
      ),
      width: 180,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "cost_price",
      headerName: "Cost Price",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {params.value}
        </Typography>
      ),
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "retail_price",
      headerName: "Retail Price",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {params.value}
        </Typography>
      ),
      width: 150,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "available",
      headerName: "Available",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {params.value}
        </Typography>
      ),
      width: 150,
      headerAlign: "right",
      align: "right",
    },
  ];

  return (
    <div>
      <MuiBaseDataGrid
        columnDefData={tableData}
        data={mapBundleChildren}
        rowIdkey={"master_item_id"}
        containerStyles={{ height: 700 }}
        checkboxSelection={false}
        hideFooter={mapBundleChildren.length < 5 ? true : false}
      />
    </div>
  );
}

export default ComponentSection;
