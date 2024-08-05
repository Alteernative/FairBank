import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Banknote,
  CircleDollarSign,
  LayoutDashboard,
  Lock,
  Receipt,
  Send,
  WalletMinimal,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { BsCurrencyExchange } from "react-icons/bs";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="mb-32 mt-12">
      <h1 className="mb-4 text-center font-jomhuria text-6xl">
        {t("services.h1")}
      </h1>
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-muted/20">
          <CardHeader>
            <Banknote
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card1.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card1.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <Send
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card2.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card2.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <Receipt
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card3.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card3.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <BsCurrencyExchange
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card4.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card4.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <WalletMinimal
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card5.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card5.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <CircleDollarSign
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card6.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card6.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <LayoutDashboard
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card7.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card7.description")}
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <Lock
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              {t("services.card8.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            {t("services.card8.description")}
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
