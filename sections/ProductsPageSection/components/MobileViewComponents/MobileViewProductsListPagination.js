import { Box, Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function MobileViewProductsListPagination({
  totalRows,
  shallUseRouter,
  basePath,
}) {
  const router = useRouter();
  const { currentPage } = router.query;
  const pageForRouter = Number(currentPage && currentPage) || 1;
  const pageCountFromList = Math.ceil(totalRows / 10);

  const handlePageChange = (event, value) => {
    if (shallUseRouter) {
      // apiRef.current.setPage(value - 1);
      if (basePath) {
        return router.replace(`${basePath}currentPage=${value}`);
      }
    }
    return table.setPageIndex(value - 1);
  };

  if (shallUseRouter && totalRows) {
    return (
      <Box sx={{ py: 1, display: "flex", justifyContent: "center" }}>
        <Pagination
          // component={Pagination}
          // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          sx={{
            display: "flex",
            // width: "100%",
          }}
          // colSpan={12}
          count={
            pageCountFromList
            // table.getPageCount()
          }
          variant="outlined"
          shape="rounded"
          page={
            Number(pageForRouter)
            // table.getState().pagination.pageIndex + 1
          }
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
    );
  }

  // return (
  //   <Box sx={{ py: 1, display: "flex", justifyContent: "center" }}>
  //     <Pagination
  //       // component={Pagination}
  //       // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
  //       sx={{
  //         display: "flex",
  //         // width: "100%",
  //       }}
  //       // colSpan={12}
  //       count={table.getPageCount()}
  //       variant="outlined"
  //       shape="rounded"
  //       page={table.getState().pagination.pageIndex + 1}
  //       onChange={(event, value) => table.setPageIndex(value - 1)}
  //       renderItem={(item) => (
  //         <PaginationItem
  //           slots={{
  //             previous: MdArrowBack,
  //             next: MdArrowForward,
  //           }}
  //           {...item}
  //         />
  //       )}
  //     />
  //   </Box>
  // );
}
