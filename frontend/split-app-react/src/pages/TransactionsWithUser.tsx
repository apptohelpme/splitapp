import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { users, transactions, currentUserId } from '../data';
import { getTransactionsWithUser } from '../utils';

const TransactionsWithUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = users.find((u) => u.id === Number(userId));

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">User not found.</Typography>
      </Container>
    );
  }

  const userTransactions = getTransactionsWithUser(
    currentUserId,
    user.id,
    transactions
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transactions with {user.name}
      </Typography>
      <List>
        {userTransactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={transaction.description}
              secondary={`${
                transaction.fromUserId === currentUserId
                  ? 'You paid'
                  : `${user.name} paid`
              } $${transaction.amount.toFixed(2)} on ${transaction.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TransactionsWithUser;
