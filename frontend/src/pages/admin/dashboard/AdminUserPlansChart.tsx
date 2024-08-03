"use client";
import React, { useEffect, useState } from "react";
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
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const AccountTypesChart: React.FC = () => {
  const [regularUserCount, setRegularUserCount] = useState<number>(0);
  const [premiumUserCount, setPremiumUserCount] = useState<number>(0);
  const [ultimateUserCount, setUltimateUserCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(
        "dashboard_admin/list_all_users/"
      );
      if (Array.isArray(response.data)) {
        // Collect user plan types
        const regularUsers = response.data.filter(
          (user: any) => user.plan === "tier1"
        );
        const premiumUsers = response.data.filter(
          (user: any) => user.plan === "tier2"
        );
        const ultimateUsers = response.data.filter(
          (user: any) => user.plan === "tier3"
        );

        setRegularUserCount(regularUsers.length);
        setPremiumUserCount(premiumUsers.length);
        setUltimateUserCount(ultimateUsers.length);
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
      type: "Régulier",
      Utilisateurs: regularUserCount,
      fill: "var(--color-Régulier)",
    },
    {
      type: "Premium",
      Utilisateurs: premiumUserCount,
      fill: "var(--color-Premium)",
    },
    {
      type: "Ultime",
      Utilisateurs: ultimateUserCount,
      fill: "var(--color-Ultime)",
    },
  ];

  const chartConfig = {
    Utilisateurs: {
      label: "Utilisateurs",
    },
    Régulier: {
      label: "Régulier",
      color: "hsl(142.1 70.6% 45.3%)",
    },
    Premium: {
      label: "Premium",
      color: "hsl(220 8.9% 46.1%)",
    },
    Ultime: {
      label: "Ultime",
      color: "hsl(45.4 93.4% 47.5%)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plans des Utilisateurs</CardTitle>
        <CardDescription>
          Types des plans des utilisateurs actifs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer>
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
                  dataKey="type"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => chartConfig[value]?.label}
                />
                <XAxis
                  dataKey="Utilisateurs"
                  type="number"
                  domain={[0, "dataMax"]}
                  allowDecimals={false}
                  tickCount={6}
                />
                <ChartTooltip
                  cursor={{ fill: "rgba(255, 255, 255, 0.5)" }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="Utilisateurs" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountTypesChart;