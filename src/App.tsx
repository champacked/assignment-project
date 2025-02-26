import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import RichTextEditor from "./components/RichTextEditor";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { store, RootState } from "./store";
import { signOut } from "./store/authSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90CAF9",
      light: "#E3F2FD",
    },
    secondary: {
      main: "#F48FB1",
      light: "#FFCC80",
    },
    background: {
      default: "#E3F2FD",
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#90CAF9",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#F48FB1",
          "&:hover": {
            backgroundColor: "#F06292",
          },
        },
        outlined: {
          borderColor: "#90CAF9",
          color: "#90CAF9",
          "&:hover": {
            borderColor: "#64B5F6",
            backgroundColor: "rgba(144, 202, 249, 0.04)",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    // @ts-ignore
    dispatch(signOut());
    navigate("/signin");
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const menuItems = isAuthenticated
    ? [
        { text: "Counter", icon: <HomeIcon />, path: "/" },
        { text: "User Form", icon: <PersonIcon />, path: "/user-form" },
        { text: "Rich Text Editor", icon: <EditIcon />, path: "/editor" },
        {
          text: "Profile",
          icon: (
            <Avatar
              sx={{
                width: 24,
                height: 24,
                fontSize: "0.75rem",
                bgcolor: "secondary.main",
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>
          ),
          path: "/profile",
        },
        { text: "Sign Out", icon: <LogoutIcon />, action: handleSignOut },
      ]
    : [
        { text: "Sign In", icon: <LoginIcon />, path: "/signin" },
        { text: "Sign Up", icon: <PersonAddIcon />, path: "/signup" },
      ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={item.action || (() => handleNavigation(item.path))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {isAuthenticated ? `Welcome, ${user?.name}` : "Welcome"}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {isAuthenticated ? `Welcome, ${user?.name}` : "Welcome"}
              </Typography>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={Link} to="/">
                    Counter
                  </Button>
                  <Button color="inherit" component={Link} to="/user-form">
                    User Form
                  </Button>
                  <Button color="inherit" component={Link} to="/editor">
                    Rich Text Editor
                  </Button>
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/profile"
                    sx={{ ml: 1 }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "secondary.main",
                        fontSize: "1rem",
                      }}
                    >
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                  <Button
                    color="inherit"
                    onClick={handleSignOut}
                    sx={{ ml: 1 }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/signin">
                    Sign In
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              flexGrow: 1,
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
            }}
          >
            <Navigation />
            <Container
              sx={{
                flexGrow: 1,
                py: 3,
                px: { xs: 2, sm: 3, md: 4 },
                maxWidth: { xs: "100%", sm: "100%", md: "lg" },
              }}
            >
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Counter />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user-form"
                  element={
                    <PrivateRoute>
                      <UserForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/editor"
                  element={
                    <PrivateRoute>
                      <RichTextEditor />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
