import { Button } from "@mui/material";
import React from "react";
import FieldsLinkedDialog from "./FieldsLinkedDialog";

export default function FieldsLinkButton() {
  const [openFieldsLinkedDialog, setOpenFieldsLinkedDialog] =
    React.useState(false);
  const handleCloseFieldsLinkedDialog = () => {
    setOpenFieldsLinkedDialog(false);
  };

  const handleClickButton = () => {
    setOpenFieldsLinkedDialog(true);
  };
  return (
    <div>
      {" "}
      {/* <Button
        onClick={handleClickButton}
        startIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8.66634 5.9987H7.33301V4.66536H8.66634M8.66634 11.332H7.33301V7.33203H8.66634M7.99967 1.33203C7.1242 1.33203 6.25729 1.50447 5.44845 1.8395C4.63961 2.17453 3.90469 2.6656 3.28563 3.28465C2.03539 4.5349 1.33301 6.23059 1.33301 7.9987C1.33301 9.76681 2.03539 11.4625 3.28563 12.7127C3.90469 13.3318 4.63961 13.8229 5.44845 14.1579C6.25729 14.4929 7.1242 14.6654 7.99967 14.6654C9.76779 14.6654 11.4635 13.963 12.7137 12.7127C13.964 11.4625 14.6663 9.76681 14.6663 7.9987C14.6663 7.12322 14.4939 6.25631 14.1589 5.44747C13.8238 4.63864 13.3328 3.90371 12.7137 3.28465C12.0947 2.6656 11.3597 2.17453 10.5509 1.8395C9.74206 1.50447 8.87515 1.33203 7.99967 1.33203Z"
              fill="#4F44E0"
            />
          </svg>
        }
        sx={{
          textTransform: "initial",
          ml: 2,
          px: 2,
          // color: #4F44E0;
          // font-family: Inter;
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: " 20px",
          height: "40px",
          transition: "all 0.3s ease-in-out",
          "&: hover": {
            textDecoration: "underline",
            transition: "all 0.3s ease-in-out",
            background: "none",
          },
        }}
      >
        Know which Fields linked
      </Button>
      <FieldsLinkedDialog
        open={openFieldsLinkedDialog}
        handleClose={handleCloseFieldsLinkedDialog}
      /> */}
    </div>
  );
}
