"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import PortfolioTable from "@/components/PortfolioTable";
import SectorSummaryTable from "@/components/SectorSummary";
import { Stock } from "@/types/portfolio";
import { calculateInvestment } from "@/utils/calculations";
import { fetchStockData } from "@/services/stockApi";
import { groupBySector } from "@/utils/sectorGrouping";

export default function Home() {
  // 🔹 Portfolio now comes from Excel (API), not mock
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ------------------------------
     1️⃣ Load portfolio from Excel
     ------------------------------ */
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/portfolio");

        if (!res.ok) {
          throw new Error("Failed to load portfolio");
        }

        const data: Stock[] = await res.json();
        setStocks(data);
      } catch (err) {
        console.error("Portfolio load failed:", err);
        setError("Failed to load portfolio from Excel file.");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  /* ------------------------------
     2️⃣ Total Investment (memoized)
     ------------------------------ */
  const totalInvestment = useMemo(() => {
    return stocks.reduce(
      (sum, stock) => sum + calculateInvestment(stock),
      0
    );
  }, [stocks]);

  /* ------------------------------
     3️⃣ Sector grouping (memoized)
     ------------------------------ */
  const sectorSummaries = useMemo(() => {
    return groupBySector(stocks);
  }, [stocks]);

  /* ------------------------------
     4️⃣ Live market data update
     ------------------------------ */
  const updateStockData = useCallback(async () => {
    if (stocks.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      const updatedStocks = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const apiData = await fetchStockData(stock.symbol);
console.log("Home cmp data:", apiData?.cmp);

            return {
              ...stock,
              cmp: apiData.cmp,
              peRatio: apiData.peRatio,
              latestEarnings: apiData.latestEarnings,
            };
          } catch (err) {
            console.error(
              `Market data fetch failed for ${stock.symbol}`,
              err
            );

            // Graceful fallback for this stock
            return {
              ...stock,
              cmp: null,
              peRatio: null,
              latestEarnings: null,
            };
          }
        })
      );

      setStocks(updatedStocks);
    } catch (err) {
      console.error("Live update failed:", err);
      setError("Failed to refresh live market data.");
    } finally {
      setLoading(false);
    }
  }, [stocks]);

  /* ------------------------------
     5️⃣ Initial + 15s refresh
     ------------------------------ */
  useEffect(() => {
    updateStockData();

    const intervalId = setInterval(updateStockData, 15000);
    return () => clearInterval(intervalId);
  }, [updateStockData]);

  /* ------------------------------
     UI
     ------------------------------ */
  return (
    <main className="p-6">
      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Dynamic Portfolio Dashboard
        </h1>

        {/* {loading && (
          <span className="text-sm text-gray-500">
            Updating data…
          </span>
        )} */}
      </div>

      {/* Sector Summary */}
      <SectorSummaryTable
        sectors={sectorSummaries}
        totalInvestment={totalInvestment}
      />

      {/* Portfolio Table */}
      <PortfolioTable
        data={stocks}
        totalInvestment={totalInvestment}
      />
    </main>
  );
}
