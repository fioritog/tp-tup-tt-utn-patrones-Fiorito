// src/observers/PortfolioObserver.ts
import { IObserver } from "./Observer";
import { MarketData } from "../../models/MarketDataModel";
import {
  AssetStorage,
  PortfolioStorage,
  UserStorage,
} from "../../utils/storage";

export class UpdaterForPortfolios implements IObserver {
  update(marketData: MarketData[]): void {
    this.updateAllPortfolioValues(marketData);
  }

  // Actualizar todos los portafolios
  private updateAllPortfolioValues(marketData: MarketData[]): void {
    // Obtener todos los usuarios y actualizar sus portafolios
    const allUsers = [
      UserStorage.getUserById("demo_user"),
      UserStorage.getUserById("admin_user"),
      UserStorage.getUserById("trader_user"),
    ].filter((user) => user !== undefined);

    allUsers.forEach((user) => {
      if (user) {
        const portfolio = PortfolioStorage.getPortfolioByUserId(user.id);
        if (portfolio && portfolio.holdings.length > 0) {
          this.recalculatePortfolioValues(portfolio);
          PortfolioStorage.updatePortfolio(portfolio);
        }
      }
    });
  }

  // Recalcular valores del portafolio
  private recalculatePortfolioValues(portfolio: any): void {
    let totalValue = 0;
    let totalInvested = 0;

    portfolio.holdings.forEach((holding: any) => {
      const asset = AssetStorage.getAssetBySymbol(holding.symbol);
      if (asset) {
        holding.currentValue = holding.quantity * asset.currentPrice;
        const invested = holding.quantity * holding.averagePrice;
        holding.totalReturn = holding.currentValue - invested;
        holding.percentageReturn =
          invested > 0 ? (holding.totalReturn / invested) * 100 : 0;

        totalValue += holding.currentValue;
        totalInvested += invested;
      }
    });

    portfolio.totalValue = totalValue;
    portfolio.totalInvested = totalInvested;
    portfolio.totalReturn = totalValue - totalInvested;
    portfolio.percentageReturn =
      totalInvested > 0 ? (portfolio.totalReturn / totalInvested) * 100 : 0;
    portfolio.lastUpdated = new Date();
  }
}
