import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotificationsSettings() {
  return (
    <main className="ml-14 flex w-full flex-col gap-4 bg-muted/20 px-10 pt-[7rem] lg:ml-60">
      <Card className="w-10/12">
        <CardHeader>
          <CardTitle>Préférences des notifications</CardTitle>
          <CardDescription>
            Séléctionner vos préférences de notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="font-jomhuria text-5xl">Sprint 3</h1>
        </CardContent>
      </Card>
    </main>
  );
}
