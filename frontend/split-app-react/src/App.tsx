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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXhQrpHH8TtqXmUv2uHS4cAljhJ8KOIao",
  authDomain: "split-app-to-help-me-web.firebaseapp.com",
  projectId: "split-app-to-help-me-web",
  storageBucket: "split-app-to-help-me-web.appspot.com",
  messagingSenderId: "241634668136",
  appId: "1:241634668136:web:4b5a4965cff3d85558d5dd",
  measurementId: "G-TBLB5HP70Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


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
