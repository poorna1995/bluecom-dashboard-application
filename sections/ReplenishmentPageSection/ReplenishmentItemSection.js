import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { Box } from "@mui/system";
import StatusChip from "components/Common/Chip/StatusChip";

const tableData = [
  {
    id: 1,
    ItemName: "M/RED",
    Status: 85 + "%",
    L365: 2345,
    L6190: 2345,
    L3190: 2345,
    L30: 2345,
    L15: 2345,
    AOH: 2345,
    OO: 2345,
    fcst: 2345,
    need: 2345,
    ro: 2345,
    qty: 5623,
    FinalQTY: 2345,
    percentage: 2345,
  },
  {
    id: 2,
    ItemName: "M/RED",
    Status: 85 + "%",
    L365: 2345,
    L6190: 2345,
    L3190: 2345,
    L30: 2345,
    L15: 2345,
    AOH: 2345,
    OO: 2345,
    fcst: 2345,
    need: 2345,
    ro: 2345,
    qty: 5623,
    FinalQTY: 2345,
    percentage: 2345,
  },
  {
    id: 3,
    ItemName: "M/RED",
    Status: 85 + "%",
    L365: 2345,
    L6190: 2345,
    L3190: 2345,
    L30: 2345,
    L15: 2345,
    AOH: 2345,
    OO: 2345,
    fcst: 2345,
    need: 2345,
    ro: 2345,
    qty: 5623,
    FinalQTY: 2345,
    percentage: 2345,
  },
  {
    id: 4,
    ItemName: "M/RED",
    Status: 85 + "%",
    L365: 2345,
    L6190: 2345,
    L3190: 2345,
    L30: 2345,
    L15: 2345,
    AOH: 2345,
    OO: 2345,
    fcst: 2345,
    need: 2345,
    ro: 2345,
    qty: 5623,
    FinalQTY: 2345,
    percentage: 2345,
  },
  {
    id: 5,
    ItemName: "M/RED",
    Status: 85 + "%",
    L365: 2345,
    L6190: 2345,
    L3190: 2345,
    L30: 2345,
    L15: 2345,
    AOH: 2345,
    OO: 2345,
    fcst: 2345,
    need: 2345,
    ro: 2345,
    qty: 5623,
    FinalQTY: 2345,
    percentage: 2345,
  },
];
const columnsData = [
  // {
  //   field: "id",
  //   headerName: "ID",
  // },
  {
    field: "ItemName",
    headerName: "Item Name",
    flex: 1,
  },
  {
    field: "Status",
    headerName: "Status %",
  },
  {
    field: "L365",
    headerName: "L365",
  },
  {
    field: "L6190",
    headerName: "L61-90",
  },
  {
    field: "L3190",
    headerName: "L31-90",
  },
  {
    field: "L30",
    headerName: "L30",
  },
  {
    field: "L15",
    headerName: "L15",
  },

  {
    field: "AOH",
    headerName: "AOH",
    // flex: 1,
  },
  {
    field: "OO",
    headerName: "OO",
    // flex: 1,
  },
  {
    field: "fcst",
    headerName: "FCST",
    // flex: 1,
  },
  {
    field: "need",
    headerName: "Need",
    // flex: 1,
  },
  {
    field: "ro",
    headerName: "RO",
    // flex: 1,
  },
  {
    field: "qty",
    headerName: "QTY",
    // flex: 1,
  },
  {
    field: "FinalQTY",
    headerName: "Final-QTY",
    // flex: 1,
  },
  {
    field: "percentage",
    headerName: "%",
    // flex: 0.5,
  },
];
function ReplenishmentItemSection() {
  return (
    <div>
      <Accordion
        sx={{
          my: "8px",
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "5px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ backgroundColor: (theme) => theme.palette.grey[50] }}
        >
          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>Master Product ID:</Typography>
            <Typography
              sx={{
                fontWeight: 500,
                color: (theme) => theme.palette.blue[600],
              }}
            >
              A0B1C87
            </Typography>
          </Box>
          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>Product :</Typography>
            <Typography fontWeight={500}> 90s Baby High Jeans</Typography>
          </Box>

          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>IS% :</Typography>
            {/* <StatusChip fontWeight={500} label="85%" /> */}
            {/* <Chip label="85" /> */}
            <Typography fontWeight={500}> 85%</Typography>
          </Box>

          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>LT :</Typography>
            <Typography fontWeight={500}> 45</Typography>
          </Box>

          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>MOQ :</Typography>
            <Typography fontWeight={500}> 154</Typography>
          </Box>

          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>MOQ :</Typography>
            <Typography fontWeight={500}> 154</Typography>
          </Box>

          <Box mx={3} display="flex" lineHeight={2}>
            <Typography fontWeight={800}>Price :</Typography>
            <Typography fontWeight={500}> ₹ 2345</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            borderRadius: "10px",
          }}
        >
          <Box>
            <MuiBaseDataGrid
              rowIdkey={"id"}
              data={tableData}
              columns={columnsData}
              checkboxSelection={false}
              containerStyles={{
                maxHeight: "500px",
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
    // <Accordion>
    //   {" "}
    //   <AccordionSummary
    //     expandIcon={<ExpandMoreIcon />}
    //     aria-controls="panel1a-content"
    //     id="panel1a-header"
    //   >
    //     {/* ROW Item info to be added */} <Typography>Accordion 1</Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     {/* mui table to be added */}
    //     <Typography>
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    //       malesuada lacus ex, sit amet blandit leo lobortis eget.
    //     </Typography>
    //   </AccordionDetails>
    // </Accordion>
  );
}

export default ReplenishmentItemSection;
