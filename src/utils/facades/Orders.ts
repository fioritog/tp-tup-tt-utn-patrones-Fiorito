import { Order } from "../../models/OrderModel";
import { InMemoryStorage } from "../storage";

export class OrderFacade {
  constructor(private storage: InMemoryStorage) {}

  addOrder(order: Order): void {
    this.storage.addOrder(order);
  }

  getOrderByUserId(userId: string): Order[] {
    return this.storage.getOrdersByUserId(userId);
  }

  updateOrder(order: Order): void {
    this.storage.updateOrder(order);
  }
}
