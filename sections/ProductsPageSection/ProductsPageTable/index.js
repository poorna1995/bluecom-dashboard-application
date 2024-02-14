import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

const ProductsPageTable = ({ data = [{}], selectable, itemKey, url }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const router = useRouter();
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
  const getRowsData = data.map((item) => {
    const { key, common, data } = item;
    return item;
  });
  const handleItemClick = (e, item) => {
    router.push(`${url}/${item}`);
  };
  const handleDialogClose = async () => {
    await setOpenDialog(false);
    // setDialogData([]);
  };
  console.log({ getHeaderData, getColumnTitles, newData: data });
  return (
    <BaseCard
      sx={{
        maxWidth: "100%",
        // overflow: "scroll",
        width: "100%",
        boxShadow: "none",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
                    textAlign: "center",
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

              .map((item, index) => (
                <TableRow
                  key={index}
                  onClick={(e) =>
                    handleItemClick(e, item[itemKey || "Master Product ID"])
                  }
                >
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
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {obj}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </BaseCard>
  );
};

export default ProductsPageTable;
