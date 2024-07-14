import { useUserContext } from "@/contexts/UserContext.tsx";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default function DashboardTransactions() {
  const { user } = useUserContext();

  const sentTransactions: Payment[] = user.sent_transactions.map((transaction) => ({
    id: transaction.id.toString(),
    amount: parseFloat(transaction.amount),
    status: "Envoyé",
    email: transaction.receiver,
    date: transaction.date,
    type: "sent",
  }));

  const receivedTransactions: Payment[] = user.received_transactions.map((transaction) => ({
    id: transaction.id.toString(),
    amount: parseFloat(transaction.amount),
    status: "Reçu",
    email: transaction.sender,
    date: transaction.date,
    type: "received",
  }));

  const data: Payment[] = [...sentTransactions, ...receivedTransactions];

  return (
    <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
      <h1 className="mb-10 font-jomhuria text-6xl">Historique des Transactions</h1>
      <h2 className="text-2xl font-bold tracking-tight">Salut {user.first_name}!</h2>
      <p className="text-muted-foreground">
        Voici l'historique de tes transactions récentes:
      </p>
      <DataTable columns={columns} data={data} />
    </main>
  );
}