#!/usr/bin/env node

import inquirer from "inquirer";


//Bank ccount interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw (amount: number): void
    deposite (amount: number): void
    checkBalance():void
}

//Bankaccount class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber : number , balance: number){
        this.accountNumber = accountNumber;
        this.balance =balance;
    }

// Debit Money (withdraw)
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successful. Remaing balance is $${this.balance}`);
     } else{
        console.log("Insufficient balance.");
        
     }
    
}
// Credit money Deposit
deposite(amount: number): void {
    if (amount > 100){
        amount-= 1;      // $1 fee charged if more than $100 is deposited

    } this.balance += amount;
    console.log(`Deposite of $${amount} successfull. Remaining balance is: $${this.balance}`);
    
}

//check balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
    
}
}
// class of customer
class Customer{
    firstName : string;
    lastName : string;
    gender: string;
    age: number;
    mobileNumber: number;
    account : BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number , account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age =age;
        this.mobileNumber =mobileNumber;
        this.account= account
    }
}

// Create Bank acounts
const accounts: BankAccount[]=[
    new BankAccount (2001,500),
    new BankAccount (2002,1000),
    new BankAccount (2003,2000),
];
// creat customers
const customers: Customer[]=[
    new Customer("Ayesha","Adnan","Female",23, 1232233445, accounts[0]),
    new Customer("Waleed","Tahir","Male",26, 1235566778, accounts[1]),
    new Customer("Saad","Adnan","male",22, 1234567890, accounts[2]),
]
//function to intrect with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number:"

        })

        const customer = customers.find(customer => customer.account.accountNumber ===accountNumberInput.accountNumber)
        if (customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n\t`)
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"Select an option",
                choices:["Deposit","Withdraw","Check Balance", "Exit"]
            }]);

            switch (ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposite(depositAmount.amount)
                    break;
                case "Withdraw":
                        const WithdrawAmount = await inquirer.prompt({
                            name:"amount",
                            type:"number",
                            message: "Enter the amount to Withdraw:"
                        })
                        customer.account.deposite(WithdrawAmount.amount)
                        break;    
                case "CheckBalance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program...");
                    console.log("\n Thankyou for using our Bank services. Have a Nice Day! ");
                    return;    
            }
        }else {
            console.log("Invalid account Number Please try again")
        }
    } while(true)
}
service()