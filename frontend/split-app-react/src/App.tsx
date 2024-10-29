import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import FriendsList from './pages/FriendsList';
import TransactionsWithUser from './pages/TransactionsWithUser';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Split App To Help Me
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/friends">
            Friends
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/friends" element={<FriendsList />} />
        <Route
          path="/transactions/:userId"
          element={<TransactionsWithUser />}
        />
      </Routes>
    </Router>
  );
};

export default App;
