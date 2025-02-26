import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { RootState } from "../store";

const RichTextEditor: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const [editorContent, setEditorContent] = React.useState("");
  const quillRef = useRef<ReactQuill>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (users.length > 0) {
      const content = users
        .map(
          (user) => `
        <h3>User: ${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <hr/>
      `
        )
        .join("");
      setEditorContent(content);
    }
  }, [users]);

  // Configure toolbar based on screen size
  const modules = {
    toolbar: isMobile
      ? [
          ["bold", "italic"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ]
      : [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
        }}
      >
        <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
          User Data Editor
        </Typography>
        <Box
          sx={{
            height: { xs: "300px", sm: "350px", md: "400px" },
            ".ql-container": {
              fontSize: { xs: "14px", sm: "16px" },
            },
            ".ql-editor": {
              minHeight: { xs: "250px", sm: "300px", md: "350px" },
            },
            ".ql-toolbar": {
              flexWrap: "wrap",
            },
          }}
        >
          <ReactQuill
            ref={quillRef}
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            style={{ height: "100%" }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default RichTextEditor;
