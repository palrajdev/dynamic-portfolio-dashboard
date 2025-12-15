import yahooFinance from "yahoo-finance2";

export interface YahooMarketData {
  cmp: number | null;
  peRatio: number | null;
  latestEarnings: number | null;
}

export const fetchYahooMarketData = async (
  symbol: string
): Promise<YahooMarketData> => {
  try {
    const yahooSymbol = `${symbol}.NS`;

    const result = await yahooFinance.quoteSummary(yahooSymbol, {
      modules: ["price", "summaryDetail", "earnings"],
    });

    const cmp =
      result.price?.regularMarketPrice ?? null;

    const peRatio =
      result.summaryDetail?.trailingPE ?? null;

    const latestEarnings =
      result.earnings?.earningsChart?.quarterly?.[0]
        ?.actual ?? null;

    return {
      cmp,
      peRatio,
      latestEarnings,
    };
  } catch (error) {
    console.error(
      `Yahoo Finance fetch failed for ${symbol}`,
      error
    );

    return {
      cmp: null,
      peRatio: null,
      latestEarnings: null,
    };
  }
};
