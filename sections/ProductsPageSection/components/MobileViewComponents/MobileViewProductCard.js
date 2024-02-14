import { Box, IconButton, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import ChannelGroups from "components/Common/AvatarGroups/ChannelGroups";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderCurrency from "components/Common/Tables/RenderComponents/RenderCurrency";
import RenderDate from "components/Common/Tables/RenderComponents/RenderDate";
import RenderStatusAsChip from "components/Common/Tables/RenderComponents/RenderStatusAsChip";
import React from "react";
import { MdArrowRight, MdChevronRight } from "react-icons/md";

export default function MobileViewProductCard({ data = {} }) {
  console.log({ data });
  return (
    <Box sx={{ py: 2, borderBottom: `1px solid rgba(17, 17, 17, 0.10)` }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "",
          flex: 1,
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
              lineHeight: "20px" /* 121.429% */,
              letterSpacing: " -0.28px",
              // mb: 1,
            }}
            title={data.product_title}
          >
            {data.product_title}
          </AppLink>

          <Typography
            sx={{
              color: "#616161",
              fontFamily: "Inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "20px" /* 166.667% */,
              letterSpacing: " -0.24px",
              mt: 1,
            }}
          >
            {data.total_qty} inventory for {data.items_count} variants
          </Typography>
          <Box
            sx={{
              mt: 1,
            }}
          >
            <RenderCurrency
              value={data.unit_retail_price}
              sx={{
                color: "#000",
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: " 20px",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              mt: 1,
              // justifyContent: "space-between",
            }}
          >
            <RenderStatusAsChip status={data.status} />
            <Box
              sx={{
                pl: 1,
                ml: 1,
                borderLeft: "1px solid rgba(17, 17, 17, 0.10)",
              }}
            >
              <ChannelGroups
                // channels={params.value}
                channelDetails={data.channels || []}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#616161",
                fontFamily: "Inter",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px" /* 166.667% */,
                letterSpacing: " -0.24px",
              }}
            >
              Last Updated
            </Typography>
            <RenderDate
              date={data.updated_at}
              sx={{
                color: "#616161",
                fontFamily: "Inter",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "20px" /* 166.667% */,
                letterSpacing: " -0.24px",
              }}
            />
          </Box>
        </Box>
        {/* <Box
					sx={{
						display: "flex",
						flexDirection: "column",
						// justifySelf: "flex-end",
					}}
				>
					<Box>
						<IconButton
							LinkComponent={AppLink}
							href={`/app/products/${data.master_product_id}?tab=overview`}
						>
							<MdChevronRight />
						</IconButton>
					</Box>
					<RenderCurrency
						value={data.unit_retail_price}
						sx={{
							color: "#000",
							fontFamily: "Inter",
							fontSize: "14px",
							fontStyle: "normal",
							fontWeight: 600,
							lineHeight: " 20px" 
						}}
					/>
				</Box> */}
      </Box>
    </Box>
  );
}

