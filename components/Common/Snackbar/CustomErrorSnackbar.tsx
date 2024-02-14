import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { IconButton } from "@mui/material";

interface ReportCompleteProps extends CustomContentProps {
  allowDownload?: boolean;
}

const CustomErrorSnackbar = forwardRef<HTMLDivElement, ReportCompleteProps>(
  ({ id, ...props }, ref) => {
    // const classes = useStyles();
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Card
          sx={{
            backgroundColor: "white",
            p: 1,
            px: 2,
            borderRadius: "10px",
            boxShadow: " 0px 0px 13px 0px rgba(0, 0, 0, 0.16)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
            width: "400px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#A4262C"
            />
            <path
              d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
              fill="white"
            />
            <path
              d="M12.92 15.62C12.87 15.5 12.8 15.39 12.71 15.29C12.61 15.2 12.5 15.13 12.38 15.08C12.14 14.98 11.86 14.98 11.62 15.08C11.5 15.13 11.39 15.2 11.29 15.29C11.2 15.39 11.13 15.5 11.08 15.62C11.03 15.74 11 15.87 11 16C11 16.13 11.03 16.26 11.08 16.38C11.13 16.51 11.2 16.61 11.29 16.71C11.39 16.8 11.5 16.87 11.62 16.92C11.74 16.97 11.87 17 12 17C12.13 17 12.26 16.97 12.38 16.92C12.5 16.87 12.61 16.8 12.71 16.71C12.8 16.61 12.87 16.51 12.92 16.38C12.97 16.26 13 16.13 13 16C13 15.87 12.97 15.74 12.92 15.62Z"
              fill="white"
            />
          </svg>{" "}
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#222",
              ml: 2,
              mr: 2,
              flex: 1,
            }}
          >
            {props.message}
          </Typography>
          <IconButton onClick={() => handleDismiss()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_6788_57198)">
                <path
                  d="M12.0007 10.5867L16.9507 5.63672L18.3647 7.05072L13.4147 12.0007L18.3647 16.9507L16.9507 18.3647L12.0007 13.4147L7.05072 18.3647L5.63672 16.9507L10.5867 12.0007L5.63672 7.05072L7.05072 5.63672L12.0007 10.5867Z"
                  fill="#212121"
                />
              </g>
              <defs>
                <clipPath id="clip0_6788_57198">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
        </Card>
      </SnackbarContent>
    );
  }
);

CustomErrorSnackbar.displayName = "CustomErrorSnackbar";

export default CustomErrorSnackbar;
