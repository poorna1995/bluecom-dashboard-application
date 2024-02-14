import { Box, Button, Grid } from "@mui/material";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import React from "react";
import ProductGridItemCard from "../ProductGridItemCard";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import FilterCloseIcon from "components/Common/Icons/FilterCloseIcon";
import { Filter } from "@mui/icons-material";
import AddIcon from "components/Common/Icons/add";
import { useSelector } from "react-redux";
import { handleFetchProductsList } from "./apiHelpers/handleFetchProductsList";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import bluecomProductsListTableColumnsData from "../constants/TableColumnsData/bluecomProductListTableColumnData";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ProductsListSection({}) {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const { currentPage } = router.query;
  const { data, isLoading } = useQuery({
    queryKey: ["productsList"],
    queryFn: () =>
      handleFetchProductsList({
        userId: currentUser.merchant_id,
        page: currentPage || 1,
        perPage: 10,
      }).then((json) => json),
  });
  console.log({ data });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Box
        sx={{
          paddingTop: "8px",
          px: "8px",
        }}
      >
        {/* {pageView === "list" && ( */}
        <BluecomMRTBaseTable
          muiTableBodyCellProps={{
            sx: {
              maxHeight: "20px",
              overflow: "hidden",
            },
          }}
          tableData={data}
          state={{
            isLoading: isLoading,
          }}
          // rowHeight={40}
          columnsData={bluecomProductsListTableColumnsData}
        />
        {/* )} */}
      </Box>
    </div>
  );
}
