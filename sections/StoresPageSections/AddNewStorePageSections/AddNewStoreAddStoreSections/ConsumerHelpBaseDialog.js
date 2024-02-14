import { Box, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import WooCommerceConsumerHelp from "./WooCommerceConsumerHelp";
import WooComHelpStep1 from "public/assets/stores/WooComHelpStep1.png";
import WooComHelpStep2 from "public/assets/stores/WooComHelpStep2.png";
import WooComHelpStep3 from "public/assets/stores/WooComHelpStep3.png";
import WooComHelpStep4 from "public/assets/stores/WooComHelpStep4.png";
import WooComHelpStep5 from "public/assets/stores/WooComHelpStep5.png";
import WooComHelpStep6 from "public/assets/stores/WooComHelpStep6.png";
import Image from "next/image";

function ConsumerHelpBaseDialog(props) {
  return (
    <div>
      <BaseDialog
        open={props.open}
        handleClose={props.handleClose}
        // {props.open}
        // {handleClose}
        title={
          <SectionTitleText sx={{ fontWeight: 600, fontSize: "18px" }}>
            {" "}
            Find Consumer Key/Secret{" "}
          </SectionTitleText>
        }
      >
        <Box
          sx={{
            height: "700px",
            width: "660px",
            mb: 2,
          }}
        >
          <WooCommerceConsumerHelp
            stepNumber={"Step 1"}
            description={
              <>
                <Typography
                  sx={{ ml: 2, my: 1, fontWeight: 500, fontSize: "14px" }}
                >
                  Go to:{" "}
                </Typography>
                <Typography
                  sx={{ fontWeight: 700, ml: 1, my: 1, fontSize: "14px" }}
                >
                  WooCommerce
                  {">"}
                  Settings {">"}
                  {/* <NavigateNextIcon /> */}
                  Advanced {">"}
                  {/* <NavigateNextIcon /> */}
                  RestAPI.
                </Typography>
              </>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep1} alt="WooCommerce" />{" "} */}
                <Image src={WooComHelpStep1} alt="WooCommerce" />
              </>
            }
          />

          <WooCommerceConsumerHelp
            stepNumber={"Step 2"}
            description={
              <>
                <Typography
                  sx={{ ml: 2, my: 1, fontWeight: 500, fontSize: "14px" }}
                >
                  Select <strong style={{ fontWeight: 700 }}>Add Key.</strong>{" "}
                  You are taken to Key Details Screen.{" "}
                </Typography>
              </>
            }
            descriptionImage={
              <>
                {/* <AppImage src={WooComHelpStep2} alt="WooCommerce" /> */}
                <Image src={WooComHelpStep2} alt="WooCommerce" />
              </>
            }
          />

          <WooCommerceConsumerHelp
            stepNumber={"Step 3"}
            description={
              <Box>
                <Typography
                  sx={{ ml: 2, my: 0, fontSize: "14px", fontWeight: 500 }}
                >
                  Add a Description
                </Typography>
                <Typography
                  sx={{ ml: 2, my: 1, fontSize: "14px", fontWeight: 500 }}
                >
                  <strong style={{ fontWeight: 700 }}>Select The User</strong>{" "}
                  you would like to generate a key for in the dropdown.
                </Typography>
                <Typography
                  sx={{ ml: 2, mt: 1, fontSize: "14px", fontWeight: 500 }}
                >
                  Select a level of access for the API key{" "}
                  <strong style={{ fontWeight: 700 }}>-Read/Write</strong>{" "}
                  access.
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep3} alt="WooCommerce" /> */}
                <Image src={WooComHelpStep3} alt="WooCommerce" />
              </>
            }
          />

          <WooCommerceConsumerHelp
            stepNumber={"Step 4"}
            description={
              <>
                <Typography
                  sx={{ ml: 2, my: 1, fontSize: "14px", fontWeight: 500 }}
                >
                  Select{" "}
                  <strong style={{ fontWeight: 700 }}>Generate API Key</strong>{" "}
                  and WooCommerce creates API keys for that user.
                </Typography>
              </>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep4} alt="WooCommerce" /> */}
                <Image src={WooComHelpStep4} alt="WooCommerce" />
              </>
            }
          />

          <WooCommerceConsumerHelp
            stepNumber={"Step 5"}
            description={
              <>
                <Box sx={{ my: 1 }}>
                  <Typography sx={{ ml: 2, fontSize: "14px", fontWeight: 500 }}>
                    Now that keys have been generated, you should see Consumer
                    Key and Consumer Secret Key, a QRcode.
                  </Typography>
                </Box>
              </>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep5} alt="WooCommerce" /> */}
                <Image src={WooComHelpStep5} alt="WooCommerce" />
              </>
            }
          />

          <WooCommerceConsumerHelp
            stepNumber={"Step 6"}
            description={
              <>
                {" "}
                <Typography
                  sx={{ ml: 2, my: 1, fontSize: "14px", fontWeight: 500 }}
                >
                  Paste{" "}
                  <strong style={{ fontWeight: 700 }}>
                    Consumer Key and Consumer Secret
                  </strong>{" "}
                  into the corresponding fields.
                </Typography>
              </>
            }
            descriptionImage={
              <>
                {/* <AppImage
                  sx={{ pb: 2 }}
                  src={WooComHelpStep6}
                  alt="WooCommerce"
                /> */}
                <Image sx={{ pb: 4 }} src={WooComHelpStep6} alt="WooCommerce" />
              </>
            }
          />
        </Box>
      </BaseDialog>
    </div>
  );
}

export default ConsumerHelpBaseDialog;
