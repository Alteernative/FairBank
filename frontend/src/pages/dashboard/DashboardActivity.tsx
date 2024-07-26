import AxiosInstance from "@/components/AxiosInstance";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "@/contexts/UserContext";
import capitalize from "@/utils/capitalize";
import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import { Check, X } from "lucide-react";

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
    <section className="mx-14 min-h-screen w-full bg-muted/20 px-10 py-5 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">Activités</h1>
      <main className="flex flex-col gap-10">
        <div className="mb-5 w-full">
          <h2 className="mb-3 font-semibold">Activités à accepter</h2>
          <div className="space-y-2 rounded-lg border px-5 py-3 shadow">
            {user?.pending_sender_transactions?.map(
              (transaction: Transaction, index: number) => (
                <>
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="text-base">{transaction.receiver}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(transaction.date)}
                      </p>
                      <div className="mt-5 flex items-center gap-3">
                        <Button
                          type="button"
                          size={"icon"}
                          variant={"outline"}
                          onClick={() =>
                            updateTransactionStatus(transaction, "accepted")
                          }
                          className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                        >
                          <Check />
                        </Button>

                        <Button
                          type="button"
                          size={"icon"}
                          onClick={() =>
                            updateTransactionStatus(transaction, "rejected")
                          }
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                    <p className="select-none font-jomhuria text-4xl">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="select-none font-medium text-blue-500">
                      {transaction.status === "pending"
                        ? "En attente"
                        : capitalize(transaction.status)}
                    </p>
                  </div>
                  <Separator />
                </>
              )
            )}
          </div>
        </div>

        <div className="mb-5 w-full">
          <h2 className="mb-3 font-semibold">
            Activités en attente d'approbation de l'autre partie
          </h2>
          <div className="space-y-2 rounded-lg border px-5 py-3 shadow">
            {user?.pending_received_transactions?.map(
              (transaction: Transaction, index: number) => (
                <>
                  <div
                    key={index}
                    className="flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-base">{transaction.sender}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                    <p className="select-none font-jomhuria text-4xl">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="select-none font-medium text-blue-500">
                      {transaction.status === "pending"
                        ? "En attente"
                        : transaction.status}
                    </p>
                  </div>
                  <Separator />
                </>
              )
            )}
          </div>
        </div>
      </main>
    </section>
  );
}
