'use strict';




class BankAccount{
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber
        this.owner = owner 
        this.transactions = []
    }

    balance(){
        let currentBalance = 0
        // this balance will be the sum of the amount in the transaction array. 
        // How do I write this?
        for(let i=0; i < this.transactions.length; i++) {
            currentBalance += this.transactions[i].amount;
        }

        console.log(currentBalance)
        return currentBalance

    }

    deposit(amt){
        if(amt >= 0){

        let newDeposit = new Transaction(amt, "Deposit", this.date);
        this.transactions.push(newDeposit)
        console.log("Deposit successful")
        } else {
            console.log("A desposit must be at least a penny.")
        }


    }

    charge(payee, amt){
        let newCharge = new Transaction(-amt, payee, this.date)

        if(newCharge > this.balance) {
            console.log("Insufficient funds.");
        } else {
            this.transactions.push(newCharge)
        }


    }
}

class Transaction {
    constructor(amount, payee) {
        this.date = new Date()
        this.amount = amount
        this.payee = payee
    }
}


class SavingsAccount extends BankAccount {

    constructor(accountNumber, owner, interestRate) {
        super(accountNumber, owner);
        this.interestRate = interestRate;
    }

    accrueInterest(){
        let currentBalance = this.balance();
        let interestAmount = currentBalance * this.interestRate
        let interestTrasaction = new Transaction(interestAmount, "Interest")
        this.transactions.push(interestTrasaction)
    }
}

const assert = require('assert');

if (typeof describe === 'function'){
    describe('BankAccount', function(){
      it('bank account should have an account number, owner\'s name, and a transaction list', function(){
        const bankAccount1 = new BankAccount('12345', 'Chris');
        assert.equal(bankAccount1.accountNumber, '12345');
        assert.equal(bankAccount1.owner, 'Chris');
        assert.equal(bankAccount1.transactions.length, 0);
      });
    })

        describe('Transaction', function() {
          it('should create transaction correctly for a desposit', function(){
            const newDeposit1 = new Transaction('100', 'Deposit');
            assert.equal(newDeposit1.amount, '100');
            assert.equal(newDeposit1.payee, 'Deposit');
        })
        })

        it('should create transaction correctly for a charge', function(){
            const newCharge1 = new Transaction('50', 'HEB');
            assert.equal(newCharge1.amount, '50');
            assert.equal(newCharge1.payee, 'HEB');
        })
        }

        describe("Savings Account creation", function(){
            it("Creates account correctly", function(){
                let saving = new SavingsAccount("xxx1234" , "Maddie Mortis" , .10);
                assert.equal("xxx1234", saving.accountNumber);
                assert.equal("Maddie Mortis", saving.owner);
                assert.equal(.10, saving.interestRate);
                assert.equal(0, saving.balance())
        })

        it("Accrue interest correctly", function(){
            let saving = new SavingsAccount("xxx1234" , "Maddie Mortis" , .10);
            assert.equal("xxx1234", saving.accountNumber);
            assert.equal("Maddie Mortis", saving.owner);
            assert.equal(.10, saving.interestRate);
            assert.equal(0, saving.balance())
            saving.deposit(100);
            saving.accrueInterest();
            assert.equal(110, saving.balance())
        })

        it("Creates account correctly", function(){
            let saving = new SavingsAccount("xxx1234" , "Maddie Mortis" , .10);
            saving.deposit(100);
            saving.charge("ATM", 30)
            saving.accrueInterest();
            assert.equal(77, saving.balance())
        })
        })