import React from 'react';
import {
  Container,
  Typography,
  List,
} from '@mui/material';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { users, transactions, currentUserId } from '../data';

const FriendsList: React.FC = () => {
  const transactedUserIds = Array.from(
    new Set(
      transactions.flatMap(({ fromUserId, toUserId }) => {
        if (fromUserId === currentUserId) return [toUserId];
        if (toUserId === currentUserId) return [fromUserId];
        return [];
      })
    )
  );

  const transactedUsers = transactedUserIds
    .map((id) => users.find((user) => user.id === id))
    .filter((user): user is NonNullable<typeof user> => user !== undefined);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Friends
      </Typography>
      <List>
        {transactedUsers.map((user) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton component={RouterLink} to={`/transactions/${user.id}`}>
              <ListItemText primary={user.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FriendsList;
