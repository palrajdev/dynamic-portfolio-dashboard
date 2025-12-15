// src/services/stockApi.ts

export const fetchStockData = async (symbol: string) => {
    console.log("symbol data", symbol);
    
  const response = await fetch(`/api/stocks?symbol=${symbol}`);
console.log("fetchStockData Log Response", response);

  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }

  return response.json();
};
