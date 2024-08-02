"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUserContext } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";

const chartConfig = {
  balance: {
    label: "Balance",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Transaction = {
  id: number;
  sender: string;
  receiver: string;
  amount: string;
  date: string;
  type: "received" | "sent";
};

export default function DashboardGraph() {
  const { user } = useUserContext();
  const [balanceData, setBalanceData] = useState<
    { transactionNumber: number; balance: number }[]
  >([]);
  const [JsonObj, setJsonObj] = useState<string>("");

  useEffect(() => {
    if (user) {
      const transactions: Transaction[] = [
        ...(user.received_transactions ?? []).map((t) => ({
          ...t,
          type: "received" as const,
          date: t.date,
        })),
        ...(user.sent_transactions ?? []).map((t) => ({
          ...t,
          type: "sent" as const,
          date: t.date,
        })),
      ];

      transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      let currentBalance = user.balance;
      const balanceDataPoints: {
        transactionNumber: number;
        balance: number;
      }[] = [];

      balanceDataPoints.push({
        transactionNumber: transactions.length,
        balance: user.balance,
      });

      transactions.forEach((transaction, index) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === "received") {
          currentBalance -= amount;
        } else if (transaction.type === "sent") {
          currentBalance += amount;
        }
        balanceDataPoints.unshift({
          transactionNumber: transactions.length - index,
          balance: currentBalance,
        });
        console.log(index + ": " + transaction.amount);
      });

      setBalanceData(balanceDataPoints);

      const transactionsWithoutType = transactions.map(
        ({ type, ...rest }) => rest
      );

      const transactionsForCsv = transactionsWithoutType.map((transaction) => ({
        ...transaction,
        amount: transaction.amount + "$",
      }));
      const additionalData = {
        user_id: user.id,
        user_name: user.first_name,
        transactions: transactionsForCsv,
        transactionCount: transactions.length,
      };
      const formattedJsonObj = JSON.stringify(additionalData, null, 2);
      const header = "User Transactions Data\n";
      setJsonObj(header + formattedJsonObj);
      console.log(JsonObj);
    }
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Graphique du solde</CardTitle>
        <CardDescription>
          Progression de la balance de ce mois-ci
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={balanceData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="transactionNumber"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
              tick={{ fontSize: 12, fontWeight: "bold" }}
            />
            <YAxis
              tickCount={6}
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12, fontWeight: "bold" }}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="balance"
              type="natural"
              fill="var(--color-balance)"
              fillOpacity={0.4}
              stroke="var(--color-balance)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row justify-end">
          <CSVLink
            filename={"Historiquetransactions.csv"}
            data={JsonObj}
            className="flex size-7 items-center justify-center rounded-md bg-green-500 text-white transition-colors duration-300 hover:bg-green-600"
          >
            <FaFileDownload />
          </CSVLink>
        </div>

        {/* TODO: Faire calcul de l'etat du compte du mois precedent pour afficher tendance croissance ou descendante*/}
        {/*<div className="flex w-full items-start gap-2 text-sm">*/}
        {/*  <div className="grid gap-2">*/}
        {/*    <div className="flex items-center gap-2 font-medium leading-none">*/}
        {/*      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
        {/*    </div>*/}
        {/*    <div className="flex items-center gap-2 leading-none text-muted-foreground">*/}
        {/*      January - June 2024*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </CardFooter>
    </Card>
  );
}
