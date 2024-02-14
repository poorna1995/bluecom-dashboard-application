import BaseDialog from "components/Common/Dialog";
import React from "react";

export default function WarehouseTableDialog({
  children,
  open,
  handleClose,
  dialogTitle,
}) {
  return (
    <BaseDialog open={open} handleClose={handleClose} title={dialogTitle}>
      {children}
    </BaseDialog>
  );
}
