import React from "react";
import { Chip } from "@mui/material";

function StatusAsChipPlan({
    status,
    marginTop,
    fontSize,
    fontWeight,
    borderRadius,
    paddingx,
    paddingy,
    width,
}) {
    let color = "";
    let label = "";
    let background = "";
    let borderColor = "";

    // const statusProcess = status.split(" ")
    // const statusCheck = statusProcess[statusProcess.length - 1]
    switch (status) {
        case "active":
            color = "#12B76A";
            label = "Active";
            background = "rgba(1, 166, 119, 0.2)";
            borderColor = "#01A677";
            break;
        case "draft":
            color = "#F79009";
            label = "Draft";
            background = "#FFF0C3";
            borderColor = "#01A677";
            break;
        case "Inprogress":
            color = "#F28300";
            label = "Inprogress";
            background = "#FFEFDC";
            borderColor = "#01A677";
            break;
        case "Pending":
            color = "#B1B1BF";
            label = "Pending";
            background = "#ECECF0";
            borderColor = "#01A677";
            break;
        default:
            color = "";
            label = status;
            break;
    }

    return (
        <Chip
            sx={{
                fontSize: fontSize ? fontSize : "12px",
                fontWeight: fontWeight ? fontWeight : "600",
                color: color,
                backgroundColor: background,
                border:"1px solid",
                borderColor: borderColor,
                borderRadius: borderRadius ? borderRadius : "30px",
                height: "31px",
                px: paddingx ? paddingx : "8px",
                py: paddingy ? paddingy : "21px",
                width: width ? width : "fit-content",
            }}
            label={label}
        />
    );
}

export default StatusAsChipPlan;
