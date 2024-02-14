import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";

export default function StoreListSkeleton() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          px: 2,
          mt: 2,
        }}
      >
        <Skeleton width={40} height={48} />

        <Skeleton
          height={48}
          sx={{
            width: "80px",
            ml: 2,
          }}
        />
      </Box>
      <Grid container spacing={3} sx={{ mt: 0, px: 2 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          return (
            <Grid item key={index} xs={12} md={4} sm={6}>
              <BaseCard
                sx={{
                  boxShadow: "none",
                  border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  p: 2,
                  borderRadius: "12px",
                  maxWidth: "100%",
                }}
              >
                <Skeleton
                  sx={{
                    // pb: 2,
                    width: "120px",
                  }}
                />
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      sx={{
                        width: "48px",
                        height: "80px",
                      }}
                    />

                    <Box sx={{ ml: 2 }}>
                      <Skeleton
                        sx={{
                          fontWeight: 600,
                          fontSize: "17px",
                          lineHeight: "28px",
                          marginTop: "5px",
                          width: "200px",
                        }}
                      />
                      <Skeleton
                        sx={{
                          width: "120px",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",

                    mt: 1,
                    flex: 1,
                  }}
                >
                  <Skeleton
                    sx={{
                      width: "240px",
                      height: "52px",
                    }}
                  />
                  <Skeleton
                    sx={{
                      width: "240px",
                      ml: 4,
                      height: "52px",
                    }}
                  />
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Skeleton
                    sx={{
                      width: "120px",
                      height: "52px",
                    }}
                  />
                  <Skeleton
                    sx={{
                      width: "120px",
                      height: "52px",
                    }}
                  />
                </Box>
              </BaseCard>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
