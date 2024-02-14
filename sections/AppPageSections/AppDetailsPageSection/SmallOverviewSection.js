import React from "react";
import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import TopSectionProductDescription from "sections/ProductsPageSection/ProductsDetailsPageSection/components/TopSectionProductDescription";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import BillIcon from "components/Common/Icons/BillIcon";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
export default function SmallOverviewSection({
  data,
  usedIn,
  isUsedOnReviewPage,
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          // borderBottom: "2px solid rgba(0,0,0,0.1)",
          // backgroundColor: "white",
          // background: "white",
          zIndex: (theme) => theme.zIndex.drawer + 11000,
          flex: 1,
          py: 2,
        }}
      >
        <Box>
          {/* <BaseCard
sx={{
height: "150px",
width: "120px",
marginLeft: "20px",
marginBottom: "20px",
borderRadius: "0px",
}}
> */}
          <AppImage
            src={data.display_image}
            height="100"
            width="100"
            sx={{
              ml: "16px",
              borderRadius: "5px",
              mr: 1,
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            }}
            // sx={{ objectFit: "contain" }}
          />
          {/* </BaseCard> */}
        </Box>

        <Box
          sx={{
            ml: 2,
            flex: 1,
          }}
        >
          <TopSectionProductDescription productType={usedIn} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              mt: "5px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Retail Price:
            </Typography>
            {/* <Typography
          sx={{
          }}
      > */}
            {/* $
          {
              data.unit_retail_price
          } */}
            <RenderCurrency
              value={data.unit_retail_price || data.item_unit_retail_price}
              sx={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            />
            {/* </Typography> */}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {/* {data.category && (
							<Box
								sx={{
									// mt: "1rem",
									display: "flex",
									gap: "0.5rem",
									alignItems: "center",
									p: "0.5rem 0.9rem",
									Width: "1rem",
									borderRadius: "2rem",
									border: "1px solid #0000001A",
									mt: 2,
								}}
							>
								<BillIcon />
								<Typography
									sx={{
										fontSize: "14px",
										fontWeight: "700",
									}}
								>
									{data.category}
								</Typography>
							</Box>
						)} */}
          </Box>
          {/* <PrimaryButton
						sx={{
							m: "1rem 0",
						}}
						onClick={() => router.push(editLink)}
					>
						Edit
					</PrimaryButton> */}
        </Box>
        {!isUsedOnReviewPage && (
          <Box>
            {
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "right",
                  pr: "1rem",
                  gap: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {/* {!(data.status === "unlisted") && (
										<StatusAsChip
											status={data.status}
											fontSize={14}
											fontWeight={700}
											marginTop={"-5px"}
										/>
									)}
									{!(data.status == "unlisted") && (
										<Divider
											orientation="vertical"
											flexItem
											sx={{
												height: "2.5rem",
												alignSelf: "center",
												ml: "0.5rem",
											}}
										/>
									)} */}
                  {/* {Array.isArray(getChannelsData) &&
										getChannelsData.map((item, index) => (
											<RenderChannelAsIcon
												key={index}
												channel={item}
												value={item["Channel Name"]}
											/>
										))} */}
                </Box>

                {/* {productURL && (
									<OutlinedButton
										onClick={() => handleViewProduct()}
										sx={{
											ml: 1,
										}}
										startIcon={<ViewLiveIcon />}
									>
										View Live product
									</OutlinedButton>
								)} */}
                {
                  // <Box>
                  // 	<Box>
                  // 		<DescriptionText
                  // 			sx={{
                  // 				color: "#595959",
                  // 				fontWeight: "500",
                  // 				fontSize: "14px",
                  // 				"& span": {
                  // 					fontWeight: 800,
                  // 					ml: 2,
                  // 				},
                  // 			}}
                  // 		>
                  // 			Created on
                  // 			<span>
                  // 				: {formatedCreatedAtDate}
                  // 			</span>
                  // 		</DescriptionText>
                  // 	</Box>
                  // 	<Box>
                  // 		<DescriptionText
                  // 			sx={{
                  // 				color: "#595959",
                  // 				fontWeight: "500",
                  // 				fontSize: "14px",
                  // 				"& span": {
                  // 					fontWeight: 800,
                  // 				},
                  // 			}}
                  // 		>
                  // 			Last Updated
                  // 			<span>
                  // 				: {formatedLastUpdatedDate}
                  // 			</span>{" "}
                  // 		</DescriptionText>
                  // 	</Box>
                  // </Box>
                }
              </Box>
            }
          </Box>
        )}
      </Box>
    </Box>
  );
}
