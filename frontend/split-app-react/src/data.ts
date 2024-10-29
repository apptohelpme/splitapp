export interface User {
    id: number;
    name: string;
  }
  
  export interface Transaction {
    id: number;
    fromUserId: number;
    toUserId: number;
    amount: number;
    description: string;
    date: string; // Use 'Date' type if you prefer actual Date objects
  }
  
  export const currentUserId: number = 1;
  
  export const users: User[] = [
    { id: 1, name: 'You' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' },
    // Add more users as needed
  ];
  
  export const transactions: Transaction[] = [
    { id: 1, fromUserId: 1, toUserId: 2, amount: 25, description: 'Lunch', date: '2024-10-01' },
    { id: 2, fromUserId: 3, toUserId: 1, amount: 40, description: 'Concert Tickets', date: '2024-10-05' },
    // Add more transactions as needed
  ];
  