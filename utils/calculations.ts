import { Stock } from "@/types/portfolio";

export const calculateInvestment = (stock: Stock): number =>
  stock.purchasePrice * stock.quantity;

export const calculatePresentValue = (stock: Stock): number => {
  if (!stock.cmp) return 0;
  return stock.cmp * stock.quantity;
};

export const calculateGainLoss = (stock: Stock): number =>
  calculatePresentValue(stock) - calculateInvestment(stock);

export const calculatePortfolioPercentage = (
  stockInvestment: number,
  totalInvestment: number
): number => // Here number is the return type
  totalInvestment > 0
    ? (stockInvestment / totalInvestment) * 100
    : 0;
