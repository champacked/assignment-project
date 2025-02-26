import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { signUp } from "../../store/authSlice";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(signUp(formData) as any);
      // Show success message and redirect to signin
      alert("Registration successful! Please sign in with your credentials.");
      navigate("/signin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: { xs: "100%", sm: "400px" },
        mx: "auto",
        mt: { xs: 4, sm: 8 },
        width: "100%",
      }}
    >
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="h5" gutterBottom align="center">
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              size={isMobile ? "small" : "medium"}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size={isMobile ? "small" : "medium"}
            >
              Sign Up
            </Button>
            <Typography align="center" variant={isMobile ? "body2" : "body1"}>
              Already have an account?{" "}
              <MuiLink component={Link} to="/signin">
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
