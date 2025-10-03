//interface para aplicar el patron de strategy, ya sea sell o buy
export interface FeeStrategy {
  calculate(total: number): number;
}
