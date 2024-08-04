"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import formatCurrency from "@/utils/formatCurrency";

const chartConfig = {
  montant: {
    label: "Montant",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const AdminTransactionsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [activeChart, setActiveChart] = useState("montant");

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
          transactionsPerDay[date] = { date, montant: 0 };
        }
        transactionsPerDay[date].montant += parseFloat(transaction.amount);
      });
    });

    // Sort par date
    return Object.values(transactionsPerDay).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.montant, 0),
    [chartData]
  );

  // Format date  YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const currentDayTotal = React.useMemo(() => {
    const todayData = chartData.find((data) => data.date === today);
    return todayData ? todayData.montant : 0;
  }, [chartData, today]);

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 border-b p-0 md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Transactions Quotidiennes</CardTitle>
          <CardDescription>
            Montant transactionné quotidiennement
          </CardDescription>
        </div>

        {/* TODO: Remove buttons */}
        <div className="flex">
          <button
            data-active={activeChart === "montant"}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("montant")}
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
          {/* TODO: Remove buttons */}
          <button
            data-active={activeChart === "montant"}
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            onClick={() => setActiveChart("montant")}
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
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    // month: "short",
                    month: "2-digit",
                    day: "numeric",
                  });
                }}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                // dataKey={activeChart}
                dataKey="montant"
                fill="hsl(var(--chart-2))"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminTransactionsChart;
