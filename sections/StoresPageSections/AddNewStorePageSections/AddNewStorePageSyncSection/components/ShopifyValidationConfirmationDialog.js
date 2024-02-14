import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import BaseDialog from "components/Common/Dialog";
import React from "react";

export default function ShopifyValidationConfirmationDialog({
  open,
  handleClose,
  handleConfirmButton,
}) {
  return (
    <BaseDialog
      open={open}
      handleClose={handleClose}
      dialogActions={
        <>
          <PrimaryButton onClick={handleConfirmButton}>
            Turn on Pull
          </PrimaryButton>
        </>
      }
      hideCloseButton={true}
    >
      ShopifyValidationConfirmationDialog
    </BaseDialog>
  );
}
