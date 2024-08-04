import { useUserContext } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import DashboardGraph from "@/components/DashboardGraph";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { Card, CardHeader } from "@/components/ui/card.tsx";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress.tsx";
import formatCurrency from "@/utils/formatCurrency";

export default function DashboardOverview() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [dailyTransactionsSum, setDailyTransactionsSum] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const dailyTransactions = user.sent_transactions.filter((transaction) => {
      try {
        const transactionDate = new Date(transaction.date);
        if (isNaN(transactionDate)) {
          throw new Error("Invalid date");
        }
        return transactionDate.toISOString().split("T")[0] === today;
      } catch (error) {
        console.error(
          `Error processing transaction date: ${transaction.date}`,
          error
        );
        return false;
      }
    });

    const dailySum = dailyTransactions.reduce((sum, transaction) => {
      const amount = parseFloat(transaction.amount);
      return sum + amount;
    }, 0);

    setDailyTransactionsSum(dailySum);
  }, [user.sent_transactions]);

  const currencySymbols = {
    USD: "$",
    JPY: "¥",
    EUR: "€",
    GBP: "£",
    CNY: "¥",
    INR: "₹",
  };

  const transactionsLimits = {
    tier1: 5000,
    tier2: 15000,
    tier3: 100000,
  };
  const transactionsLimit = transactionsLimits[user.plan];
  const progress = (dailyTransactionsSum / transactionsLimit) * 100;

  return (
    <main className="mx-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">
        {/* TODO: Pass the props to i18n */}
        {/* Bonjour {user.first_name} */}
        {t("dashboard.overview.welcome")}
        {user.first_name}!
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-5">
        <div className="rounded-lg border bg-background p-4 lg:col-span-2 lg:row-span-1 ">
          <h2 className="mb-3 font-bold sm:mb-8">
            {t("dashboard.overview.balance")}
          </h2>
          <CountUp
            start={0}
            end={user.balance}
            duration={1}
            prefix="$"
            decimals={2}
            className="font-jomhuria text-6xl xl:text-8xl"
          />
        </div>

        {/* TRANSACTION LIMIT */}
        <div className="col-span-1 row-span-1 rounded-lg border bg-background p-4">
          <h2 className="mb-3 font-bold sm:mb-8">Limite quotidienne</h2>
          <Progress value={progress} className="w-full" />
          <p className="mt-4 font-jomhuria text-3xl">
            {`${formatCurrency(dailyTransactionsSum)} / ${formatCurrency(transactionsLimit)}`}
          </p>
        </div>

        <div className="rounded-lg lg:col-span-3 lg:row-span-3">
          <DashboardGraph />
        </div>

        <div className="rounded-lg border bg-background p-4 lg:col-span-3 lg:row-span-1">
          <h2 className="mb-3 font-bold">
            {t("dashboard.overview.exchangeRate")}
          </h2>

          <Carousel className="mt-8 w-full">
            <CarouselContent>
              {Object.entries(user.currencies).map(([key, value], index) => {
                const currencyKey = key.replace("balance_", "").toUpperCase();

                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <Card className="flex flex-col items-center">
                      <CardHeader className="flex cursor-default flex-col items-center">
                        <h2>
                          <CountUp
                            start={0}
                            end={parseFloat(value)}
                            duration={1}
                            prefix={currencySymbols[currencyKey]}
                            decimals={2}
                            className="select-none text-3xl font-extrabold"
                          />
                        </h2>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        {/* <Carousel className="w-full shadow lg:col-span-3 lg:row-span-1">
          <CarouselContent className="-ml-1">
            {Object.entries(user.currencies).map(([key, value], index) => {
              const currencyKey = key.replace("balance_", "").toUpperCase();

              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={parseFloat(value)}
                          duration={1}
                          prefix={currencySymbols[currencyKey]}
                          decimals={2}
                          className="text-3xl font-extrabold"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel> */}
      </div>
    </main>
  );
}
