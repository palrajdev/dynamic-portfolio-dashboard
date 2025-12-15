export interface Stock {
  symbol: string;              // NSE/BSE code (e.g. TCS, INFY)
  name: string;                // Stock Name (Particulars)
  exchange: "NSE" | "BSE";      // Exchange
  sector: string;
  purchasePrice: number;       // Buy price
  quantity: number;            // Qty

  // Derived / fetched values
  cmp?: number;                // Current Market Price
  peRatio?: number;            // P/E Ratio
  latestEarnings?: number;     // Latest earnings
}

export interface Portfolio {
  stocks: Stock[];
  totalInvestment: number;
  totalPresentValue: number;
}