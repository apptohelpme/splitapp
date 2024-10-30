import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FriendsList from './pages/FriendsList';
import TransactionsWithUser from './pages/TransactionsWithUser';
import LoginPage from './pages/LoginPage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext, AuthProvider } from './util/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './util/firebaseConfig';

const App: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Successful sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Split App To Help Me
          </Typography>
          {currentUser ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/friends">
                Friends
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Routes>
        {currentUser ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/friends" element={<FriendsList />} />
            <Route path="/transactions/:userId" element={<TransactionsWithUser />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
