import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";

const TableSection = ({ data = [{}], selectable, handleItemClick }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getHeaderData = data.length > 0 && data.map((item) => item);

  const getColumnTitles =
    Object.keys(getHeaderData[0]) &&
    Object.keys(getHeaderData[0]).map((item) => item);

  return (
    <BaseCard
      sx={{
        boxShadow: "none",
        width: "500px",
        height: "auto",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f5f5f5",
              }}
            >
              {selectable && (
                <TableCell sx={{ maxWidth: "50px" }}>
                  <Checkbox />
                </TableCell>
              )}
              {getColumnTitles.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    minWidth: "200",
                    fontWeight: 700,
                    textAlign: "left",
                    fontSize: "14px",
                    borderTop: "1px solid #e0e0e0",

                    "& .MuiTableCell-head": {
                      backgroundColor: "red",
                      color: "red",
                    },
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {newData} */}
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((item, index) => {
                if (handleItemClick) {
                  return (
                    <TableRow key={index} onClick={(e) => handleItemClick()}>
                      {selectable && (
                        <TableCell sx={{ maxWidth: "50px" }}>
                          <Checkbox />
                        </TableCell>
                      )}{" "}
                      {Object.values(item).map((obj, index) => (
                        <TableCell
                          key={index}
                          sx={{
                            minWidth: "auto",
                            textAlign: "left",
                            fontWeight: 700,
                            // cursor: "pointer",
                          }}
                        >
                          {obj}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                }
                return (
                  <TableRow key={index}>
                    {selectable && (
                      <TableCell sx={{ maxWidth: "50px" }}>
                        <Checkbox />
                      </TableCell>
                    )}{" "}
                    {Object.values(item).map((obj, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          minWidth: "auto",
                          textAlign: "left",
                          fontWeight: 600,
                          // cursor: "pointer",
                        }}
                      >
                        {obj}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
				rowsPerPageOptions={[5, 10, 25, 100]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
    </BaseCard>
  );
};

export default TableSection;
