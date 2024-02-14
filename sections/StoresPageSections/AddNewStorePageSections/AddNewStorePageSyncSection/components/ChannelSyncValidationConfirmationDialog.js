import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import React from "react";
import ChannelToBluecom from "../../AddNewStoreAddStoreSections/components/ChannelToBluecom";
import { channelIconsList } from "sections/StoresPageSections/components/AddStoreSelectChannelComponent";

const styles = {
  titleRowStyles: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    fontSize: "18px",
    fontWeight: 700,
    p: 2,
    color: "#222",
    "& .icon-container": {
      borderRadius: "8px",
      border: "1px solid #E5E5E5",
      p: 1,
      width: "52px",
      height: "52px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mr: 2,
    },
  },
  rowStyles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "16px",
    color: "#555",
    fontWeight: 500,
    // maxWidth: "300px",
    px: 4,
    // my: 2,
    py: 1,
    "& b": {
      color: "#000",
    },
  },
};

/**
 * data = {
 * 
    "existed_item_sku": 41,
    "existed_product_sku": 2,
    "locations_count": 0,
    "new_item_sku": 41,
    "new_product_sku": 8,
    "products_count": 10,
    "total_inventory": 0,
    "variants_count": 82
    has_compared:'hivepath-test-store',
}
 */
export default function ChannelSyncValidationConfirmationDialog({
  open,
  handleClose,
  handleConfirmButton,
  shopName,
  product,
  totalInventory,
  totalLocations,
  channel,
  data = {},
}) {
  const channelData = channelIconsList.find((item) => item.key === channel);
  const hasBeenCompared = Boolean(data.has_compared);
  const comparedStore = data.has_compared;
  const hasDuplicateSKU = data.existed_product_sku > 0;

  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      dialogActions={
        <>
          <PrimaryButton onClick={handleConfirmButton} sx={{ my: 1, mr: 2 }}>
            Turn on Pull
          </PrimaryButton>
        </>
      }
      hideCloseButton={true}
      // title={"Turn On Inventory Pull"}
      title={"Sync Summary"}
      titleStyles={{
        color: "#222",
        fontSize: "21px",
        fontWeight: 700,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        mt: 0,
      }}
      dialogContentStyles={{
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ maxWidth: "576px", pt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: -3,
            mb: -2,
          }}
        >
          <ChannelToBluecom channel={channel} />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            color: "#555",
            fontSize: "21px",
            fontWeight: 500,
            pb: 1,
            "& b": {
              color: "#222",
            },
          }}
        >
          Connecting <b>{channelData.title}</b> to <b>Bluecom</b>
        </Typography>

        {/* New UI */}
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.1)",
            // p: 2,
            borderRadius: "10px",
            my: 2,
          }}
        >
          <Box sx={styles.titleRowStyles}>
            <div className="icon-container">{channelData.icon}</div>{" "}
            <span>{shopName}</span>
          </Box>
          <Typography
            sx={{
              p: 2,
              pb: 0,
              fontSize: "16px",
              fontWeight: "500",
              color: "#555",
            }}
          >
            We have established Connection to the store. Summary of your store.
          </Typography>
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.1)",
              maxWidth: "400px",
              margin: "auto",
              my: 2,
              // py: 3,
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                ...styles.rowStyles,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <span>Total Products</span> <b>{product}</b>
            </Box>
            <Box
              sx={{
                ...styles.rowStyles,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <span>Total Inventory Qty</span>{" "}
              {/* <span>No. of Products with Inventory</span>{" "} */}
              <b>{totalInventory}</b>
            </Box>
            <Box sx={styles.rowStyles}>
              {/* <span>Total Locations </span> */}
              <span>Count of Locations </span>
              <b> {totalLocations}</b>
            </Box>
          </Box>
        </Box>
        {hasBeenCompared && (
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.1)",
              // p: 2,
              borderRadius: "10px",
              my: 2,
              background: "#FEF7F0",
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: "#555",
                fontSize: "16px",
                fontWeight: 500,
                "& b": {
                  color: "#000",
                },
              }}
            >
              Compared <b>{comparedStore}</b> vs <b>{shopName}</b>
            </Typography>
            {hasDuplicateSKU && (
              <>
                <Typography
                  sx={{
                    color: "#555",
                    fontSize: "14px",
                    fontWeight: 500,
                    my: 1,
                    "& b": {
                      color: "#000",
                    },
                  }}
                >
                  You have <b>{data.existed_product_sku}</b> products with same
                  SKU. This can cause issues while managing with your Inventory
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    maxWidth: "400px",
                    my: 1,
                    mt: 2,
                    mx: "auto",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    flex: 1,
                    "& div": {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mr: 2,
                      flex: 0.5,
                      "& span": {
                        color: "#555",
                        fontSize: "16px",
                        fontWeight: 500,
                        mr: 2,
                      },
                      "& b": {
                        color: "#000",
                      },
                    },
                  }}
                >
                  <div
                    style={{
                      borderRight: "1px solid rgba(0,0,0,0.1)",
                      paddingRight: "16px",
                    }}
                  >
                    <span> Existed SKU</span> <b>{data.existed_product_sku}</b>
                  </div>

                  <div>
                    <span>New SKU</span>
                    <b> {data.new_product_sku}</b>
                  </div>
                </Box>
              </>
            )}
            {!hasDuplicateSKU && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    "& span": {
                      color: "#555",
                      fontSize: "16px",
                      fontWeight: 500,
                      ml: 2,
                    },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="30"
                    viewBox="0 0 29 30"
                    fill="none"
                  >
                    <path
                      d="M12.47 18.0944L9.31625 14.9406C9.05042 14.6748 8.72417 14.5419 8.3375 14.5419C7.95083 14.5419 7.6125 14.6869 7.3225 14.9769C7.05667 15.2427 6.92375 15.581 6.92375 15.9919C6.92375 16.4027 7.05667 16.741 7.3225 17.0069L11.455 21.1394C11.7208 21.4052 12.0592 21.5381 12.47 21.5381C12.8808 21.5381 13.2192 21.4052 13.485 21.1394L21.7138 12.9106C21.9796 12.6448 22.1125 12.3185 22.1125 11.9319C22.1125 11.5452 21.9675 11.2069 21.6775 10.9169C21.4117 10.651 21.0733 10.5181 20.6625 10.5181C20.2517 10.5181 19.9133 10.651 19.6475 10.9169L12.47 18.0944ZM14.5 29.9844C12.4942 29.9844 10.6092 29.6035 8.845 28.8418C7.08083 28.081 5.54625 27.0481 4.24125 25.7431C2.93625 24.4381 1.90337 22.9035 1.1426 21.1394C0.380867 19.3752 0 17.4902 0 15.4844C0 13.4785 0.380867 11.5935 1.1426 9.82938C1.90337 8.06521 2.93625 6.53063 4.24125 5.22563C5.54625 3.92063 7.08083 2.88726 8.845 2.12552C10.6092 1.36476 12.4942 0.984375 14.5 0.984375C16.5058 0.984375 18.3908 1.36476 20.155 2.12552C21.9192 2.88726 23.4538 3.92063 24.7588 5.22563C26.0638 6.53063 27.0966 8.06521 27.8574 9.82938C28.6191 11.5935 29 13.4785 29 15.4844C29 17.4902 28.6191 19.3752 27.8574 21.1394C27.0966 22.9035 26.0638 24.4381 24.7588 25.7431C23.4538 27.0481 21.9192 28.081 20.155 28.8418C18.3908 29.6035 16.5058 29.9844 14.5 29.9844Z"
                      fill="#12B76A"
                    />
                  </svg>
                  <span>We have detected no duplicates in your products</span>
                </Box>
              </>
            )}
          </Box>
        )}
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography
              sx={{
                color: "#3D3D3D",
                fontSize: " 16px",
                fontWeight: 600,
                lineHeight: " 20px",
              }}
            >
              {/* I understand that after turning on sync, Inventory will be updated
              on your store. */}
              I acknowledge to pull the data from store and read through the
              summary shown above.
            </Typography>
          }
        />
      </Box>
    </BaseDialog>
  );
}
