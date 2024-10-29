import React from 'react';
import {
  Container,
  Typography,
  List,
  Divider,
} from '@mui/material';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { calculateBalances } from '../utils';
import { users, transactions, currentUserId } from '../data';

const HomePage: React.FC = () => {
  const balances = calculateBalances(currentUserId, transactions);

  const friendsYouOwe = Object.keys(balances).filter(
    (userId) => balances[Number(userId)] < 0
  );
  const friendsWhoOweYou = Object.keys(balances).filter(
    (userId) => balances[Number(userId)] > 0
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Friends Who Owe You */}
      <Typography variant="h6">Friends Who Owe You</Typography>
      <List>
        {friendsWhoOweYou.length > 0 ? (
          friendsWhoOweYou.map((userId) => {
            const user = users.find((u) => u.id === Number(userId));
            if (!user) return null;

            return (
              <ListItem
                key={userId}
                disablePadding
              >
                <ListItemButton component={RouterLink} to={`/transactions/${userId}`}>
                  <ListItemText
                    primary={user.name}
                    secondary={`Owes you $${balances[Number(userId)].toFixed(
                      2
                    )}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="No one owes you at the moment." />
          </ListItem>
        )}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Friends You Owe */}
      <Typography variant="h6">Friends You Owe</Typography>
      <List>
        {friendsYouOwe.length > 0 ? (
          friendsYouOwe.map((userId) => {
            const user = users.find((u) => u.id === Number(userId));
            if (!user) return null;

            return (
              <ListItem
                key={userId}
                disablePadding
              >
                <ListItemButton component={RouterLink} to={`/transactions/${userId}`}>
                  <ListItemText
                    primary={user.name}
                    secondary={`You owe $${Math.abs(
                      balances[Number(userId)]
                    ).toFixed(2)}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="You don't owe anyone at the moment." />
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default HomePage;
