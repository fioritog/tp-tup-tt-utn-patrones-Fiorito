import { FeeStrategy } from "./Strategy";
import { config } from "../../config/config";

export class BuyFeeStrategy implements FeeStrategy {
  calculate(total: number): number {
    const fee = total * config.tradingFees.buyFeePercentage;
    return Math.max(fee, config.tradingFees.minimumFee);
  }
}

export class SellFeeStrategy implements FeeStrategy {
  calculate(total: number): number {
    const fee = total * config.tradingFees.sellFeePercentage;
    return Math.max(fee, config.tradingFees.minimumFee);
  }
}
