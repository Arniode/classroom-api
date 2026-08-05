interface BankUser {
  readonly accountNumber: string;
  fullName: string;
  balance: number;
  accountTier: "1" | "2" | "3";
  middleName?: string;
}

const customer: BankUser = {
  accountNumber: "0123456789",
  fullName: "Setryik Asdfg",
  balance: 70000,
  accountTier: "3"
};

console.log(customer);


//customer.accountNumber = "012345678839";(won't allow me re-assign)