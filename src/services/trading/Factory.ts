import { FeeStrategy } from "./Strategy";
import { BuyFeeStrategy, SellFeeStrategy } from "./BuyAndSellStrategies";

export class FeeFactory {
  static getStrategy(type: "buy" | "sell"): FeeStrategy {
    if (type === "buy") return new BuyFeeStrategy();
    if (type === "sell") return new SellFeeStrategy();
    //no creo que sea necesario el throw Error teniendo en cuenta que hay solo dos tipos de estrategias vigentes, pero como no se pasan por enum y puede haber algun error en el tipeo mejor prevenir que curar.
    else throw new Error("Tipo de fee inexistente");
  }
}
