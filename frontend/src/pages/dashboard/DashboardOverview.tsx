import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";
import DashboardGraph from "@/components/DashboardGraph";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { Card, CardHeader } from "@/components/ui/card.tsx";
import { ProgressBar } from "@/components/ProgressBar";
import { useTranslation } from "react-i18next";

const UPPER_LIMIT = 100;

export default function DashboardOverview() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [balances, setBalances] = useState([
    { currency: "CAD", amount: user.balance },
  ]);

  const handleBalanceConversion = (currency, rate) => {
    const convertedAmount = user.balance * rate;
    setBalances([...balances, { currency, amount: convertedAmount }]);
  };

  const currencySymbols = {
    USD: "$",
    JPY: "¥",
    EUR: "€",
    GBP: "£",
    CNY: "¥",
    INR: "₹",
  };

  return (
    <main className="mx-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">
        {/* TODO: Pass the props to i18n */}
        {/* Bonjour {user.first_name} */}
        {t("dashboard.overview.welcome")}
        {user.first_name}!
      </h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-5">
        <div className="rounded-lg border bg-background p-4 shadow lg:col-span-2 lg:row-span-1 ">
          <h2 className="mb-3 font-bold">{t("dashboard.overview.balance")}</h2>
          <CountUp
            start={0}
            end={user.balance}
            duration={1}
            prefix="$"
            decimals={2}
            className="font-jomhuria text-6xl"
          />
        </div>

        <div className="rounded-lg border bg-background p-4 shadow lg:col-span-1 lg:row-span-1">
          <h2 className="mb-3 font-bold">
            {t("dashboard.overview.transactions")}
          </h2>
          <ProgressBar
            transactionsCount={user.sent_transactions.length}
            upperLimit={UPPER_LIMIT}
          />
        </div>
        <div className="rounded-lg shadow lg:col-span-3 lg:row-span-3">
          <DashboardGraph />
        </div>

        <div className="rounded-lg border bg-background p-4 shadow lg:col-span-3 lg:row-span-1">
          <h2 className="mb-3 font-bold">
            {t("dashboard.overview.exchangeRate")}
          </h2>

          <Carousel className="w-full">
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
