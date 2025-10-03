import { Portfolio } from "../../models/PortfolioModel";
import { InMemoryStorage } from "../storage";

export class PortfolioFacade {
  constructor(private storage: InMemoryStorage) {}

  getPortfolioByUserId(userId: string): Portfolio | undefined {
    return this.storage.getPortfolioByUserId(userId);
  }

  updatePortfolio(portfolio: Portfolio): void {
    this.storage.updatePortfolio(portfolio);
  }
}
