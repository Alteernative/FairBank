import { useUserContext } from "@/contexts/UserContext.tsx";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default function DashboardTransactions() {
  const { user } = useUserContext();

  const sentTransactions: Payment[] = user.sent_transactions.map(
    (transaction) => ({
      id: transaction.id.toString(),
      amount: parseFloat(transaction.amount),
      status: "Envoyé",
      email: transaction.receiver,
      date: transaction.date,
      type: "sent",
    })
  );

  const receivedTransactions: Payment[] = user.received_transactions.map(
    (transaction) => ({
      id: transaction.id.toString(),
      amount: parseFloat(transaction.amount),
      status: "Reçu",
      email: transaction.sender,
      date: transaction.date,
      type: "received",
    })
  );

  const data: Payment[] = [...sentTransactions, ...receivedTransactions];

  return (
    <main className="h-screen w-full bg-muted/20 px-5 py-5 lg:ml-60 lg:mr-72">
      <h1 className="mb-10 font-jomhuria text-6xl">
        Historique des transactions
      </h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
