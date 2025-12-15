export const fetchGoogleFinanceData = async (symbol: string) => {
  // NOTE: Google Finance has no public API
  // This is a mocked / simulated response for assignment purposes

  return {
    peRatio: Math.floor(Math.random() * 30) + 10,
    latestEarnings: Math.floor(Math.random() * 500) + 100,
  };
};
