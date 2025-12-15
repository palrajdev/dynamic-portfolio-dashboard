"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Stock } from "@/types/portfolio";
import {
  calculateInvestment,
  calculatePresentValue,
  calculateGainLoss,
} from "@/utils/calculations";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/DataTable";

interface Props {
  data: Stock[];
  totalInvestment: number;
}

export default function PortfolioTable({
  data,
  totalInvestment,
}: Props) {
  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      {
        header: "Stock",
        accessorKey: "name",
      },
      {
        header: "Buy Price",
        accessorKey: "purchasePrice",
      },
      {
        header: "Qty",
        accessorKey: "quantity",
      },
      {
        header: "Investment",
        cell: ({ row }) =>
          calculateInvestment(row.original).toFixed(2),
      },
      {
        header: "Portfolio %",
        cell: ({ row }) => {
          const investment = calculateInvestment(row.original);
          return (
            ((investment / totalInvestment) * 100).toFixed(2) +
            "%"
          );
        },
      },
      {
        header: "Exchange",
        accessorKey: "exchange",
      },
      {
        header: "CMP",
        cell: ({ row }) =>
          row.original.cmp?.toFixed(2) ?? "—",
      },
      {
        header: "Present Value",
        cell: ({ row }) =>
          calculatePresentValue(row.original).toFixed(2),
      },
      {
        header: "Gain / Loss",
        cell: ({ row }) => {
          const gain = calculateGainLoss(row.original);
          return (
            <span
              className={`font-medium ${
                gain >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {gain.toFixed(2)}
            </span>
          );
        },
      },
      {
        header: "P/E",
        cell: ({ row }) =>
          row.original.peRatio ?? "—",
      },
      {
        header: "Earnings",
        cell: ({ row }) =>
          row.original.latestEarnings ?? "—",
      },
    ],
    [totalInvestment]
  );

  return <DataTable data={data} columns={columns} />;
}
