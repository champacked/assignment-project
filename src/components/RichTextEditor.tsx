import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Paper, Typography } from '@mui/material';
import { RootState } from '../store';

const RichTextEditor: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const [editorContent, setEditorContent] = React.useState('');
  const quillRef = useRef<ReactQuill>(null);

  React.useEffect(() => {
    if (users.length > 0) {
      const content = users.map(user => `
        <h3>User: ${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <hr/>
      `).join('');
      setEditorContent(content);
    }
  }, [users]);

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Data Editor
        </Typography>
        <Box sx={{ height: '400px' }}>
          <ReactQuill
            ref={quillRef}
            value={editorContent}
            onChange={setEditorContent}
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
              ]
            }}
            style={{ height: '350px' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default RichTextEditor;