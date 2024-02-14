import { Pagination, PaginationItem, Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function BluecomMRTablePagination({
  table,
  totalRows,
  shallUseRouter,
  basePath,

  ...props
}) {
  const router = useRouter();
  const { currentPage } = router.query;
  const pageForRouter = Number(currentPage && currentPage) || 1;
  const pageCountFromList = Math.ceil(totalRows / 13);

  const handlePageChange = (event, value) => {
    if (shallUseRouter) {
      // apiRef.current.setPage(value - 1);
      if (basePath) {
        return router.replace(`${basePath}currentPage=${value}`);
      }
    }
    return table.setPageIndex(value - 1);
  };
  if (!shallUseRouter && table.getPageCount() === 1) return;

  if (shallUseRouter && totalRows) {
    if (pageCountFromList === 1) return;
    return (
      <Box
        sx={{
          py: 1,
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid rgba(0,0,0,0.10)",
        }}
      >
        <Pagination
          // component={Pagination}
          // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          sx={{
            display: "flex",
            // width: "100%",
            // "&:hover": {
            // 	color: "#4F44E0",
            // 	background: "#F5F4FD",
            // 	// borderRadius: "7px",
            // },
          }}
          // colSpan={12}
          count={
            pageCountFromList
            // table.getPageCount()
          }
          // variant="outlined"
          color="primary"
          // shape="rounded"
          page={
            Number(pageForRouter)
            // table.getState().pagination.pageIndex + 1
          }
          onChange={(event, value) => handlePageChange(event, value)}
          renderItem={(item) => (
            <PaginationItem
              sx={{
                transition: "all 0.3s ease-in-out",

                "&:hover": {
                  color: (theme) => theme.palette.primary.main,

                  background: "#F5F4FD",
                },
              }}
              slots={{
                previous: MdArrowBack,
                next: MdArrowForward,
              }}
              {...item}
            />
          )}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1, display: "flex", justifyContent: "center" }}>
      <Pagination
        // component={Pagination}
        // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        sx={{
          display: "flex",
          background: "3fff",
          // width: "100%",
        }}
        // colSpan={12}
        count={table.getPageCount()}
        // variant="outlined"
        color="primary"
        // shape="rounded"
        page={table.getState().pagination.pageIndex + 1}
        onChange={(event, value) => table.setPageIndex(value - 1)}
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
  );
}
