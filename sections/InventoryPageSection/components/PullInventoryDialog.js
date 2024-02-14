import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import { INVENTORY } from "constants/API_URL";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";

import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSyncInventoryTaskId } from "redux/tasks/tasksSlice";
import appFetch from "utils/appFetch";

export default function PullInventoryDialog({
  open,
  handleClose,
  redirect = true,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentPage } = router.query;
  const [loading, setLoading] = React.useState(false);
  const handlePullInventoryButton = () => {
    setLoading(true);
    const URL = INVENTORY.PULL_PUSH_INVENTORY;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data)
      .then((json) => {
        setLoading(false);
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          dispatch(setSyncInventoryTaskId(json.task_id));

          // if (redirect === true) {
          //   router.push(
          //     `/app/inventory?currentPage=${currentPage || 1}&taskId=${
          //       json.task_id
          //     }`
          //   );
          // } else {
          //   router.push(`/home?taskId=${json.task_id}`);
          // }

          enqueueSnackbar(json.message, {
            variant: "syncInventory",
            persist: true,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
          handleClose();
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "10px !important",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          m: 2,
          mx: 4,
          mt: 3,
          "& .refresh-icon": {
            border: "1px solid #e4e7ec",
            borderRadius: "10px",
            boxShadow: " 0px 1px 2px 0px rgba(16, 24, 40, 0.05)",

            height: "48px",
            width: "48px",
            p: 1,
          },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="refresh-icon"
        >
          <path
            d="M16.3897 4.44803C16.2157 4.67649 16.1395 4.96469 16.1779 5.24929C16.2163 5.53389 16.3661 5.7916 16.5944 5.96578C17.7768 6.86658 18.6685 8.09493 19.1587 9.49822C19.6489 10.9015 19.716 12.4179 19.3516 13.859C18.9873 15.3001 18.2076 16.6024 17.1093 17.6041C16.0111 18.6058 14.6428 19.2628 13.1743 19.4934L13.9424 18.7242C14.1398 18.5199 14.249 18.2462 14.2465 17.9622C14.244 17.6781 14.1301 17.4064 13.9292 17.2056C13.7284 17.0047 13.4567 16.8908 13.1726 16.8883C12.8886 16.8858 12.6149 16.995 12.4106 17.1924L9.70225 19.9007C9.49916 20.1039 9.38507 20.3794 9.38507 20.6666C9.38507 20.9539 9.49916 21.2294 9.70225 21.4325L12.4106 24.1409C12.6149 24.3382 12.8886 24.4474 13.1726 24.4449C13.4567 24.4425 13.7284 24.3285 13.9292 24.1277C14.1301 23.9268 14.244 23.6551 14.2465 23.3711C14.249 23.087 14.1398 22.8134 13.9424 22.609L13.0292 21.6969C14.9706 21.4906 16.8054 20.7063 18.296 19.4455C19.7866 18.1847 20.8645 16.5055 21.39 14.6252C21.9155 12.7449 21.8646 10.7502 21.2437 8.89921C20.6227 7.04825 19.4605 5.42628 17.9074 4.24328C17.679 4.06927 17.3908 3.99309 17.1062 4.03149C16.8216 4.06988 16.5639 4.21971 16.3897 4.44803ZM14.2988 2.56737L11.5905 -0.140967C11.396 -0.337326 11.1338 -0.451919 10.8576 -0.461291C10.5814 -0.470662 10.312 -0.374104 10.1046 -0.191379C9.89726 -0.00865492 9.76758 0.246416 9.74212 0.521626C9.71666 0.796835 9.79735 1.07137 9.96767 1.28903L10.0576 1.39087L10.9708 2.30412C9.06188 2.50717 7.25532 3.26919 5.77762 4.49466C4.29992 5.72012 3.21682 7.3545 2.66408 9.19294C2.11135 11.0314 2.11357 12.9921 2.67048 14.8292C3.22738 16.6664 4.31419 18.2983 5.79467 19.5205C6.01693 19.6963 6.29928 19.7781 6.58114 19.7483C6.863 19.7184 7.12193 19.5792 7.30238 19.3606C7.48283 19.1421 7.57043 18.8615 7.54638 18.579C7.52234 18.2966 7.38856 18.0349 7.17375 17.85C6.04726 16.9197 5.21336 15.684 4.77225 14.2913C4.33114 12.8985 4.3016 11.408 4.68718 9.9989C5.07275 8.58978 5.85704 7.32197 6.94579 6.34785C8.03454 5.37372 9.38142 4.73471 10.8246 4.50762L10.0576 5.2757C9.86329 5.47065 9.75049 5.73225 9.74209 6.00737C9.73369 6.28248 9.83032 6.55047 10.0124 6.75692C10.1944 6.96336 10.4482 7.09278 10.7222 7.11888C10.9962 7.14498 11.2698 7.06581 11.4876 6.89745L11.5894 6.80753L14.2978 4.0992C14.4843 3.91266 14.5963 3.66447 14.6129 3.40119C14.6294 3.13791 14.5494 2.87764 14.3877 2.6692L14.2988 2.56737Z"
            fill="#4F44E0"
          />
        </svg>
        <IconButton onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#4F44E0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconButton>
      </Stack>
      <Stack sx={{ mx: 4 }}>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: " 28px",
            my: 1,
          }}
        >
          Sync Inventory
        </Typography>
        <Typography
          sx={{
            color: " #626266",
            fontSize: " 16px",
            lineHeight: " 24px",
            fontWeight: 500,

            mb: 2,
            mr: 2,
            pr: 2,
          }}
        >
          Inventory from all the store will be synced to Bluecom.
        </Typography>
        <Typography
          sx={{
            color: " #626266",
            fontSize: " 16px",
            lineHeight: " 24px",
            fontWeight: 500,
            mb: 2,
          }}
        >
          Please confirm to sync inventory.
        </Typography>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} m={4}>
        <SecondaryButton onClick={() => handleClose()} sx={{ mr: 2 }} fullWidth>
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={() => handlePullInventoryButton()}
          loading={loading}
          fullWidth
        >
          Sync Inventory
        </PrimaryButton>
      </Stack>
    </Dialog>
  );
}
