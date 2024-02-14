import React from "react";
import MaterialReactTable from "material-react-table";
import { Box } from "@mui/material";
import ChevronDownIcon from "components/Common/Icons/ChevronDownIcon";
import ChevronRightIcon from "components/Common/Icons/ChevronRight";
export default function MRTGroupedTableForVariants({
  tableData = [],
  columnsData = [],
  columnGroups = [],
}) {
  return (
    <Box>
      <MaterialReactTable
        columns={columnsData}
        data={tableData}
        enableGrouping
        initialState={{
          expanded: true,
          grouping: columnGroups,
          // isFullScreen: true,
          pagination: { pageIndex: 0, pageSize: 10 },
        }}
        // enableColumnResizing
        muiTablePaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
        icons={{}}
        enableTopToolbar={false}
        // enableBottomToolbar={false}
        enableColumnActions={false}
      />
    </Box>
  );
}