/**
 * {
    "barcode": "",
    "category": "",
    "channel_id": [
        5
    ],
    "channels": [
        {
            "channel_id": 5,
            "channel_product_link": "https://bluecom.mybigcommerce.com/safari-pentagon-65-cms-medium-check-in-polypropylene-hard-sided-4-wheels-360-degree-wheeling-system-luggage-cyan-blue/",
            "shop": "bluecom",
            "store_id": "621253517243765709"
        }
    ],
    "collection": [],
    "created_at": "2023-07-05T15:06:27+00:00",
    "display_image": "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/574/17cfac39-95de-4c72-a3b2-45e573049793__70443.1688569590.386.513.png?c=1",
    "images": [
    ],
    "inventory_item_id": "923046305674230091",
    "is_bundle": false,
    "is_component": false,
    "is_sellable": true,
    "item_desc": "",
    "item_display_image": "",
    "item_title": "",
    "item_unit_cost_price": 2699,
    "item_unit_retail_price": 9890,
    "items_count": 8,
    "live_date": "2023-07-05T15:06:27+00:00",
    "master_product_id": "913608154360034296",
    "options": [
        {
            "id": 0,
            "name": "Size",
            "sequence": 0,
            "value": "66x47x28"
        },
        {
            "id": 1,
            "name": "Color",
            "sequence": 1,
            "value": "WHITE"
        }
    ],
    "product_barcode": "",
    "product_desc": "<ul>\n<li>PREMIUM QUALITY: Pentagon is a scratch and impact resistant, light weight yet durable suitcase made of polypropylene. This water resistant high quality trendy hard case trolley bag makes travelling comfortable</li>\n<li>DIMENSIONS : Our stylish yet spacious two compartment textured luggage comes in dimension - 66cms x 47 cms x 28cms. It has a capacity of 87L .Provided with spacious divider compartment to hold all necessary things while travelling.</li>\n<li>FEATURES &amp; STYLE: Our 4 Wheel Cyan Blue Trolley bag comes with a Number Lock. We provide you a smooth adjustable handle for easy movement of the Trolley. Our medium size check in suitcase is a perfect product for all your travel</li>\n<li>Style: Show off with our trendy yet comfortable travel suitcase with 360 degree easy manoeuvrable wheels. Explore the world with our multifunctional suitcase</li>\n<li>3 YEAR WARRANTY: All our bags are MADE IN INDIA and come with a 3-year International Warranty against manufacturing defects</li>\n</ul>\n",
    "product_sku": "",
    "product_title": "Safari Pentagon 65 Cms Medium Check-in Polypropylene Hard Sided 4 Wheels 360 Degree Wheeling System Luggage, Cyan Blue",
    "sku": "B097QP8JGZ_66x47x28_WHITE",
    "status": "active",
    "tag": [],
    "total_qty": 104,
    "type": "physical",
    "unit_cost_price": 2699,
    "unit_retail_price": 9890,
    "updated_at": "2023-07-20T10:49:21.962084",
    "user_id": "138944605333795140",
    "warehouse": [
        "77204750618",
        "75970904346",
        "76444270875"
    ],
    "warehouse_count": 3,
    "Product": "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/574/17cfac39-95de-4c72-a3b2-45e573049793__70443.1688569590.386.513.png?c=1",
    "ImageSlides": [
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/567/17cfac39-95de-4c72-a3b2-45e573049793__46397.1688569587.386.513.png?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/568/02344b9c-2372-4b3c-86cb-3ddb7014a132_6c80d4b5-affa-46b8-948f-8a6d615aa217__85645.1688569588.386.513.jpg?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/569/5a2d5215-305f-41b5-b1d9-7933f844ac12__10001.1688569588.386.513.png?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/570/17cfac39-95de-4c72-a3b2-45e573049793_f519ff4b-57c3-413b-8a1a-421c4822d400__46606.1688569589.386.513.jpg?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/571/5a2d5215-305f-41b5-b1d9-7933f844ac12_40b075f4-5eea-4da8-8107-c98a02dddc3e__97408.1688569589.386.513.jpg?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/572/02344b9c-2372-4b3c-86cb-3ddb7014a132__96686.1688569590.386.513.png?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/573/17cfac39-95de-4c72-a3b2-45e573049793_b595029b-7c0a-472a-b93b-ed6b252aa4be__12919.1688569590.386.513.jpg?c=1",
        "https://cdn11.bigcommerce.com/s-abvahy2bu0/products/172/images/574/17cfac39-95de-4c72-a3b2-45e573049793__70443.1688569590.386.513.png?c=1"
    ],
    "Master Product Id": "913608154360034296",
    "Product Title": "Safari Pentagon 65 Cms Medium Check-in Polypropylene Hard Sided 4 Wheels 360 Degree Wheeling System Luggage, Cyan Blue",
    "Item Title": "",
    "Status": "active",
    "Channel Name": "bigcommerce",
    "Created At": "05/07/2023, 08:36 PM",
    "Unit Retail Price": 9890,
    "channelList": [
        {
            "channel_id": 5,
            "channel_name": "bigcommerce"
        }
    ]
}
 */
