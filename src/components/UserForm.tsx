import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UserData } from "../types";
import { addUser } from "../store/userSlice";

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState<Omit<UserData, "id">>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );

  // Handle browser close/refresh with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        // Standard way to show a confirmation dialog when closing the browser
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Handle navigation within the app with unsaved changes
  useEffect(() => {
    const handleBlockNavigation = () => {
      if (isDirty) {
        setShowUnsavedDialog(true);
        return false;
      }
      return true;
    };

    // This is a custom implementation to handle React Router navigation
    //@ts-ignore
    const unblock = navigate((nextLocation) => {
      if (location.pathname !== nextLocation && !handleBlockNavigation()) {
        setPendingNavigation(nextLocation);
        return false;
      }
      return true;
    });

    return unblock;
  }, [isDirty, navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: UserData = {
      id: uuidv4(),
      ...formData,
    };
    dispatch(addUser(userData));
    setFormData({ name: "", email: "", address: "", phone: "" });
    setIsDirty(false);
    setShowDialog(true);
  };

  const handleConfirmNavigation = () => {
    setIsDirty(false);
    setShowUnsavedDialog(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  const handleCancelNavigation = () => {
    setShowUnsavedDialog(false);
    setPendingNavigation(null);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={isMobile ? 2 : 3}
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth={isMobile}
              sx={{ mt: 1 }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Success Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>User data has been saved successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onClose={handleCancelNavigation}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to leave this page?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelNavigation} color="primary">
            Stay on Page
          </Button>
          <Button onClick={handleConfirmNavigation} color="error">
            Leave Page
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserForm;
