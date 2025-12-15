import { Stock } from "@/types/portfolio";
import {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
} from "@/utils/calculations";

export interface SectorSummary {
  sector: string;
  investment: number;
  presentValue: number;
  gainLoss: number;
}

export const groupBySector = (stocks: Stock[]): SectorSummary[] => {
  const sectorMap: Record<string, SectorSummary> = {};

  stocks.forEach((stock) => {
    const investment = calculateInvestment(stock);
    const presentValue = calculatePresentValue(stock);
    const gainLoss = calculateGainLoss(stock);

    if (!sectorMap[stock.sector]) {
      sectorMap[stock.sector] = {
        sector: stock.sector,
        investment: 0,
        presentValue: 0,
        gainLoss: 0,
      };
    }

    sectorMap[stock.sector].investment += investment;
    sectorMap[stock.sector].presentValue += presentValue;
    sectorMap[stock.sector].gainLoss += gainLoss;
  });

  return Object.values(sectorMap);
};
