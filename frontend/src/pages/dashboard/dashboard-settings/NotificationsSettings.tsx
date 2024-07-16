import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotificationsSettings() {
  return (
    <main className="ml-14 mt-20 flex w-4/5 flex-col gap-4 md:ml-12 lg:ml-8">
      <Card className="w-10/12 border-none shadow-none">
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
