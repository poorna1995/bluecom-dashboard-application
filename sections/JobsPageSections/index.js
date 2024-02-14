import { Box, Typography } from "@mui/material";
import AppLink from "components/Common/AppLink";
import CustomCircularProgress from "components/Common/Progress/CustomCircularProgress";
import CustomCircularProgressWithLabel from "components/Common/Progress/CustomCircularProgressWithLabel";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import EmptyState from "components/Common/EmptyState";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import BluecomMRTBaseTable from "components/Common/Tables/BluecomCustomGroupedTable/BluecomMRTBaseTable";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import JobsES from "components/Common/Icons/EmptyStates/JobsES";
import MobileViewAppPageSection from "sections/AppPageSections/MobileViewAppPageSections/MobileViewAppPageSection";
import MobileViewJobCard from "./MobileViewComponents/MobileViewJobCard";
import { useRouter } from "next/router";
import updatePageData from "sections/AppPageSections/MobileViewAppPageSections/utils/updatePageData";
import MobileViewJobCardSkeleton from "./MobileViewComponents/MobileViewJobCardSkeleton";
import NewEmptyState from "components/Common/EmptyState/NewEmptyState";

const mapState = ({ productsData, user }) => ({
  productsData,
  currentUser: user.currentUser,
});

export default function JobsPageSections() {
  const { productsData, currentUser } = useSelector(mapState);
  const taskID = productsData.publishTaskID;
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { currentPage } = router.query;

  const handleFetchTaskList = () => {
    const URL = PRODUCT.FETCH_LIST_OF_TASKS;
    setLoading(true);
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        setTableData(json.result);
        setLoading(false);
      }
    });
  };

  /**
	 * {
    "created_at": "2023-03-07T11:39:00.891682",
    
    "task_id": "2ae9f9f2-cfc3-4378-af34-80afbd1eaa83",
    "task_percentage": 62.5,
    "task_status": "progress",
    "task_type": "bulk_publish",
    "updated_at": "2023-03-07T11:39:42.383576",
    "user_id": "138944605333795140"
}
	 */
  useEffect(() => {
    handleFetchTaskList();
  }, []);

  console.log({ tableData });
  const formattedTableData =
    Array.isArray(tableData) &&
    tableData.map((item) => {
      const { updated_at } = item;
      const date = (updated_at && new Date(updated_at)) || "";
      const formattedDate =
        (updated_at && date && format(date, "dd/MM/yyyy HH:mm:ss")) || "";
      return {
        ...item,
        last_update: formattedDate,
      };
    });
  const columns = [
    {
      field: "task_id",
      accessorKey: "task_id",
      Header: (
        <>
          <span style={{ marginLeft: "16px" }}>Job ID</span>
        </>
      ),
      headerName: (
        <>
          <p style={{ marginLeft: "16px" }}>Job ID</p>
        </>
      ),
      flex: 1,
      size: 500,
      // renderCell: (params) => (
      // 	<AppLink href={`/app/jobs/${params.value}`}>
      // 		{params.value}
      // 	</AppLink>
      // ),
      renderCell: (params) => (
        <RenderAppLink
          href={`/app/jobs/${params.value}`}
          title={params.value}
        />
      ),
      Cell: ({ cell }) => (
        <RenderAppLink
          href={`/app/jobs/${cell.getValue()}`}
          title={cell.getValue()}
        />
      ),
    },
    {
      field: "task_type",
      accessorKey: "task_type",
      header: "Task Type ",
      headerName: "Task Type",
      width: 200,
      size: 200,
      valueGetter: (params) => {
        if (params.row.result.length === 1) {
          return "Publish";
        } else {
          return "Bulk Publish";
        }
      },
      Cell: ({ cell }) => (
        <Typography
          sx={{
            fontWeight: "500",
          }}
        >
          {cell.row.original.result.length === 1 ? "Publish" : "Bulk Publish"}
        </Typography>
      ),
    },

    {
      field: "task_status",
      accessorKey: "task_status",
      header: "Status",
      headerName: "Status",
      width: 200,
      size: 100,

      align: "center",
      headerAlign: "center",
      renderCell: (params) => <RenderStatus value={params.value} />,
      Cell: ({ cell }) => <RenderStatus value={cell.getValue()} />,
      // flex: 1,
      muiTableBodyCellProps: {
        align: "left",
      },
      muiTableHeadCellProps: {
        align: "left",
      },
    },
    {
      field: "task_percentage",
      accessorKey: "task_percentage",
      header: "Percentage",
      headerName: "Percentage",
      // flex: 1,
      width: 200,
      size: 100,
      renderCell: (params) => (
        <CustomCircularProgressWithLabel progress={params.value} />
      ),
      Cell: ({ cell }) => (
        <CustomCircularProgressWithLabel progress={cell.getValue()} />
      ),
      align: "center",
      headerAlign: "center",
      muiTableBodyCellProps: {
        align: "center",
      },
      muiTableHeadCellProps: {
        align: "center",
      },
    },
    {
      field: "last_update",
      accessorKey: "updated_at",
      header: "Last Updated",
      headerName: "Last Updated",
      width: 200,
      size: 200,
      Cell: ({ cell }) => <RenderDate date={cell.getValue()} />,
      // flex: 1,
      // renderCell: (params) => (
      // 	<CustomCircularProgressWithLabel progress={params.value} />
      // ),
    },
  ];
  const activePageData = updatePageData({
    currentPage,
    data: formattedTableData,
  });

  const maxHeight = typeof window !== "undefined" && window.innerHeight - 185;
  return (
    <Box sx={{ pt: "8px" }}>
      {/* {formattedTableData.length === 0 && (
      <EmptyState
          text={"No Job data "}

	  />
      )}
      {loading && <PageLoader/> } */}
      {/* {loading && <PageSpinner />} */}

      {/* {formattedTableData.length > 0 && ( */}
      <Box
        sx={{
          display: {
            md: "block",
            xs: "none",
            sm: "none",
          },
        }}
      >
        {formattedTableData.length > 0 && (
          <SectionTitleText
            sx={{
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: "34px",
              // mt:"8px",
              mb: "12px",
              color: "#484A9E",
            }}
          >
            Jobs List
          </SectionTitleText>
        )}

        {formattedTableData.length === 0 && !loading && (
          <NewEmptyState
            containerStyles={{
              maxWidth: "480px",
            }}
            icon={<JobsES />}
            hideActionOne
            hideActionTwo
            hideActionThree
            hidePoints
            hideRecommendedTitle
          >
            <Typography
              sx={{
                fontSize: "21px",
                fontWeight: "700",
                color: "#313131",
              }}
            >
              No Job Data
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#626266",
              }}
            >
              Create and manage your Vendors all in one place.
            </Typography>
          </NewEmptyState>
        )}

        {formattedTableData.length > 0 && (
          <BluecomMRTBaseTable
            data={formattedTableData}
            rowHeight={60}
            columnsData={columns}
            rowIdkey="task_id"
            checkboxSelection={false}
            muiTableContainerProps={{
              sx: {},
            }}
            muiTableBodyCellProps={{
              sx: {
                height: "60px",
              },
            }}
            state={{
              showSkeletons: loading,
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: {
            md: "none",
            xs: "block",
            sm: "block",
          },
        }}
      >
        <MobileViewAppPageSection
          basePath={`/app/jobs?`}
          hideButton={true}
          tableData={activePageData}
          loading={loading}
          shallUseRouter={true}
          title={"Jobs"}
          totalCount={formattedTableData.length}
          component={MobileViewJobCard}
          skeletonComponent={MobileViewJobCardSkeleton}
        />
      </Box>
      {/* )} */}

      {/* )} */}
    </Box>
  );
}
