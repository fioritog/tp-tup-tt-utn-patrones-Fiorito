import { Transaction } from "../../models/TransactionModel";
import { InMemoryStorage } from "../storage";

export class TransactionFacade {
  constructor(private storage: InMemoryStorage) {}

  addTransaction(transaction: Transaction): void {
    this.storage.addTransaction(transaction);
  }

  getTransactionByUserId(userId: string): Transaction[] {
    return this.storage.getTransactionsByUserId(userId);
  }

  getAllTransactions(): Transaction[] {
    return this.storage.getAllTransactions();
  }
}
