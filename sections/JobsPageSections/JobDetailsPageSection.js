import {
  Box,
  Breadcrumbs,
  Chip,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AppImage from "components/Common/AppImage";
import EmptyState from "components/Common/EmptyState";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import BulletIcon from "components/Common/Icons/BulletIcon";
import HomeIcon from "components/Common/Icons/HomeIcon";
import AttachIcon from "components/Common/Icons/JobPageIcon/AttachIcon";
import NavigateNextIcon from "components/Common/Icons/NavigateNextIcon";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import CustomCircularProgress from "components/Common/Progress/CustomCircularProgress";

import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderAppImageAndTextWithNavigation from "components/Common/Tables/RenderComponents/RenderAppImageAndTextWithNavigation";
import RenderImageWithText from "components/Common/Tables/RenderComponents/RenderImageWithText";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import useInterval from "customHooks/useInterval";
import { orderBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPublishStatus } from "redux/products/productsSlice";

import theme from "theme";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import WalletIcon from "components/Common/Icons/WalletIcon";
import channelsOptions from "constants/channelOptions";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import JobsDetailsMobileView from "./MobileViewComponents/JobsDetailsMobileView";

const mapState = ({ productsData, user }) => ({
  productsData,
  currentUser: user.currentUser,
});
export default function JobDetailsPageSection() {
  const { productsData, currentUser } = useSelector(mapState);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const taskID = productsData.publishTaskID;
  const publishTaskProducts = productsData.publishTaskProducts;
  const publishStatus = productsData.publishableProductsStatus;

  const router = useRouter();
  const jobId = router.query.jobId;

  const {
    data: publishProducts,
    isLoading: isProductsLoading,
    refetch: refetchStatus,
  } = useQuery({
    queryKey: ["publishProducts", jobId],
    queryFn: () =>
      appFetch(PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS, {
        task_id: jobId,
      }).then((res) => {
        console.log("res", res.result.updated_at);
        setUpdatedAt(res.result.updated_at);
        return res;
      }),
    enabled: !!jobId,
  });
  const isCompleted =
    publishProducts &&
    publishProducts?.result &&
    publishProducts?.result.task_percentage === 100;
  const isFailed =
    publishProducts &&
    publishProducts?.result &&
    publishProducts?.result?.task_status === "failure";
  const publishProductsResult = publishProducts?.result?.result;

  let statusText = "In Progress";

  if (isProductsLoading) {
    statusText = "In Progress";
  } else if (publishProducts && publishProducts.result) {
    statusText = publishProducts.result.task_status;
  }

  console.log({ publishProducts });

  const masterProductIds =
    (Array.isArray(publishProductsResult) &&
      publishProductsResult.map((item) => item.master_product_id)) ||
    [];

  const mapCompleted =
    (Array.isArray(publishProductsResult) &&
      publishProductsResult.map((item) => {
        if (item.percentage === 100)
          return {
            ...item,
            isCompleted: true,
          };
        return item;
      })) ||
    [];

  // const mapCompleted = publishProductsResult.map((item) => {
  // 	if (item.percentage === 100)
  // 		return {
  // 			...item,
  // 			isCompleted: true,
  // 		};
  // 	return item;
  // });
  // const { data: productsList, isLoading: isListLoading } = useQuery({
  // 	queryKey: ["productsList", masterProductIds],
  // 	queryFn: () =>
  // 		appFetch(PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER, {
  // 			user_id: currentUser.merchant_id,
  // 			// master_product_id: masterProductIds,
  // 		}).then((res) => res.result),
  // });

  // filter productsList by master_product_id of publishProducts
  // const filteredProductsList =
  // 	Array.isArray(productsList) &&
  // 	productsList.filter((item) =>
  // 		masterProductIds.includes(item.master_product_id),
  // 	);
  // merge publishProducts and filteredProductsList
  // const mergedProductsList =
  // console.log({ filteredProductsList, publishProducts });
  const mergeTwoArrays = (a1 = [], a2 = [], key) =>
    Array.isArray(a1) &&
    a1.map((itm) => ({
      ...a2.find((item) => item[key] === itm[key] && item),
      ...itm,
    }));
  // const mapCompleted =
  // 	(Array.isArray(publishProductsResult) &&
  // 		publishProductsResult.map((item) => {
  // 			if (item.percentage === 100)
  // 				return {
  // 					...item,
  // 					isCompleted: true,
  // 				};
  // 			return item;
  // 		})) ||
  // 	[];
  // const mergedArray = mergeTwoArrays(
  // 	filteredProductsList,
  // 	mapCompleted,
  // 	"master_product_id",
  // );
  const dispatch = useDispatch();
  // const handleFetchPublishStatus = () => {
  // 	const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
  // 	const data = {
  // 		task_id: jobId,
  // 	};

  // 	// dispatch(fetchPublishableProductsStatusStart({ url: URL, data }));
  // 	if (!isCompleted) {
  // 		appFetch(URL, data).then((res) => {
  // 			console.log({ res });
  // 			dispatch(setPublishStatus(res));
  // 		});
  // 	}
  // };
  // const handleFetchPublishProducts = () => {
  // 	const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
  // 	const data = {
  // 		task_id: jobId,
  // 	};

  // 	// dispatch(fetchPublishableProductsStatusStart({ url: URL, data }));
  // 	// if (!isCompleted) {
  // 	appFetch(URL, data)
  // 		.then((res) => {
  // 			console.log({ res });
  // 			setPublishProducts(res.result);
  // 		})
  // 		.catch((err) => console.log({ err }));
  // 	// }
  // };
  // const handleFetchProductDetails = () => {
  // 	const URL = PRODUCT.MERCHANT.FETCH_REVIEW_PRODUCT_DETAILS;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 		master_product_id: masterProductIds,
  // 	};
  // 	appFetch(URL, data)
  // 		.then((res) => {
  // 			console.log({ reviewProducts: res });
  // 			// setPublishProducts(res);
  // 		})
  // 		.catch((err) => console.log({ err }));
  // };

  // React.useEffect(() => {
  // handleFetchPublishProducts();
  // if (!isCompleted) {
  // handleFetchPublishStatus();
  // }
  // }, [taskID]);

  const isFailedOrCompleted = isCompleted || isFailed;
  console.log({ isFailedOrCompleted, isCompleted, isFailed });

  useInterval(
    isCompleted || isFailed
      ? () => {
          return;
        }
      : refetchStatus,
    1500
  );
  // useInterval(refetchStatus, 1500);
  let orderedList = orderBy(
    mapCompleted,
    ["isCompleted", "percentage", "live_date"],
    ["asc", "desc", "desc"]
  );
  orderedList = orderedList.map((item) => {
    if (item.updated_at === undefined) {
      return { ...item, updated_at: updatedAt };
    } else {
      return item;
    }
  });

  console.log(mapCompleted, "mapcompleted");
  console.log(orderedList, "orderedList");
  // console.log({ publishTaskProducts, mergedArray, orderedList });

  function getStr1(str = "") {
    if (str) return str.length > 40 ? str.slice(0, 60) + ".." : str;
  }
  const columns = [
    // products
    {
      field: "product_title",
      accessorKey: "product_title",
      header: "Product",
      headerName: "Product",
      flex: 1,
      size: 500,

      // renderCell: (params) => (
      // 	<RenderImageWithText
      // 		title={getStr1(params.value)}
      // 		src={params.row.display_image}
      // 	/>
      // ),

      renderCell: (params) => (
        <RenderProductDetails
          title={getStr1(params.value)}
          display_image={params.row.display_image}
          href={`/app/products/${params.row.master_product_id}?tab=overview`}
        />
      ),
      Cell: ({ cell }) => (
        <RenderProductDetails
          title={cell.row.original.product_title}
          display_image={cell.row.original.display_image}
          href={`/app/products/${cell.row.original.master_product_id}?tab=overview`}
          sku={cell.row.original.product_sku}
        />
      ),
    },
    {
      accessorKey: "shop",
      header: "Shop",

      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {cell.row.original.shop}
        </Typography>
      ),
    },
    {
      accessorKey: "channel_id",
      header: "Channel",
      Cell: ({ cell }) => (
        <AppImage
          src={channelsOptions[cell.getValue()].image}
          width="40"
          height="40"
          sx={{
            borderRadius: "50%",
          }}
        />
      ),
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },

    {
      field: "percentage",
      accessorKey: "percentage",
      header: "Progress",
      headerName: "Progress",
      renderCell: (params) => (
        <div>
          {isCompleted || isFailed ? (
            <CustomCircularProgress progress={params.value} />
          ) : (
            <SectionLoader />
          )}
        </div>
      ),
      Cell: ({ cell }) => (
        <div>
          {/* {cell.row.original.status !== "failure" ||
					cell.row.original.status !== "success" ? ( */}
          <CustomCircularProgress
            progress={cell.getValue()}
            isFailed={cell.row.original.status === "failure"}
          />
          {/* ) : (
						<CircularProgress size={40} thickness={4} />
					)} */}
        </div>
      ),
      flex: 0.3,
      size: 100,
      align: "center",
      headerAlign: "center",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    // Messages
    // {
    //   accessorKey: "message",
    //   header: "Message",
    //   Cell: ({ cell }) => (
    //     <Typography
    //       sx={{
    //         fontSize: "14px",
    //         fontWeight: 500,
    //         color:
    //           cell.row.original.status === "failure"
    //             ? (theme) => theme.palette.error.main
    //             : "#0FA958",
    //       }}
    //     >
    //       {cell.row.original.status === "failure" && (
    //         <>
    //           {cell.getValue()?.code &&
    //             cell.getValue()?.code?.includes("woocommerce") &&
    //             "Not Able to publish product."}
    //           {cell.getValue() &&
    //             cell.getValue()?.includes("base") &&
    //             "Not Able to publish product."}
    //         </>
    //       )}
    //       {cell.row.original.status !== "failure" && cell.getValue()}
    //     </Typography>
    //   ),
    //   size: 120,
    // },
    // Link
    {
      field: "public_link",
      accessorKey: "public_link",
      header: "Link",
      headerName: "Link",
      flex: 0.3,
      size: "150",
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.row.percentage === 100 ? (
          <OutlinedButton
            size="small"
            onClick={() => window.open(params.value, "_blank")}
            startIcon={<AttachIcon />}
          >
            View Published Product
          </OutlinedButton>
        ) : null,
      Cell: ({ cell }) =>
        cell.row.original.percentage === 100 ? (
          <OutlinedButton
            onClick={() => window.open(cell.getValue(), "_blank")}
            startIcon={<AttachIcon color={"#4F44E0"} />}
          >
            View Product on{" "}
            {channelsOptions[cell.row.original.channel_id].title}
          </OutlinedButton>
        ) : (
          "N/A"
        ),
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      field: "Published at",
      accessorKey: "updated_at",
      header: "Published at",
      headerName: "Published at",
      flex: 1,

      Cell: ({ cell }) => <RenderDate date={cell.getValue()} />,
      // <Typography
      // sx={{
      //   fontSize: "14px",
      //   fontWeight: 500,
      // }}
      // >
      //   {/* {cell.row.original.updated_at.split("T")[0]} */}

      //   </Typography>

      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },

    // {
    //   accessorKey: "message",
    //   header: "Message",
    //   Cell: ({ cell }) => (
    //     <Typography
    //       sx={{
    //         fontSize: "14px",
    //         fontWeight: 500,
    //         color: cell.row.original.status === "failure" ? "red" : "black",
    //       }}
    //     >
    //       {cell.getValue()}
    //     </Typography>
    //   ),
    //   size: 250,
    // },

    // {
    // 	field: "channel_id",
    // 	headerName: "Link",
    // 	renderCell: (params) => (
    // 		<OutlinedButton>View on Shopify</OutlinedButton>
    // 	),
    // 	flex: 0.3,
    // 	headerAlign: "center",
    // 	align: "center",
    // },
  ];

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
          },
        }}
      >
        <Box
          sx={{
            background: "#F5F5F5",
            px: "52px",
            mt: -1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              marginBottom: "10px",
              // backgroundColor: "white",
              // position: "sticky",
              // top: "64.5px",
              zIndex: (theme) => theme.zIndex.appBar,
              // borderBottom: `1px solid ${theme.palette.grey[300]}`,
              position: "sticky",
            }}
          >
            {/* <Breadcrumbs
					sx={{
						fontSize: "12px",
						// padding: "20px",
					}}
					aria-label="breadcrumb"
				>
					<AppLink href="/app/jobs" sx={{ color: "#5860D7" }}>
						Jobs
					</AppLink>

					<Typography
						sx={{ fontSize: "12px" }}
						// underline="hover"
						fontWeight="600"
						// href="/material-ui/react-breadcrumbs/"
						// aria-current="page"
					>
						{jobId}
					</Typography>
				</Breadcrumbs> */}
            <Breadcrumbs
              sx={{
                fontSize: "16px",
                lineHeight: "19px",
                pt: "16px",
                pb: "31px",
                fontWeight: "700",
              }}
              aria-label="breadcrumb"
              separator={
                "/"
                // <NavigateNextIcon />
              }
            >
              {/* <HomeIcon /> */}
              <AppLink href="/app/jobs" sx={{ color: "#4F44E0" }}>
                Jobs ID
              </AppLink>

              <Typography
                sx={{
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "rgba(34, 34, 34, 1)",
                }}
                // underline="hover"

                color="grey.400"
                fontWeight="600"
              >
                ID: {jobId}
              </Typography>
            </Breadcrumbs>
            {/* <Divider sx={{ marginX: "10px" }} /> */}
            <SectionTitleText
              sx={{
                display: "flex",
                fontSize: "21px",
                lineHeight: "28px",
                alignItems: "center ",
                "& svg circle": {
                  color: "#F79009",
                  fill: "#F79009",
                },
                "& svg": {
                  mr: 1,
                },
              }}
            >
              <span>Job ID - {jobId}</span>
              <span
                style={{
                  color: "#F79009",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "15px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "16px",
                }}
              >
                {/* <BulletIcon /> */}
                {/* {isCompleted ? "Finished" : "In Progress"} */}
                {/* {statusText} */}

                <RenderStatus value={statusText} />
              </span>
            </SectionTitleText>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // mt: 2,
              // borderBottom: (theme) =>
              // 	`1px solid ${theme.palette.grey[300]}`,
              // pb: 2,
              p: "16px",
              pb: "40px",
            }}
          >
            {/* <SectionTitleText
            sx={{
              display: "flex",
              fontSize: "18px",
              lineHeight: "22px",
              alignItems: "center ",
              "& svg circle": {
                color: "#F79009",
                fill: "#F79009",
              },
              "& svg": {
                mr: 1,
              },
            }}
          >
            <span>Job ID - {jobId}</span>
            <span
              style={{
                color: "#F79009",
                fontSize: "12px",
                fontWeight: 600,
                lineHeight: "15px",
                display: "flex",
                alignItems: "center",
                marginLeft: "16px",
              }}
            >
              <BulletIcon />
              {isCompleted ? "Finished" : "In Progress"}
              {statusText}

              <RenderStatus value={statusText} />
            </span>
          </SectionTitleText> */}
            <Box sx={{ mt: "31px" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "20px",
                  color: "#222222",
                  display: "flex",
                  alignItems: "center",
                  "& path": {
                    stroke: " #4F44E0",
                  },
                  "& svg": {
                    // mt: 2,
                    mr: 2,
                  },
                  "& span": {
                    // mt: -2,
                  },
                }}
              >
                <WalletIcon />
                <span> Total Products Publishing</span>
              </Typography>
              <SectionTitleText
                sx={{
                  mt: 3,
                  // ml: 5,
                }}
              >
                {Array.isArray(orderedList) && orderedList.length}
              </SectionTitleText>
            </Box>
            {/* <Chip
					sx={{
						color: "#DC6803",
						backgroundColor: "#FFFAEB",
						fontWeight: "600",
					}}
					label={"Estimate Time : 4min 30 sec"}
				/> */}
          </Box>
        </Box>
        <Box
          sx={{
            px: "36px",
          }}
        >
          <SectionTitleText
            sx={{
              // my: "16px",
              fontSize: "26px",
              fontWeight: 700,
              lineHeight: "31px",
              p: "16px",

              color: (theme) => theme.palette.text.title,
            }}
          >
            Publishing Products
          </SectionTitleText>
          {/* {orderedList.length === 0 && (
        <EmptyState
          text={"No Job data "}
          bodyText={"You can add new purchase order by clicking below"}
        >
        </EmptyState>
      )} */}
          {/* {orderedList.length === 0 && !loading && <EmptyState />} */}
          {/* {loading && <PageSpinner />} */}
          <Box sx={{ px: "16px" }}>
            {/* {orderedList.lengh === 0 && ( */}
            {/* {orderedList.length > 0 && ( */}
            <BluecomMRTBaseTable
              // sx={{
              //   borderBottom: "none",
              // }}

              data={orderedList}
              rowHeight={60}
              rowIdkey="master_product_id"
              columnsData={columns}
              state={{
                showSkeletons: isProductsLoading,
              }}
              muiTableContainerProps={{
                sx: { height: "45vh" },
              }}
              muiTableBodyCellProps={{
                sx: {
                  height: "60px",
                },
              }}
              // hideFooter={orderedList.length < 5}
            />
            {/* )} */}
          </Box>{" "}
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
          },
        }}
      >
        <JobsDetailsMobileView
          publishProducts={publishProducts}
          jobId={jobId}
          statusText={statusText}
          orderedList={orderedList}
        />
      </Box>
    </>
  );
}
