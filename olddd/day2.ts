// interface User {
//   fullName: string;
//   accountBalance: number;
//   isVerified: boolean;
//   accountTier: number;
// }
// Think of it like a contract. Any object that claims to be a User must have exactly these fields with exactly these types.
// **Using the Interface
// typescript
// const customer: User = {
//   fullName: "Samuel Adediran",
//   accountBalance: 150000,
//   isVerified: true,
//   accountTier: 2
// };
// Now TypeScript enforces the contract:
// typescript
// const badCustomer: User = {
//   fullName: "Bola",
//   accountBalance: "plenty", // ❌ string is not a number
//   isVerified: true,
//   accountTier: 2
// };

// const incompleteCustomer: User = {
//   fullName: "Chidi",
//   isVerified: true,
//   // ❌ missing accountBalance and accountTier — TS will complain
// };
//Optional Fields with ?
// interface User {
//   fullName: string;
//   accountBalance: number;
//   isVerified: boolean;
//   accountTier: number;
//   phoneNumber?: string; // ✅ the ? means this field is optional
// }

// const customer: User = {
//   fullName: "Samuel",
//   accountBalance: 150000,
//   isVerified: true,
//   accountTier: 2
//   // phoneNumber is missing — and that's fine because of the ?
// };

// interface User {
//   readonly accountNumber: string; // can never be changed after creation
//   fullName: string;
//   accountBalance: number;
//   isVerified: boolean;
//   accountTier: number;
// }

// const customer: User = {
//   accountNumber: "0123456789",
//   fullName: "Samuel",
//   accountBalance: 150000,
//   isVerified: true,
//   accountTier: 2
// };

// customer.accountNumber = "9999999999"; // ❌ Cannot assign to 'accountNumber' — it's readonly
// customer.accountBalance = 200000;      // ✅ Fine — not readonly

// interface Address {
//   street: string;
//   city: string;
//   state: string;
// }

// interface User {
//   readonly accountNumber: string;
//   fullName: string;
//   accountBalance: number;
//   isVerified: boolean;
//   accountTier: number;
//   phoneNumber?: string;
//   address: Address; // 👈 using one interface inside another
// }

// const customer: User = {
//   accountNumber: "0123456789",
//   fullName: "Samuel Adediran",
//   accountBalance: 150000,
//   isVerified: true,
//   accountTier: 2,
//   address: {
//     street: "19 Olayinka Obadina Street",
//     city: "Lagos",
//     state: "Lagos"
//   }
// };

// console.log(customer.address.city); // Lagos


// Real Mono-Style Example
// This is closer to what you'll actually see in a real-world TypeScript project. Let's say we have a banking application, and we want to define a transaction interface to represent a bank transaction. Each transaction has an ID, an amount, a type (credit or debit), and a status (success, failed, or pending).
// interface Transaction {
//   id: number;
//   amount: number;
//   type: "credit" | "debit";
//   status: "success" | "failed" | "pending";
// }

// const transaction: Transaction = {
//   id: 1,
//   amount: 5000,
//   type: "debit",
//   status: "success"
// };

interface transaction {
readonly transactionId: string;
amount:number;
type: "credit" | "debit";
status: "successful" | "failed" | "pending";
narration?:string;
timestamp: string;
}

const transaction: transaction = {
  transactionId:"MIO0998GYYUK",
    amount:5000,
    type:"credit",
    status:"successful",
    narration:"Payment for goods",
    timestamp:"2023-10-01T12:00:00Z"
}
const transaction2: transaction={
transactionId:"gh2345RTGVBNJK",
amount:2000,
type:"debit",
status:"failed",
timestamp:"2023-10-01T12:00:00Z"
}

console.log(transaction);
console.log(transaction2);