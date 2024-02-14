import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductPageView } from "redux/views/viewsSlice";
import imageList1 from "public/assets/imageList1.png";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import CircleIcon from "@mui/icons-material/Circle";
import appFetch from "utils/appFetch";
import { format } from "date-fns";
import AppPageSections from "sections/AppPageSections";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import AppLink from "components/Common/AppLink";
import LinkButton from "components/Common/Buttons/LinkButton";
import AppImage from "components/Common/AppImage";
import shopifyIcon from "public/assets/icons/shopify.svg";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { useQuery } from "@tanstack/react-query";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import EditIcon from "components/Common/Icons/EditIcon";

const mapState = ({ views, user }) => ({
  pageView: views.productPageView,
  currentUser: user.currentUser,
});

export default function EditProductsPageSection() {
  const router = useRouter();
  const { pageView, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  // const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);
  const handleChangeView = (value) => {
    // pageView === "grid" ? "list" : "grid"
    dispatch(setProductPageView(value));
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["editProductsList"],
    queryFn: () =>
      appFetch(PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST, {
        user_id: currentUser.merchant_id,
      }).then((json) => json.result),
  });

  const handleFetchProducts = () => {
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === "success") {
          setData(json.result);
        }
      })
      .catch((err) => console.error(err));
  };
  // useEffect(() => {
  // 	handleFetchProducts();
  // }, []);
  const handleFetchChannels = () => {
    const URL = CHANNEL.FETCH_CHANNEL;
    fetch(URL)
      .then((res) => res.json())
      .then((json) => {
        setChannels(json.result);
      });
  };
  useEffect(() => {
    handleFetchChannels();
  }, []);

  // console.log({ channels });
  const formattedTableData =
    Array.isArray(data) &&
    data.map((item) => {
      const {
        display_image,
        channel_id,
        item_title,
        live_date,
        master_item_id,
        master_product_id,
        product_title,
        status,
        unit_retail_price,
      } = item;
      const getChannelName = channels.filter((it) => {
        if (it.channel_id === channel_id) return it.channel_name;
        return;
      });
      const newLiveDate = (live_date && new Date(live_date)) || "";
      const formattedLiveDate =
        (live_date &&
          newLiveDate &&
          format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
        "";
      // console.log({ getChannelName });
      return {
        ...item,
        Product: display_image,
        // && (
        // 	<AppImage
        // 		src={display_image}
        // 		height="10"
        // 		width="10"
        // 		// sx={{ objectFit: "contain" }}
        // 	/>),
        // "Master Item Id": master_item_id,
        "Master Product Id": master_product_id && (
          <TableCellAppLink
            href={`/app/products/${master_product_id}?tab=overview`}
          >
            {" "}
            {master_product_id}
          </TableCellAppLink>
        ),
        "Product Title": product_title,
        "Item Title": item_title,
        Status: status,
        "Channel Name":
          Array.isArray(getChannelName) &&
          getChannelName.length > 0 &&
          getChannelName[0].channel_name,
        "Live Date": formattedLiveDate,
        "Unit Retail Price": `$ ${unit_retail_price}`,
      };
    });

  // function getStr(str) {
  // 	return str.slice(0, 15) + "...";
  // }

  function getStr1(str) {
    return str.length > 40 ? str.slice(0, 50) + ".." : str;
  }
  // function getWordStr(str) {
  // 	return str.split(/\s+/).slice(0, 5).join(" ") + "...";
  // }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const handleDeleteProduct = (master_product_id) => {
    const URL = PRODUCT.MERCHANT.DELETE_PRODUCT;
    const data = {
      master_product_id: master_product_id,
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        console.log({ json });
        refetch();
      }
    });
  };
  const ProductTableColumnData = [
    {
      field: "Master Product Id",
      headerName: "Master Product Id",
      renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
      width: 200,
      headerAlign: "center",
      valueGetter: ({ value }) => value,
      align: "center",
    },
    {
      field: "Product",
      headerName: "Product",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          <AppImage
            // sx prop to fit app image to a definite size
            sx={{ objectFit: "cover", borderRadius: "5px" }}
            width="45"
            height="45"
            src={params.value || imageList1}
          />
          <Typography
            sx={{
              marginLeft: "12px",
              fontWeight: "500",
              fontSize: "14px",
              color: "#313D4E",
            }}
          >
            <>
              <Tooltip title={params.row["Product Title"]}>
                <span>{getStr1(params.row["Product Title"])}</span>
              </Tooltip>
            </>
            {/* {params.row["Product Title"]} */}
          </Typography>
        </Box>
      ),
      width: 350,

      flex: 1,
      // headerAlign: "center",
      valueGetter: ({ value }) => value,
    },
    {
      field: "Status",
      headerName: "Status",
      renderCell: (params) => (
        <div>
          {params.value === "active" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CircleIcon
                sx={{
                  mr: "3px",
                  color: "#12B76A",
                  width: "6px",
                  height: "8px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#12B76A",
                }}
              >
                {capitalizeFirstLetter(params.value)}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircleIcon
                sx={{
                  mr: "3px",
                  color: "#F79009",
                  width: "6px",
                  height: "8px",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#F79009",
                }}
              >
                {capitalizeFirstLetter(params.value)}
              </Typography>
            </Box>
          )}
        </div>
      ),
      width: 200,
      align: "center",
      valueGetter: ({ value }) => value,
      headerAlign: "center",
    },

    {
      field: "Unit Retail Price",
      headerName: "Price",
      // renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
      width: 100,
      headerAlign: "center",
      valueGetter: ({ value }) => value,
      align: "center",
    },
    {
      headerName: "Edit",
      renderCell: (params) => (
        // <PrimaryButton
        // 	sx={{
        // 		height: "30px",
        // 		width: "100px",
        // 		backgroundColor: "#EEEFFB",
        // 		color: "#5860D7",
        // 		"&:hover": {
        // 			background: "#EEEFFB",
        // 		},
        // 	}}
        <OutlinedButton
          sx={{
            height: "40px",
            width: "100px",

            textAlign: "center",
            // // backgroundColor: "#EEEFFB",
            // color: "#5860D7",
            // "&:hover": {
            // 	background: "#EEEFFB",
            // },
          }}
          startIcon={<EditIcon />}
          onClick={() => router.push(`/app/products/edit/${params.value}`)}
          // sx={{
          // 	textTransform: "capitalize",
          // }}
        >
          Edit
        </OutlinedButton>
      ),
      valueGetter: (params) => params.id,
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "master_product_id",
      headerName: "Delete",
      renderCell: (params) => (
        // <PrimaryButton
        // 	sx={{
        // 		height: "30px",
        // 		width: "100px",
        // 		backgroundColor: "#EEEFFB",
        // 		color: "#5860D7",
        // 		"&:hover": {
        // 			background: "#EEEFFB",
        // 		},
        // 	}}

        <OutlinedButton
          sx={{
            height: "40px",
            width: "100px",
            textAlign: "center",
            // // backgroundColor: "#EEEFFB",
            // color: "#5860D7",
            // "&:hover": {
            // 	background: "#EEEFFB",
            // },
          }}
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteProduct(params.value)}
          // sx={{
          // 	textTransform: "capitalize",
          // }}
        >
          Delete
        </OutlinedButton>
      ),
      valueGetter: (params) => params.id,
      headerAlign: "center",
      width: 200,
      align: "center",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // paddingBottom: "8px",
          paddingY: "8px",
        }}
      >
        <SectionTitleText
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "28px",
            lineHeight: "32px",
            paddingBottom: "8px",
          }}
        >
          Edit Products
          <Typography
            sx={{
              marginTop: "3px",
              fontSize: "16px",
              fontWeight: "700",
              color: "#475467",
              // lineHeight: "40px",
              ml: "12px",
            }}
          >
            ({formattedTableData.length} Products)
          </Typography>
        </SectionTitleText>
        {/* <OutlinedButton
					onClick={() =>
						router.push(
							"/app/products/publish/bulk?step=select-store",
						)
					}
				>
					Publish bulk
				</OutlinedButton> */}
      </Box>
      <MuiBaseDataGrid
        rowIdkey={"master_product_id"}
        columnDefData={ProductTableColumnData}
        data={formattedTableData}
        checkboxSelection={false}
        loading={isLoading}
      />
    </Box>
  );
}
