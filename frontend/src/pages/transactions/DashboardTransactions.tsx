import { useUserContext } from "@/contexts/UserContext.tsx";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import AxiosInstance from "@/components/AxiosInstance.tsx";

export default function DashboardTransactions() {
  const { user } = useUserContext();

  //*********** function temp *****************//
  const updateCurrencyBalance = (currency, amount) => {
    AxiosInstance.put(`currencies/update_balance/`, { currency, amount })
      .then((response) => {
        console.log("Balance updated successfully:", response.data);
        // navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating balance:", error);
      });
  };

  const currency = "eur"; // Replace with the currency you want to update
  const amount = 10.0; // Replace with the amount you want to add
  console.log(currency, amount);
  updateCurrencyBalance(currency, amount);
  //*********** function temp *****************//

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
    <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
      <h1 className="mb-10 font-jomhuria text-6xl">
        Historique des Transactions
      </h1>
      <h2 className="text-2xl font-bold tracking-tight">
        Salut {user.first_name}!
      </h2>
      <p className="text-muted-foreground">
        Voici l'historique de tes transactions récentes:
      </p>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
