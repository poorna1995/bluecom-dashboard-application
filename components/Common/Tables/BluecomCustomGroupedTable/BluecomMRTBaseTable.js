import React from "react";
import MaterialReactTable from "material-react-table";
import { Pagination } from "@tanstack/react-table";
import BluecomMRTablePagination from "./BluecomMRTablePagination";
import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
import ChevronRightIcon from "components/Common/Icons/ChevronRight";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
export default function BluecomMRTBaseTable({
  tableData = [],
  data = [],
  columnsData = [],
  renderEmptyRowsFallback,
  enableBottomToolbar,
  muiTableFooterRowProps,
  totalRows = 0,
  shallUseRouter,
  rowHeight,
  basePath,
  muiTableContainerProps = {},
  muiTableHeadCellProps = {},
  muiTableHeadRowProps = {},
  muiTableBodyCellProps = {},
  muiTableBodyRowProps = {},

  ...props
}) {
  return (
    <>
      <MaterialReactTable
        columns={[...columnsData]}
        data={data || tableData}
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
          },
        }}
        initialState={{
          expanded: false,
          density: "compact",
          pagination: {
            pageSize: 13,
          },
        }}
        enableColumnActions={false}
        enableColumnFilters={false}
        enableSorting={false}
        muiTableContainerProps={{
          sx: {
            maxHeight: "calc(100vh - 276px)",
          },
          ...muiTableContainerProps,
        }}
        enableBottomToolbar={enableBottomToolbar}
        enableTopToolbar={false}
        // muiTableBodyRowProps={{ hover: false }}
        renderEmptyRowsFallback={renderEmptyRowsFallback}
        paginateExpandedRows={false}
        // muiTableHeadCellProps={{
        // 	sx: {
        // 		backgroundColor: "#F1F1F1",
        // 		fontWeight: "700",
        // 		fontSize: "14px",
        // 		color: (theme) => theme.palette.text.primary,
        // 		py: 2,
        // 	},
        // }}
        muiTableHeadCellProps={{
          ...muiTableHeadCellProps,

          sx: {
            ...muiTableHeadCellProps.sx,
            py: 1.5,
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "none",
            // color: "#999999",
            color: "#2a2a2f",
            // background: "#f6f6f6",
            // background: "#f7f7f7",
            background: "#F5F4FD",
          },
          // align: "right",
        }}
        icons={{
          ExpandMoreIcon: ChevronRight,
          KeyboardDoubleArrowDownIcon: ChevronRight,
        }}
        muiTableFooterRowProps={muiTableFooterRowProps}
        renderBottomToolbar={({ table }) => (
          <>
            {(data.length > 0 || tableData.length > 0) && (
              <BluecomMRTablePagination
                table={table}
                totalRows={totalRows}
                shallUseRouter={shallUseRouter}
                basePath={basePath}
              />
            )}
          </>
        )}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 20],
          showFirstButton: true,
          showLastButton: true,
        }}
        //   can be use for internal scroll
        // enableStickyFooter
        enableStickyHeader
        muiLinearProgressProps={({ isTopToolbar }) => ({
          sx: {
            display: isTopToolbar ? "block" : "none",
          },
        })}
        autoResetExpanded={false}
        autoResetAll={false}
        autoResetPageIndex={false}
        // enableExpanding
        muiTableHeadRowProps={{
          ...muiTableHeadRowProps,
          sx: {
            // ...muiTableHeadRowProps.sx,
            // background: "yellow",
            width: "100%",
            py: 2,
            // background: "#f1f1f1",

            borderBottom: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "none",
            // textAlign: "center",
          },
        }}
        muiTableBodyCellProps={{
          ...muiTableBodyCellProps,
          sx: {
            py: 1,
            ...muiTableBodyCellProps.sx,
            maxWidth: "500px",
            // overflowX: "scroll",

            fontSize: "15px !important",
            fontWeight: "500 !important",
            color: (theme) => theme.palette.text.primary,
            // "&:hover": {
            // 	border: "none",
            // },
            // "& span .MuiIconButton-root": {
            // 	width: "unset",
            // 	height: "unset",
            //   padding: "0",
            // },
          },
          // align: "right",
        }}
        muiExpandButtonProps={({ row }) => ({
          sx: {
            // width: "unset",
            // height: "unset",
            // padding: "0px",
            transform: row.getIsExpanded() ? "rotate(270deg)" : "rotate(0deg)",
            ...(!row.getCanExpand() && {
              visibility: "hidden",
            }),
          },
        })}
        muiTableBodyRowProps={{
          sx: {
            "&:hover": {
              background: "transparent",
            },
          },
        }}
        muiExpandAllButtonProps={({ row, table }) => ({
          sx: {
            width: "unset",
            height: "unset",
            padding: "0px",
            transform: table.getIsAllRowsExpanded()
              ? "rotate(270deg)"
              : "rotate(0deg)",
            // ...(table.getIsSomeRowsExpanded()&&{
            //   // visibility: "hidden",
            //   transform: "rotate(0deg)",
            // })
            // ...(!row.getCanExpand() && {
            // 	visibility: "hidden",
            // }),
          },
        })}
        muiTableFooterCellProps={
          {
            // align: "right",
          }
        }
        enableTableFooter={tableData.length > 0 || data.length > 0}
        // enableColumnResizing
        // muiTablePaginationProps={{
        //   ActionsComponent: (props) => {
        //     return <Pagination />;
        //   },
        // }}
        // getSubRows={(row) => row.children}
        //   muiTableContainerProps={{ sx: { maxHeight: 400 } }}
        {...props}
      />
    </>
  );
}
