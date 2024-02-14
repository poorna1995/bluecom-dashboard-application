import { Box, Typography } from "@mui/material";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import Image from "next/image";
import BigCommerceConsumerHelp from "./BigCommerceConsumerHelp";
import Imagestep1 from "public/assets/stores/BigCommerce/StoreCliIdSecretToken/Imagestep1.png";
import Imagestep2 from "public/assets/stores/BigCommerce/StoreCliIdSecretToken/Imagestep2.png";
import Imagestep3 from "public/assets/stores/BigCommerce/StoreCliIdSecretToken/Imagestep3.png";
import Imagestep4 from "public/assets/stores/BigCommerce/StoreCliIdSecretToken/Imagestep4.png";
import Imagestep5 from "public/assets/stores/BigCommerce/StoreCliIdSecretToken/Imagestep5.png";
import Imagestep6 from "public/assets/stores/BigCommerce/StoreCliIdSecretToken/Imagestep6.png";

function BigCommerceHelpDialog3(props) {
  return (
    <div>
      <BaseDialog
        open={props.open}
        handleClose={props.handleClose}
        // {props.open}
        // {handleClose}
        title={
          <SectionTitleText sx={{ fontWeight: 600, fontSize: "18px" }}>
            Find Client Id/Client secret/Access Token
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
                  Go to:{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      // ml: 1,
                      // my: 1,
                      fontSize: "14px",
                    }}
                  >
                    BigCommerce
                    {" > "}
                    {/* {">"} */}
                    {/* <NavigateNextIcon /> */}
                    {/* Advanced {">"} */}
                    {/* <NavigateNextIcon /> */}
                    {/* RestAPI. */}
                  </span>
                  Click on{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Settings
                  </span>
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep1} alt="WooCommerce" />{" "} */}
                <Image src={Imagestep1} alt="WooCommerce" />
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
                  Scroll down on Setting Page and Click on
                  <span
                    style={{
                      fontWeight: 700,
                      // ml: 1,
                      // my: 1,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    Store-level API Accounts
                    {/* {">"} */}
                    {/* Settings */}
                    {/* {">"} */}
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
                <Image src={Imagestep2} alt="WooCommerce" />
              </>
            }
          />

          <BigCommerceConsumerHelp
            stepNumber={"Step 3"}
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
                      //  ml: 1,
                      // my: 1,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    Read/Create Api Account{" "}
                  </span>
                  <span
                    style={{
                      //   ml: 1,
                      // my: 1,
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    button.
                  </span>
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep3} alt="WooCommerce" /> */}
                <Image src={Imagestep3} alt="WooCommerce" />
              </>
            }
          />

          <BigCommerceConsumerHelp
            stepNumber={"Step 4"}
            description={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: 1,
                }}
              >
                <Box>
                  <Box>
                    <Typography
                      sx={{
                        ml: 2,
                        //  my: 1,
                        fontWeight: 500,
                        fontSize: "14px",
                      }}
                    >
                      Select
                      <strong style={{ fontWeight: 700 }}>
                        {" "}
                        V2/V3 Api Token
                      </strong>{" "}
                      from Token Type
                    </Typography>
                  </Box>

                  <Typography
                    sx={{ ml: 2, my: 1, fontWeight: 500, fontSize: "14px" }}
                  >
                    Enter a name for Reference in{" "}
                    <span
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      Name
                    </span>
                  </Typography>
                </Box>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep4} alt="WooCommerce" /> */}
                <Image src={Imagestep4} alt="WooCommerce" />
              </>
            }
          />

          <BigCommerceConsumerHelp
            stepNumber={"Step 5"}
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
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Scroll down and{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      ml: 1,
                      // my: 1,
                      fontSize: "14px",
                    }}
                  >
                    select set Products, Store Locations & Inventory{" "}
                  </span>
                  to
                  <span
                    style={{
                      fontWeight: 700,
                      ml: 1,
                      // my: 1,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    Modify{" "}
                  </span>
                  <span
                    style={{
                      ml: 1,
                      // my: 1,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    as mentioned below and Click{" "}
                    <strong style={{ fontWeight: 700 }}>Save.</strong>
                  </span>
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {" "}
                {/* <AppImage src={WooComHelpStep5} alt="WooCommerce" /> */}
                <Image src={Imagestep5} alt="WooCommerce" />
              </>
            }
          />

          <BigCommerceConsumerHelp
            stepNumber={"Step 6"}
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
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    Copy
                  </span>{" "}
                  the{" "}
                  <span
                    style={{
                      ml: 1,
                      // my: 1,
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    Client ID, Client Secret and Access Token{" "}
                  </span>
                  and paste them here in the
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    Add Store Page.
                  </span>
                </Typography>
              </Box>
            }
            descriptionImage={
              <>
                {/* <AppImage
                  sx={{ pb: 2 }}
                  src={WooComHelpStep6}
                  alt="WooCommerce"
                /> */}
                <Image sx={{ pb: 4 }} src={Imagestep6} alt="WooCommerce" />
              </>
            }
          />
        </Box>
      </BaseDialog>
    </div>
  );
}

export default BigCommerceHelpDialog3;
