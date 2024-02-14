import { Box, Divider } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import DialogForPOMoreOption from "components/Common/Dialog/DialogForPOMoreOption";
import CreateSuccessIcon from "components/Common/Icons/CreateSuccessIcon";
import SuccessDialogIcon from "components/Common/Icons/POicons/DialogIcons/SuccessDialogIcon";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";

export default function MoreOptionDialog({
  title,
  message,
  onCancel,
  onDelete,
  open,
  icon,
  primaryButtonName,
  secondaryButtonName,
  primaryButtonColor,
}) {
  const handleDeleteWarehouse = () => {
    onDelete();
  };

  const handleDeleteDialogClose = () => {
    onCancel();
  };

  const [reason, setReason] = React.useState("");
  return (
    <>
      <DialogForPOMoreOption
        open={open}
        handleClose={handleDeleteDialogClose}
        hideCloseButton={false}
        // containerProps={{
        //   PaperProps: {
        //     sx: {
        //       borderRadius: "10px",
        //       maxWidth: "1000px",
        //       overflow: "hidden",
        //     },
        //   },
        // }}

        PaperProps={{
          sx: {
            borderRadius: "10px",
            maxWidth: "1000px",
            overflow: "unset",
          },
        }}
        sx={{
          "& .MuiPaper-root .MuiPaper-root-MuiDialog-paper": {
            overflow: "unset",
          },
          "& .MuiDialogContent-root": {
            overflow: "unset",
          },
        }}
        dialogContentStyles={{
          "& .MuiDialogContent-root": {
            overflow: "unset",
          },
        }}
      >
        <Box
          sx={{
            marginY: "8px",

            marginX: "8px",
            mt: "32px",
            mb: "2px",
            width: "540px",
            // height: "200px",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            borderRadius: "12px",
            "& svg": {
              mb: "16px",
            },
          }}
        >
          {/* <CreateSuccessIcon /> */}
          {icon ?? <SuccessDialogIcon />}
          <SectionTitleText
            sx={{
              pt: "8px",
              color: "#222222",
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "700",
              lineHeight: "32px",
            }}
          >
            {title}
          </SectionTitleText>
          <DescriptionText
            sx={{
              mt: "18px",
              fontSize: "18px",
              fontWeight: "600",
              // lineHeight: "20px",
              textAlign: "center",
              color: "#313131",
              mb: 4,
            }}
          >
            {message}
          </DescriptionText>

          <FormSelectInput
            placeholder="Select Reason for Cancellation"
            title={"Select Reason*"}
            noPadding
            value={reason}
            options={[
              { value: "1", label: "Item is End of Life (EOL)" },
              { value: "2", label: "I want to Archive this item" },
              { value: "3", label: "I dont need this item anymore" },
              { value: "4", label: "Item is a duplicate" },
              { value: "5", label: "I created this item by mistake" },
            ]}
            onChange={(e) => setReason(e)}
            setValues={setReason}
            containerStyles={{
              width: "80%",
            }}
            styles={{
              control: (provided) => ({
                ...provided,
                height: "58px",
              }),

              menu: (provided) => ({
                ...provided,
                zIndex: 99999,
              }),
              dropdownIndicator: (styles) => ({
                ...styles,
                paddingTop: "16px",
              }),
            }}
            // containerStyles={{
            //   width: "80%",
            // }}
            // styles={{
            //   control: (provided) => ({
            //     ...provided,
            //     height: "58px",
            //   }),

            //   menu: (provided) => ({
            //     ...provided,
            //     zIndex: 99999,
            //   }),
            //   indicatorSeparator: (styles) => ({
            //     ...styles,
            //     display: "none",
            //   }),
            //   option: (styles) => ({
            //     ...styles,
            //     fontWeight: 600,
            //     fontSize: "16px",
            //   }),
            //   singleValue: (styles) => ({
            //     ...styles,

            //     fontSize: "16px",
            //     fontWeight: 600,
            //   }),
            //   placeholder: (styles) => ({
            //     ...styles,

            //     fontSize: "16px",
            //     fontWeight: 500,
            //   }),
            //   input: (styles) => ({
            //     ...styles,

            //     fontSize: "16px",

            //     fontWeight: 600,
            //   }),

            //   dropdownIndicator: (styles) => ({
            //     ...styles,
            //     paddingTop: "16px",
            //   }),

            //   menuList: (styles) => ({
            //     ...styles,
            //     height: "100px",
            //   }),
            // }}
          />

          <Divider
            sx={{
              width: "112%",

              mt: "48px",
              mb: "16px",

              color: "#E0E0E0",
            }}
            variant="middle"
          />
          <Box
            sx={{
              // borderTop: (theme) =>
              // 	`1px solid ${theme.palette.grey[300]}`,
              display: "flex",
              // pt: "32px",

              // bottom: "0",
              width: "65%",

              // pb: "24px",
            }}
          >
            <SecondaryButton
              sx={{
                flex: 0.5,
              }}
              onClick={handleDeleteDialogClose}
            >
              {secondaryButtonName}
            </SecondaryButton>
            <PrimaryButton
              sx={{
                flex: 1,
                ml: "18px",
                backgroundColor: primaryButtonColor,
                "&:hover": {
                  backgroundColor: primaryButtonColor,
                },
              }}
              disabled={reason === ""}
              onClick={handleDeleteWarehouse}
            >
              {primaryButtonName}
            </PrimaryButton>
          </Box>
        </Box>
      </DialogForPOMoreOption>
    </>
  );
}
