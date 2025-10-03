import { User } from "../../models/UserModel";
import { InMemoryStorage } from "../storage";

export class UserFacade {
  constructor(private storage: InMemoryStorage) {}

  getUserByApiKey(apiKey: string): User | undefined {
    return this.storage.getUserByApiKey(apiKey);
  }

  getUserById(id: string): User | undefined {
    return this.storage.getUserById(id);
  }

  updateUser(user: User): void {
    this.storage.updateUser(user);
  }
}
