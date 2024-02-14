import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DrawerLayout from "layouts/DrawerLayout";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductPageView } from "redux/views/viewsSlice";
import ProductGridItemCard from "sections/ProductsPageSection/ProductGridItemCard";
import ProductsPageTable from "sections/ProductsPageSection/ProductsPageTable";
import WarehousePageSection from "sections/WarehousePageSection";

const mapState = ({ views }) => ({
  pageView: views.productPageView,
});

const columns = [
  { field: "warehouseId", headerName: "Warehouse ID", width: 120 },
  { field: "name", headerName: "Name", width: 120 },
  { field: "addressId", headerName: "Address ID", width: 120 },
  { field: "operatorId", headerName: "Operator ID", width: 120 },
  {
    field: "startdate",
    headerName: "Start Date",
    type: "number",
    width: 120,
  },
  { field: "enddate", headerName: "End Date", type: "number", width: 120 },
  {
    field: "address",
    headerName: "Address",
    width: 170,
  },
  //   {
  //     field: 'address',
  //     headerName: 'Address',

  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   },
];

const rows = [
  {
    id: 1,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 2,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 3,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 4,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 5,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 6,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 7,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 8,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
  {
    id: 9,
    warehouseId: "A0B1C024",
    name: "Delhi warehouse",
    addressId: "A0B1C019",
    operatorId: "DH3-002",
    startdate: "Nov 22, 2006",
    enddate: "Nov 22, 2006",
    address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
  },
];
export default function WarehousePage() {
  const { pageView } = useSelector(mapState);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const handleChangeView = (value) => {
    // pageView === "grid" ? "list" : "grid"
    dispatch(setProductPageView(value));
  };

  return (
    <div>
      <DrawerLayout>
        <WarehousePageSection />
      </DrawerLayout>
      {/* <Box sx={{ paddingBottom: "32px" }}>
        <Grid container>
          <Grid
            item
            md={2}
            sx={{
              borderRight: "1px solid rgba(0,0,0,0.1)",
              paddingRight: "8px",
              position: "sticky",
              // top: "68px",
            }}
          >
       
          </Grid>
          <Grid item md={2}>
            <Box>
              <Box sx={{}}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    padding: "16px",
                    // marginTop: "16px",
                    aliginItems: "center",
                  }}
                >
                  <SectionTitleText>Products List</SectionTitleText>
                  <div style={{ flex: 1, width: "100%" }} />
                  <PrimaryButton
                    sx={{ mx: 6 }}
                    onClick={() => handleAddProducts()}
                  >
                    Add new product
                  </PrimaryButton>

                  <ToggleButtonGroup
                    value={pageView}
                    exclusive
                    onChange={(e, value) => handleChangeView(value)}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="list" aria-label="list">
                      <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="grid" aria-label="grid">
                      <GridViewIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>

              {Array.isArray(data) && data.length > 0 && (
                <Box sx={{ padding: "16px" }}>
                  {pageView === "list" && (
                    <ProductsPageTable
                      data={formattedTableData}
                      url="/app/products"
                      itemKey={"Master Product Id"}
                    />
                  )}
                  {pageView === "grid" && (
                    <>
                      <Grid container spacing={2}>
                        {formattedTableData.map((item, index) => (
                          <Grid item md={3} sm={6} xs={12} key={index}>
                            <ProductGridItemCard item={item} />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box> */}
    </div>
  );
}
