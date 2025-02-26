import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { RootState } from "../store";
import { Mail, Phone, MapPin } from "lucide-react";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const users = useSelector((state: RootState) => state.user.users);
  const currentUserData = users.find((u) => u.email === user?.email);

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
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
                  width: 120,
                  height: 120,
                  bgcolor: "primary.main",
                  fontSize: "3rem",
                  mb: 2,
                }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ color: "primary.main", mb: 1 }}>
                {user?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 3, color: "secondary.main" }}>
              Profile Information
            </Typography>

            <Grid container spacing={3}>
              {currentUserData && (
                <>
                  <Grid item xs={12}>
                    <Card sx={{ bgcolor: "primary.light", boxShadow: "none" }}>
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Mail size={20} />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Email
                          </Typography>
                          <Typography>{currentUserData.email}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card
                      sx={{ bgcolor: "secondary.light", boxShadow: "none" }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Phone size={20} />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Phone
                          </Typography>
                          <Typography>{currentUserData.phone}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card sx={{ bgcolor: "primary.light", boxShadow: "none" }}>
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <MapPin size={20} />
                        <Box>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Address
                          </Typography>
                          <Typography>{currentUserData.address}</Typography>
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
