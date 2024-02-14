import { Box, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import Image from "next/image";
import BigCommerceConsumerHelp from "./BigCommerceConsumerHelp";
import StoreHashImageStep1 from "public/assets/stores/BigCommerce/StoreHash/StoreHashImageStep1.png";
function BigCommerceHelpDialog2(props) {
  return (
    <div>
      <BaseDialog
        open={props.open}
        handleClose={props.handleClose}
        // {props.open}
        // {handleClose}
        title={
          <SectionTitleText sx={{ fontWeight: 600, fontSize: "18px" }}>
            Store Hash
          </SectionTitleText>
        }
      >
        <Box
          sx={{
            height: "fit-content",
            width: "660px",
            mb: 2,
          }}
        >
          <BigCommerceConsumerHelp
            stepNumber={"Step 1"}
            description={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: 1,
                }}
              >
                <Typography
                  sx={{
                    ml: 2,
                    // my: 1,
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Go to dashboard and copy the hash as mentioned below
                </Typography>
                <span
                  style={{
                    fontWeight: 700,
                    // ml: 1,
                    //  my: 1,
                    fontSize: "14px",
                  }}
                >
                  {/* {">"} */}
                  {/* Settings {">"} */}
                  {/* <NavigateNextIcon /> */}
                  {/* Advanced {">"} */}
                  {/* <NavigateNextIcon /> */}
                  {/* RestAPI. */}
                </span>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep1} alt="WooCommerce" />{" "} */}
                <Image
                  src={StoreHashImageStep1}
                  alt="BigCommerceStoreHashImage"
                />
              </>
            }
          />
        </Box>
      </BaseDialog>
    </div>
  );
}

export default BigCommerceHelpDialog2;
