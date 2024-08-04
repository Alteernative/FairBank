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
import { useTranslation } from "react-i18next";

const AccountPlansChart: React.FC = () => {
  const [tier1UserCount, setTier1UserCount] = useState<number>(0);
  const [tier2UserCount, setTier2UserCount] = useState<number>(0);
  const [tier3UserCount, setTier3UserCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(
        "dashboard_admin/list_all_users/"
      );
      if (Array.isArray(response.data)) {
        // Collect user plan plans
        const tier1Users = response.data.filter(
          (user: any) => user.plan === "tier1"
        );
        const tier2Users = response.data.filter(
          (user: any) => user.plan === "tier2"
        );
        const tier3Users = response.data.filter(
          (user: any) => user.plan === "tier3"
        );

        setTier1UserCount(tier1Users.length);
        setTier2UserCount(tier2Users.length);
        setTier3UserCount(tier3Users.length);
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
      plan: `${t("plans.tier1.name")}`,
      Utilisateurs: tier1UserCount,
      fill: "var(--color-Régulier)",
    },
    {
      plan: `${t("plans.tier2.name")}`,
      Utilisateurs: tier2UserCount,
      fill: "var(--color-Premium)",
    },
    {
      plan: `${t("plans.tier3.name")}`,
      Utilisateurs: tier3UserCount,
      fill: "var(--color-Ultime)",
    },
  ];

  const chartConfig = {
    Utilisateurs: {
      label: "Client",
    },
    Régulier: {
      label: `${t("plans.tier1.name")}`,
      color: "hsl(142.1 70.6% 45.3%)",
    },
    Premium: {
      label: `${t("plans.tier2.name")}`,
      color: "hsl(220 8.9% 46.1%)",
    },
    Ultime: {
      label: `${t("plans.tier3.name")}`,
      color: "hsl(45.4 93.4% 47.5%)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <CardDescription>
          Affiche le nombre de client pour chaque plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 5,
            }}
          >
            <YAxis
              dataKey="plan"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="Utilisateurs" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Utilisateurs" layout="horizontal" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AccountPlansChart;
