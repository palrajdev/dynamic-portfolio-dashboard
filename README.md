# Dynamic Portfolio Dashboard

A full-stack **Dynamic Portfolio Dashboard** built using **Next.js, TypeScript, Tailwind CSS, and Node.js**, which displays portfolio performance enriched with **real-time market data** from Yahoo Finance.

This project was developed as part of a technical case study to demonstrate frontend architecture, backend integration, data transformation, performance optimization, and error handling.

---

## 📌 Features

- 📊 Portfolio table with complete investment metrics
- 🔄 Live market data refresh every 15 seconds
- 🏦 Sector-wise portfolio grouping and summaries
- 📈 Real-time CMP, P/E Ratio, and Earnings
- 🎨 Professional, reusable table UI
- ⚡ Optimized performance with memoization & caching
- ❗ Graceful error handling
- 📁 Portfolio sourced from Excel (`.xlsx`) file

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- @tanstack/react-table

### Backend
- Node.js (Next.js API Routes)
- yahoo-finance2
- xlsx

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── api/
 │   │   ├── portfolio/route.ts
 │   │   └── stocks/route.ts
 │   └── page.tsx
 │
 ├── components/
 │   ├── PortfolioTable.tsx
 │   ├── SectorSummary.tsx
 │   └── ui/DataTable.tsx
 │
 ├── services/
 │   ├── stockApi.ts
 │   └── yahooFinance.ts
 │
 ├── utils/
 │   ├── calculations.ts
 │   └── sectorGrouping.ts
 │
 ├── types/
 │   ├── portfolio.ts
 │   └── market.ts
 │
public/
 └── portfolio.xlsx
```

---

## 📥 Portfolio Input

Portfolio holdings are loaded from an Excel file (`portfolio.xlsx`) placed in the `public` folder.  
This file contains sector headers and stock rows. Calculated columns are ignored, as calculations are handled dynamically in the application.

---

## 🔄 Live Market Data

Yahoo Finance is used to fetch:
- Current Market Price (CMP)
- P/E Ratio
- Latest Earnings

Since Yahoo and Google Finance do not provide official public APIs, the project uses the widely accepted `yahoo-finance2` library on the backend.

---

## ⏱ Dynamic Updates

Market data refreshes automatically every **15 seconds** using `setInterval`, with proper cleanup to avoid memory leaks.

---

## 📊 Sector Grouping

Stocks are grouped by sector and displayed with:
- Total Investment
- Present Value
- Gain / Loss
- Portfolio Percentage

---

## ⚡ Performance Optimizations

- Memoization using `useMemo`
- Stable callbacks using `useCallback`
- Backend caching with TTL
- Reusable table components

---

## ❗ Error Handling

- API-level try/catch blocks
- Per-stock fallback handling
- User-friendly UI error messages

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## 👤 Author

**Palraj Govintharasu**  
Full Stack Developer (React.js, Next.js, Node.js)
"# dynamic-portfolio-dashboard" 
