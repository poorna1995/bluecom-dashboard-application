import React from "react";
import {
  Box,
  Typography,
  Grid,
  GridItem,
  Checkbox,
  Container,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";

const PricingSubscriptionPage = () => {
  return (
    <div>
      {/* PricingTable Heading */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <Grid
          container
          spacing={3}
          justify="center"
          alignItems="center"
          sx={{ width: "75%", margin: "auto" }}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#F9F9FB",
              paddingBottom: "20px",
              borderRadius: "5px",
            }}
          >
            <Grid container spacing={3}>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    lineHeight: "36px",
                    color: "#000000",
                  }}
                >
                  Basic
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    lineHeight: "36px",
                    color: "#000000",
                  }}
                >
                  Premium
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "30px",
                    fontWeight: "700",
                    lineHeight: "36px",
                    color: "#000000",
                  }}
                >
                  Custom
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "20px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    marginRight: "50px",
                  }}
                >
                  PIM Features
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#F9F9FB",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                    marginLeft: "30px",
                  }}
                >
                  Product attributes{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  {" "}
                  Up to 1000 SKUs
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Up to 1000 SKUs{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Up to 1000 SKUs{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Asset management{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#F9F9FB",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Pricing & Cost{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Taxonomy & Variants{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#F9F9FB",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Bundle Integration{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    marginRight: "1.5px",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Supplier & Vendor managment{" "}
                </Typography>
                <HelpOutlineIcon
                  fontSize="small"
                  sx={{ color: "#818B98", fontWeight: "300", opacity: "0.4" }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#F9F9FB",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Fulfillment management{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "20px",
              }}
            >
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000000",
                    fontSize: "17px",
                    fontWeight: "400",
                    lineHeight: "22px",
                  }}
                >
                  Multi Channel View{" "}
                  <span style={{ verticalAlign: "middle" }}>
                    <HelpOutlineIcon
                      fontSize="small"
                      sx={{
                        color: "#818B98",
                        fontWeight: "300",
                        opacity: "0.4",
                        marginLeft: "0.4rem",
                      }}
                    />
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckIcon
                  sx={{ color: "#4A3AFF", fontWeight: "bold", fontSize: 25 }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Multi store mangagement */}

      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        sx={{ width: "75%", margin: "auto", marginTop: "50px" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                Multi Store Management{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Link Multi-Channel Stores{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                Up to 5 Stores
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Up to 5 Stores{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Static & animated{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#F9F9FB",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                Publish Flow{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                Max. 25 MB
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Max. 100 MB{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Unlimited{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                Product Versioning{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                Up to 5 Stores
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Up to 5 Stores{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Static & animated{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Inventory Management  */}

      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        sx={{ width: "75%", margin: "auto", marginTop: "50px" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                Inventory Management{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Multi Store Inventory Sync{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                Up to 5 Stores
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Up to 5 Stores{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Static & animated{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#F9F9FB",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Publish inventory to multi-channel{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                Max. 25 MB
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Max. 100 MB{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Unlimited{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* PO Management */}

      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        sx={{ width: "75%", margin: "auto", marginTop: "50px" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                PO Management{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                PO Creation{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                PNG, PDF, MP4
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                PNG, JPEG, PDF, MP4{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                PNG, JPEG, PDF, GIF, MP4
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#F9F9FB",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                Exporting (PDF, CSV){" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                {" "}
                1:1 and 9:16
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                1:1, 1,91:1, 4:5, 9:16{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Unlimited{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                Replenishment Features{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Vendor Management */}

      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        sx={{ width: "75%", margin: "auto", marginTop: "50px" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                Vendor Managment
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                }}
              >
                Create and Store Vendor Information{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#F9F9FB",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                Add Products{" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#000000",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "22px",
                  marginLeft: "30px",
                }}
              >
                Import & Export ( CSV, PDF){" "}
                <span style={{ verticalAlign: "middle" }}>
                  <HelpOutlineIcon
                    fontSize="small"
                    sx={{
                      color: "#818B98",
                      fontWeight: "300",
                      opacity: "0.4",
                      marginLeft: "0.4rem",
                    }}
                  />
                </span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ fontWeight: "bold", fontSize: 25 }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PricingSubscriptionPage;
