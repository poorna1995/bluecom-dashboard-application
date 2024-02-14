import { Button, Chip } from "@mui/material";
import React, { useState } from "react";

export default function VariantChipGroup({ data = [] }) {
  const [showMore, setShowMore] = React.useState(false);
  const [listData, setListData] = useState(data.slice(0, 6) ?? []);
  const isGreaterThan8 = data.length > 6 ? true : false;
  const handleClickShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      setListData(data.slice(0, 6));
    } else {
      setListData(data);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        gap: 16,
        display: "flex",
        flexWrap: "wrap",
        // rowGap: 16,
        alignItems: "center",
      }}
    >
      {listData.map((it, id) => {
        return (
          <Chip
            key={`${it - id}`}
            label={it}
            sx={{
              // mr: 2,
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "19px",
              color: "#000",
              p: "10px 21px",
              height: "38px",
              borderRadius: "54px",
              // gap: 2,
              border: "1px solid #E5E4F4",
              background: "#F5F4FD",
            }}
          />
        );
      })}
      {isGreaterThan8 && (
        <Button
          onClick={() => handleClickShowMore()}
          sx={{
            textTransform: "initial",
            // fontSize: "16px",

            pt: 0,
            pb: 0,
            // mt: -2,
            "&:hover": {
              background: "transparent",
            },
          }}
          disableRipple
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      )}
    </div>
  );
}
