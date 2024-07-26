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
import { CircleUser, Send, HandCoins, DollarSign } from "lucide-react";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { FieldValues, useForm } from "react-hook-form";
import { useUserContext } from "@/contexts/UserContext";
import { Toaster, toast } from "sonner";
import Tier1VisaH from "../assets/images/cards/horizontal/tier1/1/Visa.svg";
import Tier2VisaH from "../assets/images/cards/horizontal/tier2/2/Visa.svg";
import Tier3VisaH from "../assets/images/cards/horizontal/tier3/4/Visa.svg";
import Tier1VisaV from "../assets/images/cards/vertical/tier1/1/Visa.svg";
import Tier2VisaV from "../assets/images/cards/vertical/tier2/2/Visa.svg";
import Tier3VisaV from "../assets/images/cards/vertical/tier3/4/Visa.svg";
import capitalize from "@/utils/capitalize";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
// import formatDate from "@/utils/formatDate.ts";
// import { Link } from "react-router-dom";
// import formatCurrency from "@/utils/formatCurrency";

type Activity = {
  name: string;
  date: string;
  amount: string;
  isPositive: boolean;
};

type PlanTitle = {
  tier1: string;
  tier2: string;
  tier3: string;
};

// interface Transaction {
//   id: number;
//   sender: string;
//   receiver: string;
//   amount: number;
//   date: string;
//   status: string;
//   // Add other properties if needed
// }

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

export default function UserPanel() {
  const { user, setUser } = useUserContext();
  const sendForm = useForm();
  const requestForm = useForm();
  const depositForm = useForm(); // New form for deposit
  const baseUrl = "http://127.0.0.1:8000";

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

        // window.location.reload();
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
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        // navigate(`/dashboard`);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        toast.error("Les fonds n'ont pas été demandé.");
      });
  };

  const deposer = (data: FieldValues) => {
    AxiosInstance.post(
      `users/add_balance/`,
      { amount: parseFloat(data.amount) },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        console.log("Data amount:" + data.amount);
        const updatedUser = {
          ...user,
          balance: user.balance + parseFloat(data.amount),
        };
        setUser(updatedUser);
        toast.success("Le montant a été déposé dans votre compte.");
      })
      .catch((error) => {
        toast.error("Une erreur est survenu lors du dépôt.");
      });
  };

  // DEBUG: Remove
  console.log(user.image_url);
  console.log(user);
  return (
    <>
      <aside className="fixed right-0 hidden h-screen w-72 flex-col items-center justify-between px-3 py-5 lg:flex lg:border-l">
        <div className="flex w-full flex-col items-center gap-3">
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
          <Badge
            className={`cursor-default rounded-full shadow ${user.plan === "tier1" ? "bg-green-500 hover:bg-green-500" : user.plan === "tier2" ? "bg-gray-500 hover:bg-gray-500" : "bg-yellow-500 hover:bg-yellow-500"}`}
          >
            {planTitle[user.plan]}
          </Badge>
          <div className="mt-7 flex w-full items-center justify-around">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center">
                  <Button variant={"outline"} className="size-14 rounded-full">
                    <Send size={20} />
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
                        defaultValue=""
                        placeholder="$100.00"
                        autoComplete="off"
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
                <div className="flex flex-col items-center">
                  <Button variant={"outline"} className="size-14 rounded-full">
                    <HandCoins size={20} />
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
                        defaultValue=""
                        placeholder="$100.00"
                        autoComplete="off"
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
                      <Button type="submit">Demander</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex flex-col items-center">
                  <Button variant={"outline"} className="size-14 rounded-full">
                    <DollarSign size={20} />
                  </Button>
                  <p className="mt-2 text-sm">Déposer</p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={depositForm.handleSubmit(deposer)}>
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
                        autoComplete="off"
                        className="col-span-3"
                        {...depositForm.register("amount", { required: true })}
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
          <p className="absolute bottom-[1.75rem] right-[10rem] select-none text-base font-medium text-white">
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
      </aside>

      <aside className="fixed right-0 h-screen w-14 border-l py-5 lg:w-72">
        <div className="flex h-full w-full flex-col items-center lg:hidden">
          {user.image_url ? (
            <img
              src={`${baseUrl}${user.image_url}`}
              alt={`${capitalize(user.first_name)} ${capitalize(user.last_name)}`}
              className="mt-2 size-10 cursor-pointer rounded-full"
            />
          ) : (
            <CircleUser className="mt-2 size-10 cursor-pointer" />
          )}
          <nav className="mb-5 mt-[4.5rem] flex h-full flex-col items-center justify-between">
            <TooltipProvider>
              <div className="flex flex-col items-center gap-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <Send size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-11/12 rounded-xl sm:max-w-[425px]">
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
                                defaultValue=""
                                placeholder="$100.00"
                                autoComplete="off"
                                className="col-span-3"
                                {...sendForm.register("amount", {
                                  required: true,
                                })}
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
                                {...sendForm.register("receiver", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <DialogFooter className="flex flex-row justify-end">
                            <DialogClose asChild>
                              <Button type="submit">Envoyer</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent side="left">Envoyer</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <HandCoins size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-11/12 rounded-xl sm:max-w-[425px]">
                        <form
                          onSubmit={requestForm.handleSubmit(requestTransfer)}
                        >
                          <DialogHeader>
                            <DialogTitle>Demander des fonds</DialogTitle>
                            <DialogDescription>
                              Veuillez entrer le montant à demander, ainsi que
                              le courriel du destinataire.
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
                                autoComplete="off"
                                className="col-span-3"
                                {...requestForm.register("amount", {
                                  required: true,
                                })}
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
                                {...requestForm.register("sender", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <DialogFooter className="flex flex-row justify-end">
                            <DialogClose asChild>
                              <Button type="submit">Demander</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent side="left">Demander</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <DollarSign size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-11/12 rounded-xl sm:max-w-[425px]">
                        <form onSubmit={depositForm.handleSubmit(deposer)}>
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
                                autoComplete="off"
                                className="col-span-3"
                                {...depositForm.register("amount", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <DialogFooter className="flex flex-row justify-end">
                            <DialogClose asChild>
                              <Button type="submit">Déposer</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent side="left">Déposer</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex flex-col items-center gap-10"></div>
            </TooltipProvider>
          </nav>
        </div>
      </aside>
      <Toaster richColors />
    </>
  );
}
