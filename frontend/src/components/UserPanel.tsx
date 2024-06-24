import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
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

type Activity = {
  name: string;
  date: string;
  amount: string;
  isPositive: boolean;
};

// Exemples -> Fetch les deux denrnieres transactions (nom, date, amount, isPositive)
const activities: Activity[] = [
  { name: "Zara", date: "02/03/24", amount: "-$136.45", isPositive: false },
  { name: "Interac", date: "01/13/24", amount: "$750.00", isPositive: true },
];

export default function UserPanel() {
  return (
    // <section className="border border-cyan-500 w-3/12 flex items-center flex-col px-3 justify-between">
    <section className="w-3/12 flex items-center flex-col px-3 justify-between h-screen">
      <div className="flex flex-col items-center gap-3 pt-3 w-full">
        <img
          src="https://placehold.co/100"
          alt="User Profile Image"
          className="rounded-full size-20"
        />
        {/* Replace Name and Plan with props: {user_name}, {user_plan} */}
        <h2 className="text-base">Name</h2>
        <h3 className="text-sm">Plan</h3>

        <div className="flex mt-7 items-center justify-around w-full">
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"} className="rounded-full size-14">
                <FaMoneyBillTransfer className="size-4" />
              </Button>
              <p className="text-sm mt-2">Envoyer</p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Envoyer des fonds</DialogTitle>
                <DialogDescription>
                  Veuillez entrer le montant à envoyer, ainsi que le courriel du
                  destinataire.
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
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Envoyer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <div className="text-center">
            <Button variant={"outline"} className="rounded-full size-14">
              <FaMoneyBillTransfer className="size-4" />
            </Button>
            <p className="text-sm mt-2">Envoyer</p>
          </div> */}

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
                  Veuillez entrer le montant à demander, ainsi que le courriel
                  du destinataire.
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
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Demander</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <div className="text-center">
            <Button variant={"outline"} className="rounded-full size-14">
              <FaHandHoldingDollar className="size-4" />
            </Button>
            <p className="text-sm mt-2">Demander</p>
          </div> */}

          <div className="text-center">
            <Button variant={"outline"} className="rounded-full size-14">
              <FaEllipsisVertical className="size-4" />
            </Button>
            <p className="text-sm mt-2">Autres</p>
          </div>
        </div>
      </div>

      <img
        // src="/MasterCard1.svg"
        src="/cards/regular/1/Visa.svg"
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
