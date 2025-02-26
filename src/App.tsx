import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import { store } from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  Counter
                </Button>
                <Button color="inherit" component={Link} to="/user-form">
                  User Form
                </Button>
                <Button color="inherit" component={Link} to="/editor">
                  Rich Text Editor
                </Button>
              </Toolbar>
            </AppBar>
            
            <Container sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<Counter />} />
                <Route path="/user-form" element={<UserForm />} />
                <Route path="/editor" element={<RichTextEditor />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;