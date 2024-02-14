import { forwardRef, useCallback } from "react";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

interface ReportCompleteProps extends CustomContentProps {
  allowDownload?: boolean;
}

const InventorySuccessSnackbar = forwardRef<
  HTMLDivElement,
  ReportCompleteProps
>(({ id, ...props }, ref) => {
  // const classes = useStyles();
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card sx={{ backgroundColor: "white", p: 2 }}>
        <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#000" }}>
          {props.message}
        </Typography>
      </Card>
    </SnackbarContent>
  );
});

InventorySuccessSnackbar.displayName = "InventorySuccessSnackbar";

export default InventorySuccessSnackbar;
