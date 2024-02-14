import { Box, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import Image from "next/image";
import BigCommerceConsumerHelp from "./BigCommerceConsumerHelp";
import StoreNameImageStep1 from "public/assets/stores/BigCommerce/StoreName/StoreNameImageStep1.png";
import StoreNameImageStep2 from "public/assets/stores/BigCommerce/StoreName/StoreNameImageStep2.png";

function BigCommerceHelpDialog1(props) {
  return (
    <div>
      <BaseDialog
        open={props.open}
        handleClose={props.handleClose}
        // {props.open}
        // {handleClose}
        title={
          <SectionTitleText sx={{ fontWeight: 600, fontSize: "18px" }}>
            Find Store Name
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
                  Click on
                  <span
                    style={{
                      fontWeight: 700,
                      // ml: 1,
                      // my: 1,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    View Store
                    {/* {">"} */}
                    {/* Home {">"} */}
                    {/* <NavigateNextIcon /> */}
                    {/* Advanced {">"} */}
                    {/* <NavigateNextIcon /> */}
                    {/* RestAPI. */}
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    in your{" "}
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    BigCommerce Dashboard{" "}
                  </span>
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep1} alt="WooCommerce" />{" "} */}
                <Image src={StoreNameImageStep1} alt="BigCommerceStoreName" />
              </>
            }
          />

          <BigCommerceConsumerHelp
            stepNumber={"Step 2"}
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
                    //  my: 1,
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  Copy the name{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      // ml: 1,
                      my: 1,
                      fontSize: "14px",
                    }}
                  >
                    as shown below
                    {/* {">"} */}
                    {/* Home {">"} */}
                    {/* <NavigateNextIcon /> */}
                    {/* Advanced {">"} */}
                    {/* <NavigateNextIcon /> */}
                    {/* RestAPI. */}
                  </span>
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {/* <AppImage src={WooComHelpStep2} alt="WooCommerce" /> */}
                <Image src={StoreNameImageStep2} alt="BigCommerceStoreName" />
              </>
            }
          />
        </Box>
      </BaseDialog>
    </div>
  );
}

export default BigCommerceHelpDialog1;
