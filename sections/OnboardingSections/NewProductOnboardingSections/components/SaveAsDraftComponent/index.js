import SecondaryButton from "components/Common/Buttons/SecondaryButton";
import SuccessDialog from "components/Common/Dialog/SuccessDialog";
import AlertIconPO from "components/Common/Icons/POicons/DialogIcons/AlertIconPO";
import React from "react";

export default function SaveAsDraftComponent({
  BUNDLE_OR_PRODUCT,
  disableDraftButton,
  handleSaveAsDraftDialogOpen,
  handleSaveAsDraftDialogClose,
  handleSaveAsDraftButtonClick,
  openSaveAsDraftDialog,
}) {
  return (
    <div>
      {" "}
      <SecondaryButton
        disabled={disableDraftButton}
        onClick={() => handleSaveAsDraftDialogOpen()}
      >
        Save as Draft
      </SecondaryButton>
      <SuccessDialog
        icon={<AlertIconPO />}
        title={`Do you want to save ${BUNDLE_OR_PRODUCT} as draft?`}
        open={openSaveAsDraftDialog}
        handleClose={handleSaveAsDraftDialogClose}
        handlePrimaryButton={() => handleSaveAsDraftButtonClick()}
        primaryButtonTitle="Save as Draft"
        secondaryButtonTitle={"Cancel"}
        handleSecondaryButton={() => handleSaveAsDraftDialogClose()}
        description={`You can edit and publish ${BUNDLE_OR_PRODUCT} later`}
      />
    </div>
  );
}
