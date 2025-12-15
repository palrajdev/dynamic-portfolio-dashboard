import { Stock } from "@/types/portfolio";

export const mockStocks: Stock[] = [
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    exchange: "NSE",
    sector: "IT Services",
    purchasePrice: 3200,
    quantity: 10,
  },
  {
    symbol: "INFY",
    name: "Infosys",
    exchange: "NSE",
    sector: "IT Services",
    purchasePrice: 1450,
    quantity: 20,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    exchange: "NSE",
    sector: "Banking",
    purchasePrice: 1550,
    quantity: 15,
  },
];
