import AxiosInstance from "@/components/AxiosInstance";
import { useUserContext } from "@/contexts/UserContext";
import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";

type Transaction = {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  date: string;
  status: string;
  // Add other properties if needed
};

export default function DashboardActivity() {
  const { user } = useUserContext();

  const updateTransactionStatus = (
    transaction: Transaction,
    status: string
  ) => {
    AxiosInstance.put(`request/${transaction.id}/`, {
      status: status,
      sender: transaction.sender,
      receiver: transaction.receiver,
      amount: transaction.amount,
    })
      .then((transaction) => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        console.log("Update successful:", transaction);
      })
      .catch((error) => {
        console.error("Error updating transaction:", error.response.data);
      });
  };

  return (
    <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
      <h1 className="mb-10 font-jomhuria text-6xl">Activités</h1>
      <div className="mb-5 w-full">
        <h2 className="font-semibold">Activités a accepter</h2>
        <div className="space-y-2 rounded-lg border p-2 shadow">
          {user?.pending_sender_transactions?.map(
            (transaction: Transaction, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-base">{transaction.receiver}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      updateTransactionStatus(transaction, "accepted")
                    }
                    className="rounded bg-green-500 px-2 py-1 text-white"
                  >
                    V
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateTransactionStatus(transaction, "rejected")
                    }
                    className="rounded bg-red-500 px-2 py-1 text-white"
                  >
                    X
                  </button>
                </div>
                <p className="font-medium text-gray-700">
                  {transaction.amount}
                </p>
                <p className="font-medium text-blue-500">
                  {transaction.status}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mb-5 w-full">
        <h2 className="font-semibold">
          Activités en attente d'approbation de l'autre partie
        </h2>
        <div className="space-y-2 rounded-lg border p-2 shadow">
          {user?.pending_received_transactions?.map(
            (transaction: Transaction, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-base">{transaction.sender}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <p className="font-medium text-gray-700">
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="font-medium text-blue-500">
                  {transaction.status === "pending"
                    ? "en attente"
                    : transaction.status}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
