import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RootState } from "../store";
import { Mail, Phone, MapPin } from "lucide-react";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const users = useSelector((state: RootState) => state.user.users);
  const currentUserData = users.find((u) => u.email === user?.email);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              mb: { xs: 3, md: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  bgcolor: "primary.main",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  mb: 2,
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ color: "primary.main", mb: 1 }}
              >
                {user?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{ mb: 3, color: "secondary.main" }}
            >
              Profile Information
            </Typography>

            <Grid container spacing={2}>
              {currentUserData && (
                <>
                  <Grid item xs={12}>
                    <Card sx={{ bgcolor: "primary.light", boxShadow: "none" }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Mail size={isMobile ? 16 : 20} />
                        <Box>
                          <Typography
                            variant={isMobile ? "caption" : "subtitle2"}
                            color="text.secondary"
                          >
                            Email
                          </Typography>
                          <Typography variant={isMobile ? "body2" : "body1"}>
                            {currentUserData.email}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card
                      sx={{ bgcolor: "secondary.light", boxShadow: "none" }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Phone size={isMobile ? 16 : 20} />
                        <Box>
                          <Typography
                            variant={isMobile ? "caption" : "subtitle2"}
                            color="text.secondary"
                          >
                            Phone
                          </Typography>
                          <Typography variant={isMobile ? "body2" : "body1"}>
                            {currentUserData.phone}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card sx={{ bgcolor: "primary.light", boxShadow: "none" }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <MapPin size={isMobile ? 16 : 20} />
                        <Box>
                          <Typography
                            variant={isMobile ? "caption" : "subtitle2"}
                            color="text.secondary"
                          >
                            Address
                          </Typography>
                          <Typography variant={isMobile ? "body2" : "body1"}>
                            {currentUserData.address}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}

              {!currentUserData && (
                <Grid item xs={12}>
                  <Typography color="text.secondary">
                    No additional profile information available. Please update
                    your profile using the User Form.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
