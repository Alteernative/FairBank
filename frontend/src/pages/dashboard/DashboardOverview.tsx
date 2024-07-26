import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";
import DashboardGraph from "./DashboardGraph";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { Card, CardHeader } from "@/components/ui/card.tsx";
import { ProgressBar } from "./ProgressBar";

const UPPER_LIMIT = 100;

export default function DashboardOverview() {
  const { user } = useUserContext();
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
    <main className="ml-14 h-full w-full bg-muted/20 px-10 py-5 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">
        Bonjour {user.first_name}
      </h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 rounded-lg border p-4 shadow">
          <h2 className="mb-3 font-bold">Balance</h2>
          <CountUp
            start={0}
            end={user.balance}
            duration={1}
            prefix="$"
            decimals={2}
            className="font-jomhuria text-6xl"
          />
        </div>

        {/* TODO: Add condition for upper limit of transactions amount based on account type */}
        <div className="col-span-1 row-span-1 rounded-lg border p-4 shadow">
          <h2>Quantité de transactions</h2>
          <ProgressBar
            transactionsCount={user.sent_transactions.length}
            upperLimit={UPPER_LIMIT}
          />
        </div>
        <div className="col-span-3 row-span-3 rounded-lg border p-4 shadow">
          <DashboardGraph />
        </div>

        {/* <div className="col-span-1 row-span-3 rounded-lg border p-4 shadow">
          <h2>Transactions rapide</h2>
        </div> */}

        <div className="col-span-3 row-span-1 rounded-lg border p-4 shadow">
          <h2 className="mb-0 font-bold">Balance des devises étrangères:</h2>

          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {Object.entries(user.currencies).map(([key, value], index) => {
                const currencyKey = key.replace("balance_", "").toUpperCase();

                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
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
          </Carousel>
        </div>
      </div>
    </main>
  );
}
