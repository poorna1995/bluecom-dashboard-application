/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import EmptyState from "components/Common/EmptyState";
import RenderProductDetails from "components/Common/Tables/RenderComponents/RenderProductDetails";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "components/Common/Icons/EditIcon";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import MenuforAction from "components/Common/Menus/IconMenu";

import { useRouter } from "next/router";
import { BUNDLE } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { MoreHoriz } from "@mui/icons-material";
import SuccessDialogForPO from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/SuccessDialogForPO";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import ProductEmptyState from "components/Common/Icons/EmptyStates/ProductEmptyState";
import BundleES from "components/Common/Icons/EmptyStates/BundleES";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function MRTBundleViewCustomTable({
  tableData = [],
  handleFetchBundlesData = () => {},
  loading,
  ...props
}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleDeleteDialogOpen = (cell) => {
    setOpenDialog(true);

    setSelectedCell(cell);
  };
  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
    setSelectedCell(null);
  };

  const handleDeleteProduct = (cell = {}) => {
    const URL = BUNDLE.DELETE_BUNDLE;
    const master_product_id = cell.row.original.master_product_id;
    const master_item_id = cell.row.original.master_item_id;
    const data = {
      master_product_id: master_product_id,
      user_id: currentUser.merchant_id,
      master_item_id: master_item_id,
    };
    appFetch(URL, data)
      .then((json) => {
        if (json.status === "success") {
          // console.log({ json });
          // refetch();
          handleDeleteDialogClose();
          handleFetchBundlesData();
          // handleFetchProducts();
        }
      })
      .catch((error) => console.log(error));
  };

  // const handleFetchBundleData = () => {
  // 	const URL = BUNDLE.FETCH_BUNDLE;
  // 	const data = {
  // 		user_id: currentUser.merchant_id,
  // 	};
  // 	appFetch(URL, data)
  // 		.then((json) => {
  // 			if (json.status === "success") {
  // 				console.log({ json });
  // 			}
  // 		})
  // 		.catch((error) => console.log(error));
  // };
  const hasChildren = (row) => {
    if (Array.isArray(row.children) && row.children.length > 0) {
      return true;
    }
    return false;
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "product_title",
        header: " Bundle",

        Cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
              display: "flex",
              minWidth: "700px",
              flex: 1,
            }}
          >
            <>
              <div>
                <RenderProductDetails
                  barcode={row.original.product_barcode}
                  sku={row.original.product_sku}
                  display_image={
                    row.original.display_image ||
                    row.original.item_display_image ||
                    ""
                  }
                  href={
                    row.original.is_bundle
                      ? `/app/products/${row.original.master_product_id}?productType=bundle&tab=overview`
                      : `/app/products/${row.original.master_product_id}?tab=overview`
                  }
                  product_id={row.original.master_product_id}
                  title={row.original.product_title}
                />
              </div>
              {/* {getValue()} */}
            </>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 800,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        cell: (info) => info.getValue() ?? "No details Found",
        header: "Status",
        footer: (props) => props.column.id,
        size: 90,
        Cell: ({ cell }) => (
          <div
            style={{
              maxWidth: "90px",
            }}
          >
            {/* <RenderStatus
              value={cell.row.original.status || ""}
              // isChip={true}
            /> */}

            {cell.row.original.status ? (
              <RenderStatusAsChip status={cell.row.original.status} />
            ) : null}
          </div>
        ),
        muiTableBodyCellProps: {
          align: "center",
        },
        muiTableHeadCellProps: {
          align: "center",
        },
      },

      // {
      // 	accessorKey: "product_sku",
      // 	header: "SKU",

      // 	footer: (props) => props.column.id,
      // 	size: 5,
      // },
      {
        accessorKey: "product_type",
        header: "Type",
        footer: (props) => props.column.id,
        size: 100,
        Cell: ({ cell }) => (
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {cell.row.original.is_bundle === true ? "Bundle" : "Component"}
          </Typography>
        ),
        minSize: 120,
        maxSize: 120,
      },
      {
        accessorKey: "channel",
        header: "Listing Channel",
        footer: (props) => props.column.id,
        size: 60,
        Cell: ({ cell }) => (
          <Typography>
            {/* <RenderChannelAsIcon
              value={cell.row.original.channel ?? "Unlisted"}
              // channelList={params.row.channelList}
            /> */}
            <ChannelGroups
              channels={cell.getValue()}
              channelDetails={cell.row.original.channels || []}
            />
          </Typography>
        ),
        muiTableBodyCellProps: {
          align: "center",
        },
        muiTableHeadCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "children",
        header: "Components",
        // footer: (props) => props.column.id,
        size: 60,
        Cell: ({ cell }) => (
          <Typography
            sx={{
              textAlign: "right",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {cell.row.original.children.length}
            {/* <RenderChannelAsIcon
							value={cell.row.original.channel ?? "Unlisted"}
							// channelList={params.row.channelList}
						/> */}
          </Typography>
        ),
        muiTableBodyCellProps: {
          align: "right",
        },
        muiTableHeadCellProps: {
          align: "right",
        },
      },

      {
        // accessorKey: "unit_cost_price",
        accessorFn: (row) =>
          row.unit_cost_price || row.cost_price || row.item_unit_cost_price,
        header: "Cost ",
        footer: (props) => props.column.id,
        Cell: ({ cell }) => (
          <RenderCurrency
            value={cell.getValue()}
            sx={{
              fontWeight: "600",
              fontSize: "14px",
            }}
          />
        ),
        muiTableBodyCellProps: {
          align: "right",
        },
        muiTableHeadCellProps: {
          align: "right",
        },
        minSize: 60,
        maxSize: 60,
        size: 100,
      },
      {
        // accessorKey: "unit_retail_price",

        accessorFn: (row) =>
          row.unit_retail_price ||
          row.retail_price ||
          row.item_unit_retail_price,
        header: "Unit Retail Price",
        footer: (props) => props.column.id,
        size: 100,
        Cell: ({ cell }) => (
          <div
            style={
              {
                // maxWidth: "100px",
              }
            }
          >
            {" "}
            <RenderCurrency
              value={cell.getValue()}
              sx={{
                fontWeight: "600",
                fontSize: "14px",
              }}
            />
          </div>
        ),
        muiTableBodyCellProps: {
          align: "right",
          // width: "20",
        },
        muiTableHeadCellProps: {
          align: "right",
          // width: "20",
        },
      },
      {
        accessorKey: "created_at",
        header: "Created Date",
        footer: (props) => props.column.id,
        size: 100,
        Cell: ({ cell }) => (
          <RenderDate
            date={cell.row.original.created_at}
            sx={{
              fontWeight: "600",
              fontSize: "14px",
            }}
          />
        ),
      },

      {
        accessorKey: "master_product_id",
        header: "Action",
        Cell: ({ cell }) => (
          <MenuforAction
            options={[
              {
                label: "Edit Bundle",
                icon: (
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                ),
                onClick: () => {
                  router.push(
                    `/app/products/edit/${cell.row.original.master_product_id}?productType=bundle&tab=general-info`
                  );
                },
              },
              {
                label: (
                  <>
                    <Typography
                      sx={{
                        color: "#d92d20",
                      }}
                    >
                      Delete Bundle
                    </Typography>
                  </>
                ),
                icon: (
                  <IconButton
                    sx={{
                      color: "#d92d20",
                      "& svg path": {
                        color: "#d92d20",
                        // fill: "#d92d20",
                        stroke: "#d92d20",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ),
                onClick: () => {
                  handleDeleteDialogOpen(cell);
                },
              },
            ]}
            buttonIcon={<MoreHoriz />}
          />
        ),
        size: 20,
        muiTableBodyCellProps: {
          align: "center",
          width: "50px",
        },
        muiTableHeadCellProps: {
          align: "center",
          width: "100px",
        },
      },
    ],

    []
  );

  const handleCreateButtonClick = () => {
    router.push(`/app/products/create`);
  };

  return (
    <div>
      <BluecomMRTBaseTable
        columns={[...columns]}
        data={tableData}
        initialState={{
          // expanded: true,
          density: "compact",
        }}
        state={{
          isLoading: loading,
        }}
        enableExpanding
        muiTableRowProps={{
          rowHeight: 60,
        }}
        muiTableBodyCellProps={{
          sx: {
            height: "60px",
          },
        }}
        // muiTablePaperProps={{
        // 	sx: {
        // 		boxShadow: "none",

        // 		border: "1px solid rgba(0,0,0,0.1)",
        // 	},
        // }}
        // muiTableBodyCellProps={{
        // 	sx: {
        // 		py: 2,
        // 		fontSize: "14px !important",
        // 		fontWeight: 600,
        // 	},
        // }}
        // muiTableHeadRowProps={{
        // 	sx: {
        // 		// background: "yellow",
        // 		width: "100%",
        // 		py: 2,
        // 		// background: "#f1f1f1",
        // 		borderBottom: "1px solid rgba(0,0,0,0.1)",
        // 		boxShadow: "none",
        // 		// textAlign: "center",
        // 	},
        // }}
        // muiTableHeadCellProps={{
        // 	sx: {
        // 		// py: 2,

        // 		// 10-5-2023
        // 		py: 2.5,
        // 		fontSize: "16px !important",
        // 		fontWeight: 700,
        // 	},
        // }}
        // muiTablePaginationProps={{
        //   ActionsComponent: (props) => {
        //     return <Pagination />;
        //   },
        // }}
        // set height of table
        muiTableContainerProps={{
          sx: {
            height: "calc(100vh - 250px)",
          },
        }}
        // enableStickyHeader
        // getSubRows={(row, rows) => row.children}
        // enableTopToolbar={false}
        // enableBottomToolbar={false}
        // enableColumnActions={false}
        // enableSorting={false}
        renderEmptyRowsFallback={() => (
          <EmptyState
            icon={<BundleES />}
            text={"Build Your Unique Bundle"}
            bodyText={"Click the create button to get started"}
          >
            <PrimaryButton onClick={() => handleCreateButtonClick()}>
              Create Bundle
            </PrimaryButton>
          </EmptyState>
        )}
        {...props}
      />
      <SuccessDialogForPO
        icon={<AlertIconPO />}
        open={openDialog}
        onCancel={() => handleDeleteDialogClose()}
        onDelete={() => handleDeleteProduct(selectedCell)}
        primaryButtonProps={{
          sx: {
            ml: 2,
            flex: 2,
            backgroundColor: "#D92D20",
            "&:hover": {
              background: "#d91304",
            },
          },
        }}
        title={"Delete Bundle"}
        message={
          "Are you sure you want to delete this Bundle? This action can't be undone."
        }
        primaryButtonName="Delete Bundle"
        secondaryButtonName="Cancel"
      />
    </div>
  );
}
