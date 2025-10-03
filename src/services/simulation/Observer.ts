import { MarketData } from "../../models/MarketDataModel";

//interface que pasa la data sobre el mercado a los subscriptores
export interface IObserver {
  update(marketData: MarketData[]): void;
}
