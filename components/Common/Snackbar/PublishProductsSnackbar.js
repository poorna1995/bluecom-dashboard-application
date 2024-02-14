/* eslint-disable react/display-name */
import {
  Button,
  Card,
  CardActions,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { SnackbarContent, useSnackbar } from "notistack";
import React, { useCallback, useState } from "react";
import { MdClose, MdExpandMore } from "react-icons/md";
import CheckCircleIcon from "../Icons/CheckCircleIcon";

const PublishProductsSnackbar = React.forwardRef((props, ref) => {
  const {
    // You have access to notistack props and options 👇🏼
    id,
    message,
    // as well as your own custom props 👇🏼
    allowDownload,
    ...other
  } = props;

  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} role="alert" {...other}>
      <Card style={{ backgroundColor: "#fddc6c" }}>
        <CardActions>
          <Typography variant="body2">{message}</Typography>
          <div>
            <IconButton
              aria-label="Show more"
              size="small"
              onClick={handleExpandClick}
            >
              <MdExpandMore />
            </IconButton>
            <IconButton size="small" onClick={handleDismiss}>
              <MdClose fontSize="small" />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper>
            <Typography
              gutterBottom
              variant="caption"
              style={{ color: "#000", display: "block" }}
            >
              PDF ready
            </Typography>
            <Button size="small" color="primary">
              <CheckCircleIcon />
              Download now
            </Button>
          </Paper>
        </Collapse>
      </Card>
      {message}
    </SnackbarContent>
  );
});

export default PublishProductsSnackbar;

/**
 * {
 * master_percentage:"10",
 * productCount:20,
 * completedd:2,
 * master_task_id:"5f9f1b1b0f9a9c0017b0b1a6",
 * result: [
 * {
 * master_product_id:"5f9f1b1b0f9a9c0017b0b1a5",
 * percentage:20,
 * status:"in-process",
 * task_id:"5f9f1b1b0f9a9c0017b0b1a6_54",
 *
 * }
 *
 * {
 * master_product_id:"5f9f1b1b0f9a9c0017b0b1a5",
 * percentage:20,
 * status:"in-process",
 * task_id:"5f9f1b1b0f9a9c0017b0b1a6_58",
 *
 * 
 * 
 * status:'published'
 *
 * }
 *result.length,
 result.length (for completed where percent===100)
 * ]}
 status: success
 *
 *
 *
 */
