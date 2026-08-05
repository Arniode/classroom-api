// let a: number = 5;
// let b: number = 10;
// function add(a: number, b: number): number {
//   return a + b;
// }
// console.log(add (a,b));
//**A REAL VALIDATION FUNCTION FOR TRANSACTION AMOUNT**//
// function validateTransactionAmount(amount: number): string {
//   if (amount <= 0) {
//     return "Error: Amount must be greater than zero";
//   } else if (amount > 1000000) {
//     return "Error: Amount exceeds maximum limit";
//   } else {
//     return "Valid amount";
//   }
// }
//VOID//
// console.log(validateTransactionAmount(5000));      // Valid amount
// console.log(validateTransactionAmount(-100));       // Error: Amount must be greater than zero
// console.log(validateTransactionAmount(2000000));    // Error: Amount exceeds maximum limit

function validateAccountTier(tier: "1" | "2" | "3"): string {
  if (tier === "1") {
    return "Basic account";
  } 
  else if (tier === "2") {
    return "Premium account";
  } 
  else {
    return "Elite account";
  }
}

function validateAccountBalance(balance: number): number | null {
  if (balance < 0) {
    return null;
  }
   else {
    return balance;
  }
}

console.log(validateAccountTier("3"));
console.log(validateAccountTier("1"));
console.log(validateAccountBalance(80000));
console.log(validateAccountBalance(-500));