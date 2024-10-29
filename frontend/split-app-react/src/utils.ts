import { Transaction } from './data';

export function calculateBalances(
  currentUserId: number,
  transactions: Transaction[]
): Record<number, number> {
  const balances: Record<number, number> = {};

  transactions.forEach(({ fromUserId, toUserId, amount }) => {
    if (fromUserId === currentUserId) {
      // You owe money to someone
      balances[toUserId] = (balances[toUserId] || 0) - amount;
    } else if (toUserId === currentUserId) {
      // Someone owes you money
      balances[fromUserId] = (balances[fromUserId] || 0) + amount;
    }
  });

  return balances;
}

export function getTransactionsWithUser(
  currentUserId: number,
  userId: number,
  transactions: Transaction[]
): Transaction[] {
  return transactions.filter(
    ({ fromUserId, toUserId }) =>
      (fromUserId === currentUserId && toUserId === userId) ||
      (fromUserId === userId && toUserId === currentUserId)
  );
}
