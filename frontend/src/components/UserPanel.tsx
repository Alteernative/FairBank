import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaMoneyBillTransfer, FaHandHoldingDollar, FaEllipsisVertical } from "react-icons/fa6";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { useUserContext } from "./UserContext";

type Activity = {
  name: string;
  date: string;
  amount: string;
  isPositive: boolean;
};

// Exemples -> Fetch the last two transactions (nom, date, amount, isPositive)
const activities: Activity[] = [
  { name: "Zara", date: "02/03/24", amount: "-$136.45", isPositive: false },
  { name: "Interac", date: "01/13/24", amount: "$750.00", isPositive: true },
];

export default function UserPanel() {
  const { user } = useUserContext();
  const { handleSubmit, register } = useForm();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const submission = (data) => {
    console.log("Data being sent:", {
      sender: data.sender,
      receiver: data.receiver,
      amount: parseFloat(data.amount),
    });

    AxiosInstance.post(
      "transactions/",
      {
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
        console.log("Transaction successful:", response.data);
        setNotification("Transaction envoyée avec succès!");
        setDialogOpen(false); // Fermer boite envoi
        setTimeout(() => {
          setNotification("")
          window.location.reload()
        }, 500); // 2 sec pour clear message

      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <section className="w-3/12 flex items-center flex-col px-3 justify-between h-full">
      <div className="flex flex-col items-center gap-3 pt-3 w-full">
        <img
          src="https://placehold.co/100"
          alt="User Profile Image"
          className="rounded-full size-20"
        />
        <h2 className="text-base">{`${user.first_name} ${user.last_name}`}</h2>
        <h3 className="text-sm">{user.plan}</h3>

        <div className="flex mt-7 items-center justify-around w-full">
          <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <Button variant={"outline"} className="rounded-full size-14">
                <FaMoneyBillTransfer className="size-4" />
              </Button>
              <p className="text-sm mt-2">Envoyer</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(submission)}>
                <DialogHeader>
                  <DialogTitle>Envoyer des fonds</DialogTitle>
                  <DialogDescription>
                    Veuillez entrer le montant à envoyer, ainsi que le courriel du destinataire.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Montant
                    </Label>
                    <Input
                      id="amount"
                      defaultValue=""
                      placeholder="$100.00"
                      className="col-span-3"
                      {...register("amount", { required: true })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="receiver" className="text-right">
                      Courriel
                    </Label>
                    <Input
                      id="receiver"
                      defaultValue=""
                      placeholder="destinataire@email.com"
                      className="col-span-3"
                      {...register("receiver", { required: true })}
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
            <DialogTrigger>
              <Button variant={"outline"} className="rounded-full size-14">
                <FaHandHoldingDollar className="size-4" />
              </Button>
              <p className="text-sm mt-2">Demander</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Demander des fonds</DialogTitle>
                <DialogDescription>
                  Veuillez entrer le montant à demander, ainsi que le courriel du destinataire.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Montant
                  </Label>
                  <Input
                    id="amount"
                    defaultValue=""
                    placeholder="$100.00"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="receiver" className="text-right">
                    Courriel
                  </Label>
                  <Input
                    id="receiver"
                    defaultValue=""
                    placeholder="destinataire@email.com"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Demander</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="text-center">
            <Link to={"/user/settings"}>
              <Button variant={"outline"} className="rounded-full size-14">
                <FaEllipsisVertical className="size-4" />
              </Button>
            </Link>
            <p className="text-sm mt-2">Autres</p>
          </div>
        </div>
      </div> 
      
      {notification && (
        <div className="w-full p-4 mb-4 text-green-800 bg-green-200 rounded">
          {notification}
        </div>
      )}

      <img
        src="/cards/regular/1/MasterCard.svg"
        alt="Image of the user's bank card"
        className="p-5"
      />

      <div className="w-full mb-5">
        <h2 className="font-semibold">Activités récentes</h2>
        <div className="space-y-2 p-2 bg-white rounded-lg shadow">
          {activities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center">
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
    </section>
  );
}
