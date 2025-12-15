import { NextResponse } from "next/server";
import { fetchYahooMarketData } from "@/services/yahooFinance";
import { MarketData } from "@/types/market";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json(
      { error: "Symbol is required" },
      { status: 400 }
    );
  }

  try {
    const yahooData = await fetchYahooMarketData(symbol);

    const response: MarketData = {
      symbol,
      cmp: yahooData.cmp,
      peRatio: yahooData.peRatio,
      latestEarnings: yahooData.latestEarnings,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("API /stocks failed", error);

    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500 }
    );
  }
}
