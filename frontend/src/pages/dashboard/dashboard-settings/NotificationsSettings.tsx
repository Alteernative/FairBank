import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function NotificationsSettings() {
  const { t } = useTranslation();
  return (
    <main className="ml-14 flex min-h-screen w-full flex-col gap-4 bg-muted/20 px-3 pt-[7rem] sm:px-10 lg:ml-52">
      <Card className="w-full sm:w-10/12">
        <CardHeader>
          <CardTitle>{t("settings.notifications.card1.title")}</CardTitle>
          <CardDescription>
            {t("settings.notifications.card1.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="font-jomhuria text-5xl">Sprint 3</h1>
        </CardContent>
      </Card>
    </main>
  );
}
