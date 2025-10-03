// Métodos de cálculo para análisis de mercado
import { Portfolio } from "../../models/PortfolioModel";
import { PortfolioHolding } from "../../models/PortfolioHolding";
import { storage } from "../../utils/storage";

export class MarketCalculations {
  // Calcular score de diversificación - Algoritmo simplificado
  static calculateDiversificationScore(portfolio: Portfolio): number {
    if (portfolio.holdings.length === 0) return 0;

    const sectors = new Set<string>();
    portfolio.holdings.forEach((holding: PortfolioHolding) => {
      const asset = storage.getAssetBySymbol(holding.symbol);
      if (asset) {
        sectors.add(asset.sector);
      }
    });

    const sectorCount = sectors.size;
    const maxSectors = 5;
    const sectorScore = Math.min(sectorCount / maxSectors, 1) * 50;

    const totalValue = portfolio.totalValue;
    let concentrationPenalty = 0;

    portfolio.holdings.forEach((holding: PortfolioHolding) => {
      const weight = holding.currentValue / totalValue;
      if (weight > 0.3) {
        concentrationPenalty += (weight - 0.3) * 100;
      }
    });

    const distributionScore = Math.max(50 - concentrationPenalty, 0);

    return Math.min(sectorScore + distributionScore, 100);
  }

  // Calcular score de volatilidad - Algoritmo básico
  static calculateVolatilityScore(portfolio: Portfolio): number {
    if (portfolio.holdings.length === 0) return 0;

    let weightedVolatility = 0;
    const totalValue = portfolio.totalValue;

    portfolio.holdings.forEach((holding: PortfolioHolding) => {
      const weight = holding.currentValue / totalValue;
      const assetVolatility = MarketCalculations.getAssetVolatility(
        holding.symbol
      );
      weightedVolatility += weight * assetVolatility;
    });
    return Math.min(weightedVolatility, 100);
  }

  // Obtener volatilidad de un activo - Datos simulados
  static getAssetVolatility(symbol: string): number {
    const asset = storage.getAssetBySymbol(symbol);
    if (!asset) return 50;

    const volatilityBySector: { [key: string]: number } = {
      Technology: 65,
      Healthcare: 45,
      Financial: 55,
      Automotive: 70,
      "E-commerce": 60,
    };

    return volatilityBySector[asset.sector] || 50;
  }

  // Calcular SMA - Simulación básica
  static calculateSimpleMovingAverage(symbol: string, periods: number): number {
    const marketData = storage.getMarketDataBySymbol(symbol);
    if (!marketData) return 0;

    const randomVariation = (Math.random() - 0.5) * 0.1;
    return marketData.price * (1 + randomVariation);
  }

  // Calcular RSI - Simulación básica
  static calculateRSI(symbol: string): number {
    return 20 + Math.random() * 60;
  }
}
