import { useTransactionContext } from "@/contexts/TransactionContext.tsx";
import { useUserContext } from "@/contexts/UserContext.tsx";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

export default function DashboardTransactions() {
  const {transactions} = useTransactionContext();
  const {user} = useUserContext();

  // Map transactions to Payment type if needed
  const data: Payment[] = transactions.map(transaction => ({
    id: transaction.id.toString(),
    amount: transaction.amount,
    status: "Success",
    email: user.email,
  }));

  return (
      <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
        <h1 className="mb-10 font-jomhuria text-6xl">Historique des Transactions</h1>
        <h2 className="text-2xl font-bold tracking-tight">Salut { user.first_name }! </h2>
        <p className="text-muted-foreground">Voici l'historique de tes transactions récentes:</p>
        <DataTable columns={columns} data={data}/>
      </main>
  );
}
