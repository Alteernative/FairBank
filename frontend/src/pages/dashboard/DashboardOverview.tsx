import {useUserContext} from "@/contexts/UserContext";
import {useState, useEffect} from "react";
import DashboardGraph from "./DashboardGraph";
import CountUp from "react-countup";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel.tsx";
import {Card, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {Trans, useTranslation} from "react-i18next";
import {Progress} from "@/components/ui/progress.tsx";
import * as React from "react";

export default function DashboardOverview() {
    const {user} = useUserContext();
    const {t} = useTranslation();
    const [balances, setBalances] = useState([
        {currency: "CAD", amount: user.balance},
    ]);
    const [dailyTransactionsSum, setDailyTransactionsSum] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        const dailyTransactions = user.sent_transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            transactionDate.toISOString().split('T')[0] === today;
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
                Bonjour {user.first_name}!
            </h1>

            {/* USER BALANCE */}
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

                {/* TRANSACTION LIMIT */}
                <div className="col-span-1 row-span-1 rounded-lg border p-4 shadow">
                    <h2 className="mb-3 font-bold">
                        Transactions quotidiennes
                    </h2>
                    <Progress value={progress} className="w-[100%]"/>
                    <div className="mt-2">
                        <p>Actuellement: ${dailyTransactionsSum.toFixed(2)} / ${transactionsLimit}</p>
                    </div>
                </div>

                {/* BALANCE GRAPH */}
                <div className="col-span-3 row-span-3 rounded-lg border p-4 shadow">
                    <DashboardGraph/>
                </div>

                {/* FOREIGN CURRENCY GRAPH */}
                <div className="col-span-3 row-span-1 rounded-lg border p-4 shadow">
                    <h2 className="mb-0 font-bold">
                        {t("dashboard.overview.exchangeRate")}
                    </h2>
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
