import React from "react";
import MaterialReactTable from "material-react-table";
import OutlinedButton from "../Buttons/OutlinedButton";
import { useRouter } from "next/router";
import EmptyStateForAddProductsInPO from "sections/OnboardingSections/PurchaseOrderOnboardingSection/components/EmptyStateForAddProductsInPO";
import { Box, IconButton, TablePagination, useTheme } from "@mui/material";

function MRBaseTable({
  tableData = [],
  columnsData = [],
  renderEmptyRowsFallback,
  enableBottomToolbar,
  muiTableFooterRowProps,
}) {
  const router = useRouter();
  return (
    <>
      <MaterialReactTable
        columns={columnsData}
        data={tableData}
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
        initialState={{
          expanded: false,
          density: "compact",

          // pagination: { pageIndex: 0, pageSize: 5 },
        }}
        // enableColumnResizing
        enableColumnActions={false}
        enableColumnFilters={false}
        // enablePagination={false}
        enableSorting={false}
        muiTableContainerProps={{ sx: { maxHeight: 360 } }}
        enableBottomToolbar={enableBottomToolbar}
        enableTopToolbar={false}
        muiTableBodyRowProps={{ hover: false }}
        // renderEmptyRowsFallback={() => {
        //   return (
        //     <>
        //       <EmptyStateForAddProductsInPO
        //         // onClick={() => router.push("/products/create")}
        //       />
        //     </>
        //   );
        // }}

        renderEmptyRowsFallback={renderEmptyRowsFallback}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: "#F1F1F1",
            fontWeight: "700",
            fontSize: "14px",
            color: (theme) => theme.palette.text.primary,
            py: 2,
          },
        }}
        // muiTableFooterRowProps={{
        //   sx: {
        //     backgroundColor: "rgba(220, 218, 249, 0.13)",
        //   },
        // }}

        muiTableFooterRowProps={muiTableFooterRowProps}
        // renderBottomToolbar={(props) => <TablePagination {...props} />}

        // muiTablePaginationProps={
        // 	{
        // 		ActionsComponent : TablePaginationActions
        // 	}
        // }
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10],
          showFirstButton: true,
          showLastButton: true,
        }}
        //   can be use for internal scroll
        enableStickyFooter
        enableStickyHeader
        //   muiTableContainerProps={{ sx: { maxHeight: 400 } }}
      />
    </>
  );
}

// function TablePaginationActions(props) {
// 	const theme = useTheme();
// 	const { count, page, rowsPerPage, onPageChange } = props;

// 	const handleFirstPageButtonClick = (event) => {
// 		onPageChange(event, 0);
// 	};

// 	const handleBackButtonClick = (event) => {
// 		onPageChange(event, page - 1);
// 	};

// 	const handleNextButtonClick = (event) => {
// 		onPageChange(event, page + 1);
// 	};

// 	const handleLastPageButtonClick = (event) => {
// 		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
// 	};

// 	return (
// 		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
// 			<IconButton
// 				onClick={handleFirstPageButtonClick}
// 				disabled={page === 0}
// 				aria-label="first page"
// 			>
// 				{/* {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />} */}
// 				"f"
// 			</IconButton>
// 			<IconButton
// 				onClick={handleBackButtonClick}
// 				disabled={page === 0}
// 				aria-label="previous page"
// 			>
// 				"p"
// 				{/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
// 			</IconButton>
// 			<IconButton
// 				onClick={handleNextButtonClick}
// 				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
// 				aria-label="next page"
// 			>
// 				"n"
// 				{/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
// 			</IconButton>
// 			<IconButton
// 				onClick={handleLastPageButtonClick}
// 				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
// 				aria-label="last page"
// 			>
// 				{/* {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />} */}
// 				"l"
// 			</IconButton>
// 		</Box>
// 	);
// }

//   TablePaginationActions.propTypes = {
// 	count: PropTypes.number.isRequired,
// 	onPageChange: PropTypes.func.isRequired,
// 	page: PropTypes.number.isRequired,
// 	rowsPerPage: PropTypes.number.isRequired,
//   };

export default MRBaseTable;
