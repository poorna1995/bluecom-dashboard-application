import { FormHelperText, InputLabel, useTheme } from "@mui/material";
import React from "react";
// import { Editor } from "react-draft-wysiwyg";
import { Box } from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const TextEditor = ({
  editorState,
  onEditorStateChange,
  editorHeight,
  helperText,
  placeholder,
  title,
  editorContainerStyles,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginTop: "24px",
        "& .blockTypeClass": {
          fontWeight: "500",
        },
        "& .public-DraftEditor-content": {
          marginTop: "-24px",
        },
        "& .rdw-editor-wrapper:hover": {
          border: (theme) => `1px solid ${theme.palette.grey[800]} !important`,
        },
        "& .rdw-editor-wrapper:focus-within": {
          border: (theme) =>
            `2px solid ${theme.palette.primary.main} !important`,
        },
        ...editorContainerStyles,
      }}
    >
      {title && (
        <InputLabel
          sx={{
            // color: "#222222",
            color: (theme) => theme.palette.text.primary,

            margin: "8px",
            marginLeft: 0,
            marginBottom: "10px",
            fontSize: "17px",
            fontWeight: 600,
            lineHeight: "24px",
            // letterSpacing: "-3%",
          }}
        >
          {title}
        </InputLabel>
      )}
      <Editor
        placeholder={placeholder || "Add Description"}
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        stripPastedStyles={true}
        // toolbarCustomButtons={[<CustomOption />]}
        //  toolbarOnFocus

        editorStyle={{
          height: editorHeight || "200px",
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "4px",
          maxHeight: "200px",
          // fontWeight:'600',
          // border: "1px solid rgba(0,0,0,0.1)",
          border: "none",
          lineHeight: "24px",
          fontWeight: "500",
          fontSize: "16px",
          borderRadius: "10px",
          // overflow: "hidden",
        }}
        wrapperStyle={{
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: "5px",
          padding: "2px",
        }}
        toolbarStyle={{
          border: "none",
        }}
        toolbar={{
          options: [
            "inline",
            // "blockType",
            // "fontSize",
            // "fontFamily",
            "list",
            // "textAlign",
            "colorPicker",
            "link",
            // "embedded",
            "emoji",
          ],
          blockType: {
            inDropdown: true,
            // component: (
            //   <ul>
            //     <li>Normal</li>
            //   </ul>
            // ),
          },
          textAlign: { inDropdown: true },
          inline: {
            inDropdown: true,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
              "superscript",
              "subscript",
            ],
            // monospace: { icon: code, className: undefined },
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24],
          },
          // fontFamily: {
          // 	options: [
          // 		"Arial",
          // 		"Georgia",
          // 		"Impact",
          // 		"Tahoma",
          // 		"Times New Roman",
          // 		"Verdana",
          // 		"Inter",
          // 	],
          // },
          // image: {
          // 	uploadEnabled: true,
          // 	alignmentEnabled: true,
          // 	uploadCallback: () => {},
          // 	previewImage: false,
          // 	inputAccept:
          // 		"image/gif,image/jpeg,image/jpg,image/png,image/svg",
          // 	alt: { present: false, mandatory: false },
          // 	defaultSize: {
          // 		height: "auto",
          // 		width: "auto",
          // 	},
          // },
        }}
        {...props}
      />
      <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
    </Box>
  );
};

export default TextEditor;
