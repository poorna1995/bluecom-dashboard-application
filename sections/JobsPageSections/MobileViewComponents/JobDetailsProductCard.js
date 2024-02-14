import { Box, Typography, IconButton } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import channelsOptions from "constants/channelOptions";
import React from "react";

export default function JobDetailsProductCard({ orderedList, statusText }) {
  console.log("orderedListForMOBILE", orderedList);

  //   <Box>{publishProducts.result.created_at}</Box>
  return (
    <>
      {Array.isArray(orderedList) &&
        orderedList.map((data, index) => {
          return (
            <>
              <Box
                sx={{
                  p: 2,
                  borderBottom: `1px solid rgba(17, 17, 17, 0.10)`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "",
                    // flex: 1,
                  }}
                >
                  <RenderAppImage
                    display_image={data.display_image}
                    sx={{
                      border: "1px solid #E0E0E0",
                      borderRadius: "4px",
                      width: "36px",
                    }}
                  />
                  <Box
                    sx={{
                      ml: 1,
                      flex: 1,
                    }}
                  >
                    <AppLink
                      href={`/app/products/${data.master_product_id}?tab=overview`}
                      sx={{
                        color: "#212121",
                        fontFamily: "Inter",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 600,
                      }}
                      title={data.product_title}
                    >
                      {data.product_title}
                    </AppLink>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <RenderStatus value={statusText} />
                    <Box
                      sx={{
                        ml: 1,
                        mt: 1,
                      }}
                    >
                      <AppImage
                        src={channelsOptions[data.channel_id].image}
                        width="40"
                        height="40"
                        sx={{
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    mt: "-8px",
                  }}
                >
                  <IconButton
                    sx={{
                      background: "rgba(79, 68, 224, 0.10)",
                    }}
                    onClick={() => window.open(data.public_link, "_blank")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <path
                        d="M4.36254 8.60748L3.3815 9.55985C3.12426 9.81684 2.77535 9.96122 2.41155 9.96122C2.04774 9.96122 1.69884 9.81684 1.44159 9.55985C1.18434 9.30286 1.03982 8.9543 1.03982 8.59087C1.03982 8.22742 1.18434 7.87887 1.44159 7.62188L3.95793 5.10252C4.20492 4.85498 4.5377 4.71175 4.88744 4.70248C5.23717 4.6932 5.57709 4.81858 5.83688 5.05268L5.90339 5.10805C6.00849 5.21085 6.15017 5.26773 6.29725 5.26617C6.44433 5.26461 6.58477 5.20475 6.68767 5.09975C6.79057 4.99475 6.8475 4.85322 6.84594 4.70628C6.84438 4.55935 6.78446 4.41905 6.67935 4.31626C6.64807 4.27585 6.61477 4.23704 6.57959 4.19998C6.10644 3.78875 5.49453 3.57254 4.86779 3.59516C4.24105 3.61778 3.64635 3.87753 3.20414 4.32179L0.654543 6.84115C0.221309 7.31224 -0.012997 7.93232 0.000556886 8.5719C0.0141108 9.21148 0.274476 9.8211 0.72728 10.2734C1.18008 10.7258 1.79031 10.9859 2.43053 10.9994C3.07075 11.013 3.69145 10.7789 4.16301 10.3461L5.12188 9.41035C5.21656 9.30717 5.2686 9.17199 5.26755 9.03202C5.26649 8.89205 5.2124 8.75768 5.11618 8.65593C5.01995 8.55419 4.88873 8.49263 4.7489 8.48364C4.60908 8.47465 4.47103 8.5189 4.36254 8.60748ZM10.2876 0.722704C9.82133 0.259809 9.19069 0 8.53335 0C7.87602 0 7.24537 0.259809 6.77912 0.722704L5.82025 1.65847C5.72557 1.76165 5.67353 1.89683 5.67459 2.0368C5.67564 2.17676 5.72973 2.31114 5.82595 2.41288C5.92218 2.51463 6.05341 2.57619 6.19323 2.58518C6.33305 2.59417 6.4711 2.54992 6.57959 2.46134L7.53846 1.50897C7.7957 1.25198 8.14461 1.1076 8.50841 1.1076C8.87222 1.1076 9.22112 1.25198 9.47837 1.50897C9.73562 1.76596 9.88014 2.11451 9.88014 2.47795C9.88014 2.84139 9.73562 3.18995 9.47837 3.44694L6.96203 5.9663C6.71504 6.21384 6.38226 6.35706 6.03252 6.36634C5.68279 6.37561 5.34287 6.25023 5.08308 6.01613L5.01657 5.96076C4.91147 5.85797 4.76979 5.80109 4.62271 5.80265C4.47563 5.8042 4.33519 5.86407 4.23229 5.96907C4.12939 6.07407 4.07246 6.2156 4.07402 6.36253C4.07558 6.50947 4.1355 6.64976 4.24061 6.75256C4.28087 6.79369 4.32343 6.83252 4.36809 6.86884C4.8418 7.27883 5.45345 7.49422 6.07981 7.47162C6.70617 7.44901 7.30067 7.19009 7.74353 6.74702L10.2654 4.22766C10.7317 3.76481 10.9958 3.13644 11 2.47975C11.0041 1.82307 10.748 1.19141 10.2876 0.722704Z"
                        fill="#4F44E0"
                      />
                    </svg>
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#4F44E0",
                    }}
                  >
                    View Product
                  </Typography>
                </Box>
              </Box>
            </>
          );
        })}
    </>
  );
}
