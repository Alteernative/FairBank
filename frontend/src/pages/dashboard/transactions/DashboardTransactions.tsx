import { useUserContext } from "@/contexts/UserContext.tsx";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useTranslation } from "react-i18next";

export default function DashboardTransactions() {
  const { user } = useUserContext();
  const { t } = useTranslation();

  const sentTransactions: Payment[] = user.sent_transactions.map(
    (transaction) => ({
      id: transaction.id.toString(),
      amount: parseFloat(transaction.amount),
      status: `${t("dashboard.history.status.sent")}`,
      email: transaction.receiver,
      date: transaction.date,
      type: "sent",
    })
  );

  const receivedTransactions: Payment[] = user.received_transactions.map(
    (transaction) => ({
      id: transaction.id.toString(),
      amount: parseFloat(transaction.amount),
      status: `${t("dashboard.history.status.received")}`,
      email: transaction.sender,
      date: transaction.date,
      type: "received",
    })
  );

  const data: Payment[] = [...sentTransactions, ...receivedTransactions];

  return (
    <main className="mx-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">
        {t("dashboard.history.h1")}
      </h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
