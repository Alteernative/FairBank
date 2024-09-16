import { useEffect, useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import formatCurrency from "@/utils/formatCurrency";

const chartConfig = {
  montant: {
    label: "Montant",
    color: "hsl(var(--chart-1))",
  },
};

const AdminTransactionsChart = () => {
  const [chartData, setChartData] = useState<{ date: string; montant: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeChart, setActiveChart] = useState("montant");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("dashboard_admin/list_all_users/");
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
        setError((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const transformData = (data: { received_transactions: { date: string; amount: string }[] }[]) => {
    const transactionsPerDay: { [key: string]: { date: string; montant: number } } = {};

    data.forEach((user) => {
      user.received_transactions.forEach((transaction) => {
        const date = new Date(transaction.date).toISOString().split("T")[0];
        if (!transactionsPerDay[date]) {
          transactionsPerDay[date] = { date, montant: 0 };
        }
        transactionsPerDay[date].montant += parseFloat(transaction.amount);
      });
    });

    // Sort by date
    return Object.values(transactionsPerDay).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const total = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.montant, 0),
    [chartData]
  );

  // Format date YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const currentDayTotal = useMemo(() => {
    const todayData = chartData.find((data) => data.date === today);
    return todayData ? todayData.montant : 0;
  }, [chartData, today]);

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-0 border-b p-0 md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Transactions Quotidiennes</CardTitle>
          <CardDescription>
            Affiche le montant total des transactions quotidiennes
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

      <CardContent className="py-3 sm:p-6">
        {error ? (
          <div>{error}</div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[400px] w-full xl:h-[500px]"
          >
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const [year, month, day] = value.split("-");
                  const date = new Date(year, parseInt(month) - 1, parseInt(day));
                  return date.toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                content={({ payload}) => {
                  if (!payload || payload.length === 0) return null;
                  return (
                    <div>
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`}>
                          {entry.name}: {formatCurrency(entry.value as number)}
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
              <Bar dataKey="montant" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminTransactionsChart;
