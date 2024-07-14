import { useUserContext } from "@/contexts/UserContext";
import { useState } from "react";
import DashboardGraph from "@/pages/DashboardGraph.tsx";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";

export default function DashboardOverview() {
  const { user } = useUserContext();
  const [balances, setBalances] = useState([
    { currency: "CAD", amount: user.balance },
  ]);

  const handleBalanceConversion = (currency, rate) => {
    const convertedAmount = user.balance * rate;
    setBalances([...balances, { currency, amount: convertedAmount }]);
  };

  return (
    <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
      <h1 className="mb-10 font-jomhuria text-6xl">Overview</h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 rounded-lg bg-white p-4 shadow">
          <h2 className="mb-3 font-bold">Balance</h2>
          <CountUp
            start={0}
            end={user.balance}
            duration={2}
            prefix="$"
            decimals={2}
            className="font-jomhuria text-6xl"
          />
        </div>

        <div className="col-span-1 row-span-1 rounded-lg bg-white p-4 shadow">
          <h2>Graphe ratio des dépots et ajouts:</h2>
        </div>

        <div className="col-span-2 row-span-3 flex h-full w-full flex-col rounded-lg border p-4 shadow">
          <DashboardGraph />
        </div>

        <div className="col-span-1 row-span-3 rounded-lg bg-white p-4 shadow">
          <h2>
            Transactions totales :{" "}
            {user.sent_transactions.length + user.received_transactions.length}
          </h2>
        </div>

        <div className="col-span-3 row-span-1 rounded-lg bg-white p-4 shadow">
          <h2 className="mb-0 font-bold">Balance des devises étrangères:</h2>

          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {balances.map((balance, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={balance.amount}
                          duration={2}
                          prefix={`$`}
                          decimals={2}
                          className="font-jomhuria text-5xl"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}

              {balances.map((balance, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={balance.amount}
                          duration={2}
                          prefix={`$`}
                          decimals={2}
                          className="font-jomhuria text-5xl"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}

              {balances.map((balance, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={balance.amount}
                          duration={2}
                          prefix={`$ `}
                          decimals={2}
                          className="font-jomhuria text-5xl"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}

              {balances.map((balance, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={balance.amount}
                          duration={2}
                          prefix={`$ `}
                          decimals={2}
                          className="font-jomhuria text-5xl"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}

              {balances.map((balance, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={balance.amount}
                          duration={2}
                          prefix={`$ `}
                          decimals={2}
                          className="font-jomhuria text-5xl"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}

              {balances.map((balance, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="flex h-20 flex-col items-center">
                    <CardHeader className="flex cursor-default flex-col items-center">
                      <h2>
                        <CountUp
                          start={0}
                          end={balance.amount}
                          duration={2}
                          prefix={`$ `}
                          decimals={2}
                          className="font-jomhuria text-5xl"
                        />
                      </h2>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </main>
  );
}
