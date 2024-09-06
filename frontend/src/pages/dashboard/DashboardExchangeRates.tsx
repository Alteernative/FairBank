import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useUserContext } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const chartConfig = {
  rate: {
    label: "Valeur",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ExchangeRates {
  [currency: string]: number;
}

interface ChartDataEntry {
  date: string;
  rate: number;
}

interface ChartData {
  [currency: string]: ChartDataEntry[];
}

export default function DashboardExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [chartData, setChartData] = useState<ChartData>({});
  const { user } = useUserContext();
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // API KEY from apilayer.com
  const apiKey = import.meta.env.VITE_APIKEY;

  const updateCurrencyBalance = (
  currency: string,
  originalAmount: number,
  convertedAmount: number
  ) => {
    AxiosInstance.put(`currencies/update_balance/`, {
      currency: currency,
      original_amount: originalAmount.toString(),
      converted_amount: convertedAmount.toString(),
    })
      .then(() => {
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        console.error("Error updating balance:", error);
      });
  };

  // Fetch exchange rates compared to the CAD
  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest`,
        {
          params: {
            base: "CAD",
            symbols: "USD,JPY,EUR,GBP,CNY,INR",
          },
          headers: {
            apikey: apiKey,
          },
        }
      );

      if (response.data && response.data.rates) {
        setExchangeRates(response.data.rates);
      } else {
        console.error("Error fetching exchange rate data");
      }
    } catch (error) {
      console.error("Error fetching exchange rate data", error);
    }
  };

  // Fetch data for the exchange rate graph
  const fetchHistoryExchangeRates = async () => {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/exchangerates_data/timeseries`,
        {
          params: {
            start_date: "2024-01-01",
            end_date: "2024-07-01",
            base: "CAD",
            symbols: "USD,JPY,EUR,GBP,CNY,INR",
          },
          headers: {
            apikey: apiKey,
          },
        }
      );

      if (response.data && response.data.rates) {
        const data = response.data.rates;
        const processedData = {};
        Object.keys(data).forEach((date) => {
          Object.keys(data[date]).forEach((currency) => {
            if (!processedData[currency]) {
              processedData[currency] = [];
            }
            processedData[currency].push({
              date,
              rate: data[date][currency],
            });
          });
        });
        setChartData(processedData);
      } else {
        console.error("Error fetching exchange rate data");
      }
    } catch (error) {
      console.error("Error fetching exchange rate data", error);
    }
  };

  const handleConversion = async () => {
    try {
      const response = await axios.get(
        `https://api.apilayer.com/exchangerates_data/convert`,
        {
          params: {
            from: "CAD",
            to: selectedCurrency,
            amount,
          },
          headers: {
            apikey: apiKey,
          },
        }
      );

      if (response.data && response.data.result) {
        const convertedAmount = response.data.result;
        setConvertedAmount(convertedAmount);
        updateCurrencyBalance(selectedCurrency, amount, convertedAmount);
      } else {
        console.error("Error converting currency");
      }
    } catch (error) {
      console.error("Error converting currency", error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    fetchHistoryExchangeRates();
  }, []);

  function getFlagEmoji(currency: string): string {
    switch (currency) {
      case "USD":
        return "🇺🇸";
      case "JPY":
        return "🇯🇵";
      case "EUR":
        return "🇪🇺";
      case "GBP":
        return "🇬🇧";
      case "CNY":
        return "🇨🇳";
      case "INR":
        return "🇮🇳";
      default:
        return "";
    }
  }

  return (
    <section className="mx-14 h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 w-full font-jomhuria text-6xl">
        {t("dashboard.exchangeRate.h1")}
      </h1>
      <h2 className="mb-2 w-full text-center text-3xl font-bold">
        {t("dashboard.exchangeRate.h2")}
      </h2>

      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 md:grid-rows-4 xl:grid-cols-3 xl:grid-rows-3">
        {Object.keys(chartData).map((currency) => (
          // <div className="md: md:col-span-1 lg:col-span-1">
          <div>
            <Dialog key={currency}>
              <DialogTrigger asChild>
                {/* <Button className="mx-2 my-2 h-1/4 w-1/4 rounded-lg px-5 shadow-lg outline md:w-1/4"> */}
                <Button className="h-full w-full">
                  {exchangeRates[currency] ? (
                    <p className="text-2xl">
                      {" "}
                      CAD-{currency} {getFlagEmoji(currency)}
                      <br /> <br />
                      {exchangeRates[currency]} {currency}
                    </p>
                  ) : (
                    <p className="text-2xl">
                      Chargement taux conversion {currency}...
                    </p>
                  )}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                  <DialogTitle>Graphe de devise </DialogTitle>
                  <DialogDescription>
                    Vous pouvez voir ici plus de détails sur l'état du{" "}
                    {currency} et l'ajouter à votre balance.
                  </DialogDescription>
                </DialogHeader>

                <Card key={currency}>
                  <CardHeader>
                    <CardTitle>CAD - {currency}</CardTitle>
                    <CardDescription>
                      Valeur du taux de change CAD - {currency} des 6 derniers
                      mois
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        data={chartData[currency]}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString()
                          }
                        />
                        <YAxis domain={["auto", "auto"]} />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent indicator="dot" hideLabel />
                          }
                        />
                        <Area
                          dataKey="rate"
                          type="linear"
                          fill="#8D918D"
                          fillOpacity={0.2}
                          stroke="#006400"
                          strokeWidth={1.5}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                          Croissance de 5.2% ce mois-ci{" "}
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                          Janvier - Juillet 2024
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                <DialogFooter className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-4">
                    <Button className="flex-1" onClick={() => {}}>
                      Balance ${user.balance.toPrecision(4)}
                    </Button>
                    <Input
                      className="flex-1"
                      placeholder="Entrez le montant à convertir"
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <Button
                      className="flex-1"
                      type="submit"
                      onClick={() => {
                        setSelectedCurrency(currency);
                        handleConversion();
                      }}
                    >
                      Convertir
                    </Button>
                  </div>

                  <div>
                    <p>
                      Montant converti: {convertedAmount} {currency}
                    </p>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </main>
    </section>
  );
}
