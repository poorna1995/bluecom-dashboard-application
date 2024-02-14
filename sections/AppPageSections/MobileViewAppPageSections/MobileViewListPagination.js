import { Box, Pagination, PaginationItem } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export default function MobileViewListPagination({
  totalRows,
  shallUseRouter,
  basePath,
  paginationSize,
}) {
  const router = useRouter();
  const { currentPage } = router.query;
  const pageForRouter = Number(currentPage && currentPage) || 1;
  const pageCountFromList = Math.ceil(totalRows / 10);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(1);

  const handlePageChange = (event, value) => {
    if (shallUseRouter) {
      // apiRef.current.setPage(value - 1);
      if (basePath) {
        return router.replace(`${basePath}currentPage=${value}`);
      }
    }
    // return setCurrentPageIndex(value);
  };
  // console.log({
  //   totalRows,
  //   shallUseRouter,
  //   currentPage,
  //   pageForRouter,
  //   pageCountFromList,
  //   currentPageIndex,
  // });

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
          // variant="outlined"
          color="primary"
          // shape="rounded"
          size={paginationSize || "small"}
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
  //       count={pageCountFromList}
  //       variant="outlined"
  //       shape="rounded"
  //       page={Number(currentPageIndex)}
  //       // onChange={(event, value) => table.setPageIndex(value - 1)}
  //       onChange={(event, value) => handlePageChange(event, value)}
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
