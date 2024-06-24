import { Button } from "@/components/ui/button";
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
          <div className="text-center">
            <Button variant={"outline"} className="rounded-full size-14">
              <FaMoneyBillTransfer className="size-4" />
            </Button>
            <p className="text-sm mt-2">Envoyer</p>
          </div>
          <div className="text-center">
            <Button variant={"outline"} className="rounded-full size-14">
              <FaHandHoldingDollar className="size-4" />
            </Button>
            <p className="text-sm mt-2">Demander</p>
          </div>
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
        src="/MasterCard1.svg"
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
