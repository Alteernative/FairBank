import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FaMoneyBillTransfer,
  FaHandHoldingDollar,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { CircleUser } from "lucide-react";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Tier1VisaH from "../assets/images/cards/horizontal/tier1/1/Visa.svg";
import Tier2VisaH from "../assets/images/cards/horizontal/tier2/2/Visa.svg";
import Tier3VisaH from "../assets/images/cards/horizontal/tier3/4/Visa.svg";
import Tier1VisaV from "../assets/images/cards/vertical/tier1/1/Visa.svg";
import Tier2VisaV from "../assets/images/cards/vertical/tier2/2/Visa.svg";
import Tier3VisaV from "../assets/images/cards/vertical/tier3/4/Visa.svg";
import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate.ts";
import capitalize from "@/utils/capitalize";

type Activity = {
  date: string;
  amount: string;
  isPositive: boolean;
};

type PlanTitle = {
  tier1: string;
  tier2: string;
  tier3: string;
};

interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  amount: number;
  date: string;
  status: string;
  // Add other properties if needed
}

const planTitle: PlanTitle = {
  tier1: "Régulier",
  tier2: "Premium",
  tier3: "Ultime",
};

// Exemples -> Fetch the last two transactions (nom, date, amount, isPositive)
const activities: Activity[] = [
  { name: "Zara", date: "02/03/24", amount: "-$136.45", isPositive: false },
  { name: "Interac", date: "01/13/24", amount: "$750.00", isPositive: true },
];

// export default function UserPanel({ firstname, lastname, plan }: UserProps) {
export default function UserPanel() {
  const { user, setUser } = useUserContext();
  const sendForm = useForm();
  const requestForm = useForm();
  const baseUrl = "http://127.0.0.1:8000";

  const [isTransactionSent, setTransaction] = useState(false);

  const submission = (data: FieldValues) => {
    // Log the data being sent
    console.log("Data being sent:", {
      sender: data.sender,
      receiver: data.receiver,
      amount: parseFloat(data.amount),
    });

    AxiosInstance.post(
      "transactions/",
      {
        //  sender: data.sender,
        //push dans cette diag aussi l'email de l'user pour envoyer
        sender: user.email,
        receiver: data.receiver,
        amount: parseFloat(data.amount),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        const newTransaction = response.data;
        console.log("Transaction successful:", newTransaction);

        // Update user context
        const updatedUser = {
          ...user,
          balance: user.balance - newTransaction.amount,
          sent_transactions: [...user.sent_transactions, newTransaction],
        };
        setUser(updatedUser);

        toast.success("Les fonds ont été envoyés.");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.error("Les fonds n'ont pas été envoyés.");
      });
  };

  const requestTransfer = (data: FieldValues) => {
    AxiosInstance.post(
      "request/",
      {
        //  sender: data.sender,
        //push dans cette diag aussi l'email de l'user pour envoyer
        sender: data.sender,
        receiver: user.email,
        amount: parseFloat(data.amount),
        // status: "pending",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("Transaction successful:", response.data);
        toast.info("Les fonds ont été demandé.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        // navigate(`/dashboard`);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.error("Les fonds n'ont pas été demandé.");
      });
  };

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

  console.log(user.image_url);

  console.log(user);
  return (
    <>
      <section className="flex h-full w-3/12 flex-col items-center justify-between px-3">
        <div className="flex w-full flex-col items-center gap-3 pt-3">
          {user.image_url ? (
            <img
              src={`${baseUrl}${user.image_url}`}
              alt={`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <CircleUser className="size-16" />
          )}
          <h2 className="text-base">{`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}</h2>
          <h3 className="text-sm">{planTitle[user.plan]}</h3>
          <div className="mt-7 flex w-full items-center justify-around">
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Button variant={"outline"} className="size-14 rounded-full">
                    <FaMoneyBillTransfer className="size-4" />
                  </Button>
                  <p className="mt-2 text-sm">Envoyer</p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={sendForm.handleSubmit(submission)}>
                  <DialogHeader>
                    <DialogTitle>Envoyer des fonds</DialogTitle>
                    <DialogDescription>
                      Veuillez entrer le montant à envoyer, ainsi que le
                      courriel du destinataire.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Montant
                      </Label>
                      <Input
                        id="amount"
                        // onInput={handleInput}
                        defaultValue=""
                        placeholder="$100.00"
                        className="col-span-3"
                        {...sendForm.register("amount", { required: true })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Courriel
                      </Label>
                      <Input
                        id="username"
                        defaultValue=""
                        placeholder="destinataire@email.com"
                        className="col-span-3"
                        {...sendForm.register("receiver", { required: true })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Envoyer</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Button variant={"outline"} className="size-14 rounded-full">
                    <FaHandHoldingDollar className="size-4" />
                  </Button>
                  <p className="mt-2 text-sm">Demander</p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={requestForm.handleSubmit(requestTransfer)}>
                  <DialogHeader>
                    <DialogTitle>Demander des fonds</DialogTitle>
                    <DialogDescription>
                      Veuillez entrer le montant à demander, ainsi que le
                      courriel du destinataire.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Montant
                      </Label>
                      <Input
                        id="amount"
                        // onInput={handleInput}
                        defaultValue=""
                        placeholder="$100.00"
                        className="col-span-3"
                        {...requestForm.register("amount", { required: true })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Courriel
                      </Label>
                      <Input
                        id="sender"
                        defaultValue=""
                        placeholder="destinataire@email.com"
                        className="col-span-3"
                        {...requestForm.register("sender", { required: true })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Envoyer</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Button variant={"outline"} className="size-14 rounded-full">
                    <GiPayMoney className="size-4" />
                  </Button>
                  <p className="mt-2 text-sm">Déposer</p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={requestForm.handleSubmit(requestTransfer)}>
                  <DialogHeader>
                    <DialogTitle>Déposer des fonds</DialogTitle>
                    <DialogDescription>
                      Veuillez entrer le montant à déposer.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Montant
                      </Label>
                      <Input
                        id="amount"
                        defaultValue=""
                        placeholder="$100.00"
                        className="col-span-3"
                        {...requestForm.register("amount", { required: true })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Déposer</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative my-4 hidden lg:block">
          <img
            src={
              user.plan === "tier1"
                ? Tier1VisaH
                : user.plan === "tier2"
                  ? Tier2VisaH
                  : Tier3VisaH
            }
            alt="Image of the user's bank card"
            draggable="false"
            className="p-3"
          />
          <p className="absolute bottom-[2.3vw] left-[2.3vw] text-[1.1vw] font-medium text-white">
            {capitalize(user.first_name)} {capitalize(user.last_name)}
          </p>
        </div>
        <div className="relative my-4 lg:hidden">
          <img
            src={
              user.plan === "tier1"
                ? Tier1VisaV
                : user.plan === "tier2"
                  ? Tier2VisaV
                  : Tier3VisaV
            }
            alt="Image of the user's bank card"
            draggable="false"
            className="p-3"
          />
        </div>

        <div className="mb-5 w-full">
          <h2 className="font-semibold">Activités récentes</h2>
          <div className="space-y-2 rounded-lg border p-2 shadow">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-base">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <p
                  className={`font-medium ${activity.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {activity.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
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
      </section>
      <Toaster richColors />
    </>
  );
}
