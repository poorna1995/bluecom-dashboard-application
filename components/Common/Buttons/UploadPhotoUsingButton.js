import { Avatar, Box, Button, Input } from "@mui/material";
import React, { useState } from "react";

function UploadPhotoUsingButton() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{ width: 80, height: 80, objectFit: "contain" }}
        />
        <Button
          onClick={handleButtonClick}
          sx={{
            marginTop: "16px",
            height: "35px",
            border: "1px solid #E0E0E0",
            color: "#1D2939",
            textTransform: "capitalize",
          }}
        >
          Add photo
        </Button>
        <Input
          id="fileInput"
          type="file"
          onChange={handleFileInputChange}
          sx={{ display: "none" }}
        />
      </Box>
    </div>
  );
}

export default UploadPhotoUsingButton;
