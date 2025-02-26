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
import { signIn } from "../../store/authSlice";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
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
      await dispatch(signIn(formData) as any);
      navigate("/");
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
          Sign In
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              Sign In
            </Button>
            <Typography align="center" variant={isMobile ? "body2" : "body1"}>
              Don't have an account?{" "}
              <MuiLink component={Link} to="/signup">
                Sign Up
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;
