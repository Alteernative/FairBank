import React, { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
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

const AccountTypesChart: React.FC = () => {
  const [balances, setBalances] = useState({
    USD: 0,
    JPY: 0,
    EUR: 0,
    GBP: 0,
    CNY: 0,
    INR: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch Foreign Currency for all users
      const response = await AxiosInstance.get(
        "dashboard_admin/list_all_users/"
      );
      if (Array.isArray(response.data)) {
        const totalBalance = {
          USD: 0,
          JPY: 0,
          EUR: 0,
          GBP: 0,
          CNY: 0,
          INR: 0,
        };

        response.data.forEach((user: any) => {
          if (Array.isArray(user.currencies) && user.currencies.length > 0) {
            const currency = user.currencies[0];
            totalBalance.USD += parseFloat(currency.balance_usd) || 0;
            totalBalance.JPY += parseFloat(currency.balance_jpy) || 0;
            totalBalance.EUR += parseFloat(currency.balance_eur) || 0;
            totalBalance.GBP += parseFloat(currency.balance_gbp) || 0;
            totalBalance.CNY += parseFloat(currency.balance_cny) || 0;
            totalBalance.INR += parseFloat(currency.balance_inr) || 0;
          }
        });

        setBalances(totalBalance);
      } else {
        setError("Invalid data format: Expected an array");
      }
    } catch (err: any) {
      setError("Error fetching data: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const chartData = [
    {
      currency: "USD",
      Balance: balances.USD,
      fill: "var(--color-USD)",
    },
    {
      currency: "JPY",
      Balance: balances.JPY,
      fill: "var(--color-JPY)",
    },
    {
      currency: "EUR",
      Balance: balances.EUR,
      fill: "var(--color-EUR)",
    },
    {
      currency: "GBP",
      Balance: balances.GBP,
      fill: "var(--color-GBP)",
    },
    {
      currency: "CNY",
      Balance: balances.CNY,
      fill: "var(--color-CNY)",
    },
    {
      currency: "INR",
      Balance: balances.INR,
      fill: "var(--color-INR)",
    },
  ];

  const chartConfig = {
    Balance: {
      label: "Balance",
    },
    USD: {
      label: "USD",
      color: "hsl(var(--chart-1))",
    },
    JPY: {
      label: "JPY",
      color: "hsl(var(--chart-2))",
    },
    EUR: {
      label: "EUR",
      color: "hsl(var(--chart-3))",
    },
    GBP: {
      label: "GBP",
      color: "hsl(var(--chart-4))",
    },
    CNY: {
      label: "CNY",
      color: "hsl(var(--chart-5))",
    },
    INR: {
      label: "INR",
      color: "hsl(var(--chart-6))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Devises Étrangères</CardTitle>
        <CardDescription>
          Total des devises étrangères échangées par les utilisateurs actifs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={600}
            height={300}
            data={chartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <YAxis
              dataKey="currency"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis
              dataKey="Balance"
              type="number"
              domain={[0, "dataMax"]}
              allowDecimals={false}
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Balance" layout="horizontal" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AccountTypesChart;
