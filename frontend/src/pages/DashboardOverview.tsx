import formatCurrency from "@/utils/formatCurrency.ts";
import { useUserContext } from "@/components/UserContext";
import DashboardGraph from "@/pages/DashboardGraph.tsx";
import CountUp from "react-countup";

export default function DashboardOverview() {
  const { user } = useUserContext();
  //let tmp = user.received_transactions.length;
  return (
    // <main className="border border-green-500 w-7/12 px-10 h-screen">
    <main className="w-7/12 px-10 shadow-lg rounded-lg h-full">
      <h1 className="text-6xl font-jomhuria mb-10">Overview</h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 bg-white p-4 shadow rounded-lg">
          <h2 className="font-bold mb-3">Balance</h2>
          {/* <h3 className={'text-4xl'}>{formatCurrency(user.balance)}</h3> */}
          <CountUp
            end={user.balance}
            // end={1509815.56}
            duration={3}
            prefix="$"
            decimals={2}
            className="font-jomhuria text-6xl"
          />
        </div>

        <div className="col-span-1 row-span-1 bg-white p-4 shadow rounded-lg">
          <h2>Graphe ratio des depots et ajouts</h2>
        </div>

        <div className="col-span-2 row-span-3 bg-white p-4 shadow rounded-lg w-full h-full">
          <DashboardGraph />
        </div>

        <div className="col-span-1 row-span-3 bg-white p-4 shadow rounded-lg">
          <h2>Transactions rapide</h2>
        </div>

        <div className="col-span-3 row-span-1 bg-white p-4 shadow rounded-lg">
          {/* 200 -> Nombre total de transactions du client */}
          {/* <h2>Transactions {totalTransaction}</p> */}
          <h2>
            Transactions :{" "}
            {user.sent_transactions.length + user.received_transactions.length}
          </h2>
        </div>
      </div>
    </main>
  );
}
