import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import { Stock } from "@/types/portfolio";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "portfolio.xlsx"
    );

    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows: any[] = XLSX.utils.sheet_to_json(sheet, {
      header: 1, // raw rows
      defval: null,
    });

    const stocks: Stock[] = [];
    let currentSector = "";

    for (const row of rows) {
      // Detect sector header (e.g., "Financial Sector")
      if (
        typeof row[1] === "string" &&
        row[1].toLowerCase().includes("sector")
      ) {
        currentSector = row[1];
        continue;
      }

      // Detect valid stock row
      if (
        typeof row[1] === "string" &&
        typeof row[2] === "number" &&
        typeof row[3] === "number"
      ) {
        stocks.push({
          symbol: String(row[6]),
          name: row[1],
          exchange: "NSE",
          sector: currentSector,
          purchasePrice: row[2],
          quantity: row[3],
        });
      }
    }

    return NextResponse.json(stocks);
  } catch (error) {
    console.error("Excel parsing failed:", error);
    return NextResponse.json(
      { error: "Failed to parse portfolio Excel" },
      { status: 500 }
    );
  }
}
