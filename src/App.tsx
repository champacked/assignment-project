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
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import RichTextEditor from "./components/RichTextEditor";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import { store, RootState } from "./store";
import { signOut } from "./store/authSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
    },
  },
});

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  return (
    <AppBar position="static">
      <Toolbar>
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
            <Button color="inherit" onClick={handleSignOut}>
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
      </Toolbar>
    </AppBar>
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
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navigation />
            <Container sx={{ flexGrow: 1, py: 3 }}>
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
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
