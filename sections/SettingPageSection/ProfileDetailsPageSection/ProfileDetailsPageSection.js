import { Box, Divider } from "@mui/material";
import React, { useEffect } from "react";
import TitleBackButtonComponent from "./components/TitleBackButtonComponent";
import ProfileDetailsFormComponent from "./components/ProfileDetailsFormComponent";
import { useQuery } from "@tanstack/react-query";
import { MERCHANT } from "constants/API_URL";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import PageSpinner from "components/Common/LoadingIndicators/PageSpinner";
import { updateUserData } from "redux/user/userSlice";
import { useCookies } from "react-cookie";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function ProfileDetailsPageSection() {
  const { currentUser } = useSelector(mapState);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profileDetails"],
    queryFn: () =>
      appFetch(MERCHANT.FETCH_DATA, {
        merchant_id: currentUser.merchant_id,
      }).then((json) => json.result[0]),
  });
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["merchant_currency"]);

  useEffect(() => {
    if (data) {
      dispatch(updateUserData(data));
      setCookie("merchant_currency", data.merchant_currency, {
        path: "/",
        domain: process.env.NODE_ENV === "production" && ".bluecom.ai",
      });
    }
  }, [data]);
  if (isLoading) return <PageSpinner />;

  // console.log("data", data);
  if (data)
    return (
      <Box>
        <TitleBackButtonComponent />
        {/* <Divider /> */}
        <ProfileDetailsFormComponent data={data} refetch={refetch} />
      </Box>
    );
}
