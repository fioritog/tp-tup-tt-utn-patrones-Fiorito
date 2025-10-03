import { MarketData } from "../../models/MarketDataModel";
import { InMemoryStorage } from "../storage";

export class MarketDataFacade {
  constructor(private storage: InMemoryStorage) {}

  getAllMarketData(): MarketData[] {
    return this.storage.getAllMarketData();
  }

  getMarketDataBySymbol(symbol: string): MarketData | undefined {
    return this.storage.getMarketDataBySymbol(symbol);
  }

  updateMarketData(data: MarketData): void {
    this.storage.updateMarketData(data);
  }
}
