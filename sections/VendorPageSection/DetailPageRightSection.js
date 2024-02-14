import { Box, Divider, Typography } from "@mui/material";
import OutlineClockIcon from "components/Common/Icons/OutlineClockIcon";
import WalletIcon from "components/Common/Icons/WalletIcon";
import { VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function DetailPageRightSection() {
  const router = useRouter();
  const vendorId = router.query.vendorId;
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.merchant_id;
  const [vendorList, setVendorList] = useState([]);

  const handleFetchVendor = () => {
    const URL = VENDOR.FETCH_VENDOR;
    setLoading(true);
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      setVendorList(json.result[0]);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchVendor();
    }
    // setLoading(false);
  }, [vendorId]);
  console.log("Hey", vendorList);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "20px",
          marginRight: { md: "50px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
              },
              "& svg path": {
                color: "#4F44E0",
                // fill: "#d92d20",
                stroke: "#484A9E",
              },
            }}
          >
            <WalletIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 1,
              // mr: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "14px",
                  md: "18px",
                },
                fontWeight: {
                  xs: "500",
                  sm: "500",
                  md: "600",
                },
                // color: "#222222",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Products
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "18px",
                  md: "32px",
                },
                fontWeight: "700",
                paddingTop: "8px",
                // color: "#222222",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {vendorList.product_count || "-"}
            </Typography>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
              },
            }}
          >
            <OutlineClockIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 1,
              // mr: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "14px",
                  md: "18px",
                },
                fontWeight: {
                  xs: "500",
                  sm: "500",
                  md: "600",
                },
                // color: "#222222",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              Lead Time
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "18px",
                  sm: "18px",
                  md: "32px",
                },
                fontWeight: "700",
                paddingTop: "8px",
                // color: "#222222",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {vendorList.vendor_lead_time || "-"}
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
}
