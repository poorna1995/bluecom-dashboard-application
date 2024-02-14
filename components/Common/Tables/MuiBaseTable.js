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
import React from "react";
import { useState } from "react";

const MuiBaseTable = ({
  newData = [{}],
  selectable,
  baseCardStyles,
  tableHeadRowStyles,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getHeaderData =
    (Array.isArray(newData) &&
      newData.length > 0 &&
      newData.map((item) => item)) ||
    [];
  console.log({ getHeaderData });

  const getColumnTitles =
    (getHeaderData.length > 0 &&
      Object.keys(getHeaderData[0]) &&
      Object.keys(getHeaderData[0]).map((item) => item)) ||
    [];
  const getRowsData = newData.map((item) => {
    const { key, common, data } = item;
    return item;
  });
  const handleItemClick = (e, item) => {
    // console.log("itemClicked", { data });
    setOpenDialog(true);
    setDialogData(item);
  };
  const handleDialogClose = async () => {
    await setOpenDialog(false);
    // setDialogData([]);
  };
  // console.log({ getHeaderData, getColumnTitles, newData });
  return (
    <BaseCard sx={baseCardStyles}>
      <TableContainer>
        <Table>
          <TableHead sx={tableHeadRowStyles}>
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
            {newData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((item, index) => (
                <TableRow key={index} onClick={(e) => handleItemClick(e, item)}>
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

      {Array.isArray(newData) && newData.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={newData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {/* <BaseDialog
				open={openDialog}
				handleClose={() => handleDialogClose()}
			>
				<DialogChildComponent dialogData={dialogData} />
			</BaseDialog> */}
    </BaseCard>
  );
};

export default MuiBaseTable;

const DialogChildComponent = ({ dialogData }) => {
  const { common, data } = dialogData && dialogData;
  const header =
    Array.isArray(data) && Object.keys(data[0]).map((item) => item);
  return (
    <BaseCard sx={{ padding: "32px" }}>
      <DescriptionText>
        Component Name:{" "}
        <span style={{ fontWeight: 700 }}>
          {common && common["Component Name"]}
        </span>
      </DescriptionText>
      <TableContainer
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          marginTop: "16px",
        }}
      >
        <Table>
          <TableHead sx={{ fontWeight: 700 }}>
            <TableRow>
              {Array.isArray(header) &&
                header.map((item, index) => (
                  <TableCell key={index} sx={{ fontWeight: 700 }}>
                    {item}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item, index) => {
                const getKeys = Object.values(item).map((key, index) => (
                  <TableCell key={index} label={key}>
                    {key}
                  </TableCell>
                ));
                return <TableRow key={index}>{getKeys}</TableRow>;
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};
