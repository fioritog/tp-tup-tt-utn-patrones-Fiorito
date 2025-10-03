// Servicio de análisis de mercado
import { PortfolioHolding } from "../../models/PortfolioHolding";
import { Asset } from "../../models/AssetModel";
import { storage } from "../../utils/storage";
import { RiskAnalysis } from "../../models/RiskAnalysisModel";
import { MarketCalculations } from "./MarketCalculations";

export class MarketAnalysisService {
  // Análisis de riesgo del portafolio
  analyzePortfolioRisk(userId: string): RiskAnalysis {
    const portfolio = storage.getPortfolioByUserId(userId);
    if (!portfolio) {
      throw new Error("Portafolio no encontrado");
    }

    // Cálculo básico de diversificación
    const diversificationScore =
      MarketCalculations.calculateDiversificationScore(portfolio);
    const volatilityScore =
      MarketCalculations.calculateVolatilityScore(portfolio);

    // Determinar nivel de riesgo general
    let portfolioRisk: "low" | "medium" | "high";
    if (volatilityScore < 30 && diversificationScore > 70) {
      portfolioRisk = "low";
    } else if (volatilityScore < 60 && diversificationScore > 40) {
      portfolioRisk = "medium";
    } else {
      portfolioRisk = "high";
    }

    // Generar recomendaciones básicas
    const recommendations = this.generateRiskRecommendations(
      diversificationScore,
      volatilityScore,
      portfolioRisk
    );

    const riskAnalysis = new RiskAnalysis(userId);
    riskAnalysis.updateRisk(
      portfolioRisk,
      diversificationScore,
      recommendations
    );

    return riskAnalysis;
  }

  // Generar recomendaciones
  private generateRiskRecommendations(
    diversificationScore: number,
    volatilityScore: number,
    riskLevel: string
  ): string[] {
    const recommendations: string[] = [];

    if (diversificationScore < 40) {
      recommendations.push(
        "Considera diversificar tu portafolio invirtiendo en diferentes sectores"
      );
    }

    if (volatilityScore > 70) {
      recommendations.push(
        "Tu portafolio tiene alta volatilidad, considera añadir activos más estables"
      );
    }

    if (riskLevel === "high") {
      recommendations.push(
        "Nivel de riesgo alto detectado, revisa tu estrategia de inversión"
      );
    }

    if (diversificationScore > 80 && volatilityScore < 30) {
      recommendations.push(
        "Excelente diversificación y bajo riesgo, mantén esta estrategia"
      );
    }

    // Recomendaciones genéricas si no hay específicas
    if (recommendations.length === 0) {
      recommendations.push(
        "Tu portafolio se ve balanceado, continúa monitoreando regularmente"
      );
    }

    return recommendations;
  }

  // Análisis técnico básico
  performTechnicalAnalysis(symbol: string): any {
    const marketData = storage.getMarketDataBySymbol(symbol);
    if (!marketData) {
      throw new Error("Datos de mercado no encontrados");
    }

    // Simulación de indicadores técnicos básicos
    const sma20 = MarketCalculations.calculateSimpleMovingAverage(symbol, 20);
    const sma50 = MarketCalculations.calculateSimpleMovingAverage(symbol, 50);
    const rsi = MarketCalculations.calculateRSI(symbol);

    let signal: "buy" | "sell" | "hold" = "hold";

    // Lógica simple de señales
    if (marketData.price > sma20 && sma20 > sma50 && rsi < 70) {
      signal = "buy";
    } else if (marketData.price < sma20 && sma20 < sma50 && rsi > 30) {
      signal = "sell";
    }

    return {
      symbol: symbol,
      currentPrice: marketData.price,
      sma20: sma20,
      sma50: sma50,
      rsi: rsi,
      signal: signal,
      timestamp: new Date(),
    };
  }

  // Generar recomendaciones de inversión - Lógica básica
  generateInvestmentRecommendations(userId: string): any[] {
    const user = storage.getUserById(userId);
    const portfolio = storage.getPortfolioByUserId(userId);

    if (!user || !portfolio) {
      throw new Error("Usuario o portafolio no encontrado");
    }

    const recommendations: any[] = [];

    // Recomendaciones basadas en tolerancia al riesgo
    const allAssets = storage.getAllAssets();

    allAssets.forEach((asset) => {
      const hasHolding = portfolio.holdings.some(
        (h) => h.symbol === asset.symbol
      );

      if (!hasHolding) {
        let recommendation = "";
        let priority = 0;

        if (
          user.riskTolerance === "low" &&
          MarketCalculations.getAssetVolatility(asset.symbol) < 50
        ) {
          recommendation =
            "Activo de bajo riesgo recomendado para tu perfil conservador";
          priority = 1;
        } else if (
          user.riskTolerance === "high" &&
          MarketCalculations.getAssetVolatility(asset.symbol) > 60
        ) {
          recommendation =
            "Activo de alto crecimiento potencial para tu perfil agresivo";
          priority = 2;
        } else if (user.riskTolerance === "medium") {
          recommendation = "Activo balanceado adecuado para tu perfil moderado";
          priority = 1;
        }

        if (recommendation) {
          recommendations.push({
            symbol: asset.symbol,
            name: asset.name,
            currentPrice: asset.currentPrice,
            recommendation: recommendation,
            priority: priority,
            riskLevel:
              MarketCalculations.getAssetVolatility(asset.symbol) > 60
                ? "high"
                : "medium",
          });
        }
      }
    });

    // Ordenar por prioridad
    return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 5);
  }
}
