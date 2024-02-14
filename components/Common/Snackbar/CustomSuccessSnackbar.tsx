import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { IconButton } from "@mui/material";

interface ReportCompleteProps extends CustomContentProps {
  allowDownload?: boolean;
}

const CustomSuccessSnackbar = forwardRef<HTMLDivElement, ReportCompleteProps>(
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
              d="M11.957 22.0869C17.4799 22.0869 21.957 17.6098 21.957 12.0869C21.957 6.5641 17.4799 2.08694 11.957 2.08694C6.43418 2.08694 1.95703 6.5641 1.95703 12.0869C1.95703 17.6098 6.43418 22.0869 11.957 22.0869Z"
              fill="#4f44e0"
            />
            <path
              d="M10.5814 15.58C10.3814 15.58 10.1914 15.5 10.0514 15.36L7.22141 12.53C6.93141 12.24 6.93141 11.76 7.22141 11.47C7.51141 11.18 7.99141 11.18 8.28141 11.47L10.5814 13.77L15.7214 8.63001C16.0114 8.34001 16.4914 8.34001 16.7814 8.63001C17.0714 8.92001 17.0714 9.40001 16.7814 9.69001L11.1114 15.36C10.9714 15.5 10.7814 15.58 10.5814 15.58Z"
              fill="white"
            />
          </svg>
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

CustomSuccessSnackbar.displayName = "CustomSuccessSnackbar";

export default CustomSuccessSnackbar;
