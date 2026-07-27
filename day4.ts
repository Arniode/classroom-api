// Convert this entire file to TypeScript

// function createTransaction(id, amount, type, narration) {
//   return {
//     id: id,
//     amount: amount,
//     type: type,
//     narration: narration,
//     status: "pending",
//     timestamp: new Date().toISOString()
//   };
// }

// function filterByType(transactions, type) {
//   return transactions.filter(function(t) {
//     return t.type === type;
//   });
// }

// function getTotalAmount(transactions) {
//   return transactions.reduce(function(total, t) {
//     return total + t.amount;
//   }, 0);
// }

interface Transaction{
    id: string;
    amount:number;
    type:"Credit"|"Debit";
    narration?:string;
    status:"Successful"|"Failed"|"Pending";
    timestamp:string;
}

const transactions: Transaction[]= [];
function createTransaction(
    id:string,
    amount:number,
    type: "Credit" | "Debit",
    narration?: string,
):Transaction {
    return{
     id: id,
    amount: amount,
    type: type,
    status: "Pending",
    timestamp: new Date().toISOString()
  }
}

function filterByType(
    transactionlist: Transaction[],
    type:"Credit"|"Debit"
) {
    return transactionlist.filter (function(t: Transaction){
        return t.type === type;
    })
}

function getTotalAmount(transactionList:Transaction[]):number{
    return transactionList.reduce(function(total:number, t:Transaction){
        return total + t.amount;
    }, 0);      
}

const t1 = createTransaction("Tfrgbn001", 5000, "Credit", "Salary payment");
const t2 = createTransaction("TXN002", 2000, "Debit");
console.log(t1);
console.log(t2);
