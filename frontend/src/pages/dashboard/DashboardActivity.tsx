import AxiosInstance from "@/components/AxiosInstance";
import { Badge } from "@/components/ui/badge";
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
    <section className="mx-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">Activités</h1>
      <main className="flex flex-col gap-10">
        <div className="mb-5 w-full">
          <h2 className="mb-3 text-lg font-semibold tracking-tight">
            Demande reçue
          </h2>
          <div className="space-y-2 rounded-lg border px-5 py-3 shadow">
            {user?.pending_sender_transactions?.map(
              (transaction: Transaction, index: number) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <p className="text-base">{transaction.receiver}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <p className="select-none font-jomhuria text-4xl">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <div className="flex items-center gap-3">
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

                  {/* TODO: Is this necessary? */}
                  {/* <p className="select-none font-medium text-blue-500">
                      {transaction.status === "pending"
                        ? "En attente"
                        : capitalize(transaction.status)}
                    </p> */}
                  <Separator />
                </div>
              )
            )}
          </div>
        </div>

        <div className="mb-5 w-full">
          <h2 className="mb-3 text-lg font-semibold tracking-tight">
            Demande envoyée
          </h2>
          <div className="space-y-2 rounded-lg border px-5 py-3 shadow">
            {user?.pending_received_transactions?.map(
              (transaction: Transaction, index: number) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-base">{transaction.sender}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <p className="select-none font-jomhuria text-4xl">
                    {formatCurrency(transaction.amount)}
                  </p>

                  <Badge className=" select-none bg-blue-500 text-sm font-medium text-white hover:bg-blue-500">
                    {transaction.status === "pending"
                      ? "En attente"
                      : transaction.status}
                  </Badge>
                  <Separator />
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </section>
  );
}
