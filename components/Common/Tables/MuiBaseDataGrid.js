import {
  Box,
  LinearProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  gridPageSelector,
} from "@mui/x-data-grid";
import React from "react";
import lodash from "lodash";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useRouter } from "next/router";

let columnTYPE = {
  id: "",
  fieldName: "",
  headerName: "",
  renderCell: () => "item",
};

function CustomPagination({
  count,
  totalRows,
  shallUseRouter,
  basePath,
  ...props
}) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const router = useRouter();

  const { currentPage } = router.query;
  const pageForRouter = Number(currentPage && currentPage) || 1;
  const pageCountFromList = Math.ceil(totalRows / 10);

  console.log({
    totalRows,
    pageCountFromList,
    pageForRouter,
    currentPage,
    pageCount,
  });
  // console.log({
  // 	page,
  // 	pageCount,
  // 	apiRef,
  // 	gridPageSelector,
  // 	gridPageCountSelector,
  // 	// pageRows: apiRef.current.get,
  // });
  console.log({ router });
  const isProductsPath = router.pathname === "/app/products";

  const handlePageChange = (event, value) => {
    if (shallUseRouter) {
      // apiRef.current.setPage(value - 1);
      if (basePath) {
        return router.replace(`${basePath}currentPage=${value}`);
      }
    }
    return apiRef.current.setPage(value - 1);
  };

  if (shallUseRouter && totalRows && pageCountFromList <= 1) return;
  if (pageCount <= 1) return;

  if (shallUseRouter && totalRows) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // width: "95%",
          alignItems: "center",
          flex: 1,
          // position: "fixed",
          // bottom: "8px",

          // p: "16px",
        }}
      >
        {/* {count > 15 && (
          <Typography
            sx={{
              ml: "24px",
              color: "#667085",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            Showing 15 products of {count}
          </Typography>
        )}{" "} */}
        {/* <div style={{ flex: 1 }} /> */}
        {
          <Box>
            {/* <Pagination
              sx={{
                justifySelf: "flex-end",
              }}
              color="primary"
              count={pageCount}
              page={page + 1}
              onChange={(event, value) =>
                apiRef.current.setPage(value - 1)
              }
            />  */}
            <Pagination
              count={pageCountFromList}
              // variant="outlined"

              color="primary"
              // shape="rounded"
              page={Number(pageForRouter)}
              onChange={(event, value) => handlePageChange(event, value)}
              siblingCount={1}
              boundaryCount={2}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: MdArrowBack,
                    next: MdArrowForward,
                  }}
                  {...item}
                />
              )}
            />
          </Box>
        }
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // width: "95%",
        alignItems: "center",
        flex: 1,
        // position: "fixed",
        // bottom: "8px",

        // p: "16px",
      }}
    >
      {/* {count > 15 && (
				<Typography
					sx={{
						ml: "24px",
						color: "#667085",
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "20px",
					}}
				>
					Showing 15 products of {count}
				</Typography>
			)}{" "} */}
      {/* <div style={{ flex: 1 }} /> */}
      {
        <Box>
          {/* <Pagination
						sx={{
							justifySelf: "flex-end",
						}}
						color="primary"
						count={pageCount}
						page={page + 1}
						onChange={(event, value) =>
							apiRef.current.setPage(value - 1)
						}
					/>  */}
          <Pagination
            count={pageCount}
            color="primary"
            // 	variant="outlined"
            // shape="rounded"
            page={page + 1}
            onChange={(event, value) => handlePageChange(event, value)}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: MdArrowBack,
                  next: MdArrowForward,
                }}
                {...item}
              />
            )}
          />
        </Box>
      }
    </div>
  );
}
export default function MuiBaseDataGrid({
  data = [],
  rowIdkey,
  columnDefData = [],
  containerStyles = {},
  totalRows = 0,
  shallUseRouter,
  rowHeight,
  basePath,
  ...props
}) {
  const getColumns =
    Array.isArray(columnDefData) && columnDefData.length > 0 && columnDefData;
  const columnData =
    Array.isArray(data) &&
    data
      .map((item) => {
        const getKeys = Object.keys(item).map((it) => it);
        return getKeys;
      })
      .flat();
  const uniqHeadings = lodash.uniq(columnData);
  const headingsWithLabel = uniqHeadings.map((item) => {
    return {
      field: item,
      headerName: item,
      width: 200,
    };
  });

  const rowData =
    Array.isArray(data) &&
    data.map((item) => {
      return {
        ...item,
        id: item[rowIdkey],
      };
    });
  // console.log({ uniqHeadings });
  const maxHeight = typeof window !== "undefined" && window.innerHeight - 160;

  let colData = getColumns.length > 0 ? getColumns : headingsWithLabel;
  let newColData =
    Array.isArray(colData) &&
    colData.map((item) => {
      return {
        ...item,
        // headerClassName: "dataGridHeaderRow",
        // headerAlign: 'center',
        sortable: false,
      };
    });
  return (
    <Box
      sx={{
        height: maxHeight,
        width: "100%",
        backgroundColor: "white",

        "& .MuiDataGrid-root": {
          // 10-05-2023
          // borderRight: "none",
          // borderLeft: "none",
          // borderTop: "none",
          // borderBottom: 0,
        },
        ...containerStyles,
      }}
    >
      <DataGrid
        // rowHeight={100}
        // rowHeight={60}
        getRowHeight={() => (rowHeight ? rowHeight : "auto")}
        headerHeight={50}
        slots={{
          loadingOverlay: LinearProgress,
          pagination: (props) => {
            return (
              <CustomPagination
                count={rowData.length}
                totalRows={totalRows}
                shallUseRouter={shallUseRouter}
                basePath={basePath}
                // {...props}
              />
            );
          },
        }}
        // sx={{
        //   "& .MuiDataGrid-columnHeaderTitle": {
        //     fontWeight: "700",
        //     // color: (theme) => theme.palette.text.primary,
        //     color: "#222222",

        //     // fontSize:"16px"
        //   },

        //   "& .MuiDataGrid-columnHeader": {
        //     backgroundColor: "#F9FAFB",
        //   },

        //   // to remove cell selection outline
        //   "& .MuiDataGrid-cell:focus": {
        //     outline: "none",
        //   },

        //   // "& .MuiDataGrid-cell:not(.MuiBox-root css-70qvj9)": {
        //   // 	justifyContent: "center",
        //   // },
        // }}

        // 10-05-2023
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "600",
            color: (theme) => theme.palette.text.primary,
            // color: "#999999",
            fontSize: "15px",
            ml: 1,
            // textTransform: "uppercase",

            // fontSize:"16px"
          },

          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#F5F4FD",
          },

          // to remove cell selection outline
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },

          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
            {
              outline: "none !important",
            },
          // "& .MuiDataGrid-cell:not(.MuiBox-root css-70qvj9)": {
          // 	justifyContent: "center",
          // },
          "& .MuiDataGrid-cell": {
            py: 1,
            px: 2,
          },
        }}
        rows={rowData}
        columns={newColData}
        autoPageSize
        // pageSize={13}
        // rowsPerPageOptions={[5, 15, 25]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        // hideFooter={rowData.length < 6}
        disableColumnMenu={true}
        {...props}
      />
    </Box>
  );
}
