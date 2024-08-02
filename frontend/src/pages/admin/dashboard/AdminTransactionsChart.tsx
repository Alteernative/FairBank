"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import formatCurrency from "@/utils/formatCurrency";

const AdminTransactionsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [activeChart, setActiveChart] = useState("montantTotal");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          "dashboard_admin/list_all_users/"
        );
        const data = response.data;
        console.log("Reponse Backend fetch API Users:", data);
        if (Array.isArray(data)) {
          const transformedData = transformData(data);
          setChartData(transformedData);
        } else {
          throw new Error("Invalid data: Expected array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const transformData = (data) => {
    const transactionsPerDay = {};

    data.forEach((user) => {
      user.received_transactions.forEach((transaction) => {
        const date = new Date(transaction.date).toISOString().split("T")[0];
        if (!transactionsPerDay[date]) {
          transactionsPerDay[date] = { date, montantTotal: 0 };
        }
        transactionsPerDay[date].montantTotal += parseFloat(transaction.amount);
      });
    });

    // Sort par date
    return Object.values(transactionsPerDay).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.montantTotal, 0),
    [chartData]
  );

  // Format date  YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const currentDayTotal = React.useMemo(() => {
    const todayData = chartData.find((data) => data.date === today);
    return todayData ? todayData.montantTotal : 0;
  }, [chartData, today]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Graphe Transactions Quotidiennes</CardTitle>
          <CardDescription>
            Visualisant le montant transactionné quotidiennement
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={activeChart === "montantTotal"}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("montantTotal")}
          >
            <span className="text-xs text-muted-foreground">
              Montant Quotidien
            </span>
            <p className="font-jomhuria text-5xl">
              {formatCurrency(currentDayTotal)}
            </p>
          </button>
        </div>

        <div className="flex">
          <button
            data-active={activeChart === "montantTotal"}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("montantTotal")}
          >
            <span className="text-xs text-muted-foreground">Montant Total</span>
            <p className="font-jomhuria text-5xl">{formatCurrency(total)}</p>
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        {error ? (
          <div>{error}</div>
        ) : (
          <div className="h-[200px] w-full">
            <ResponsiveContainer>
              <BarChart
                width={750}
                height={250}
                data={chartData}
                margin={{ left: 12, right: 12 }}
              >
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={activeChart} fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminTransactionsChart;
