import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { UserData } from '../types';
import { addUser } from '../store/userSlice';

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Omit<UserData, 'id'>>({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: UserData = {
      id: uuidv4(),
      ...formData,
    };
    dispatch(addUser(userData));
    setFormData({ name: '', email: '', address: '', phone: '' });
    setIsDirty(false);
    setShowDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={3}
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Paper>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>User data has been saved successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserForm;