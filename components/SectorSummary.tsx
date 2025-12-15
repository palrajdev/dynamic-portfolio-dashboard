"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SectorSummary } from "@/utils/sectorGrouping";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/DataTable";

interface Props {
  sectors: SectorSummary[];
  totalInvestment: number;
}

export default function SectorSummaryTable({
  sectors,
  totalInvestment,
}: Props) {
  const columns = useMemo<ColumnDef<SectorSummary>[]>(
    () => [
      {
        header: "Sector",
        accessorKey: "sector",
      },
      {
        header: "Investment",
        cell: ({ row }) =>
          row.original.investment.toFixed(2),
      },
      {
        header: "Present Value",
        cell: ({ row }) =>
          row.original.presentValue.toFixed(2),
      },
      {
        header: "Gain / Loss",
        cell: ({ row }) => (
          <span
            className={`font-medium ${
              row.original.gainLoss >= 0
                ? "text-emerald-600"
                : "text-rose-600"
            }`}
          >
            {row.original.gainLoss.toFixed(2)}
          </span>
        ),
      },
      {
        header: "Portfolio %",
        cell: ({ row }) => {
          const pct =
            totalInvestment > 0
              ? (row.original.investment /
                  totalInvestment) *
                100
              : 0;
          return pct.toFixed(2) + "%";
        },
      },
    ],
    [totalInvestment]
  );

  return (
    <div className="mb-8">
      <h2 className="mb-3 text-lg font-semibold text-gray-800">
        Sector-wise Allocation
      </h2>

      <DataTable data={sectors} columns={columns} />
    </div>
  );
}