import { useUserContext } from "@/contexts/UserContext";
import DashboardGraph from "@/pages/DashboardGraph.tsx";
import CountUp from "react-countup";

export default function DashboardOverview() {
  const { user } = useUserContext();
  //let tmp = user.received_transactions.length;
  return (
    // <main className="border border-green-500 w-7/12 px-10 h-screen">
    <main className="h-full w-7/12 rounded-lg px-10 shadow-lg">
      <h1 className="mb-10 font-jomhuria text-6xl">Overview</h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 rounded-lg border p-4 shadow">
          <h2 className="mb-3 font-bold">Balance</h2>
          <CountUp
            start={0}
            end={user.balance}
            duration={2}
            prefix="$"
            decimals={2}
            className="font-jomhuria text-6xl"
          />
        </div>

        <div className="col-span-1 row-span-1 rounded-lg border p-4 shadow">
          <h2>Graphe ratio des depots et ajouts</h2>
        </div>

        <div className="col-span-2 row-span-3 flex h-full w-full flex-col rounded-lg border p-4 shadow">
          <DashboardGraph />
        </div>

        <div className="col-span-1 row-span-3 rounded-lg border p-4 shadow">
          <h2>Transactions rapide</h2>
        </div>

        <div className="col-span-3 row-span-1 rounded-lg border p-4 shadow">
          <h2>
            Transactions :{" "}
            {user.sent_transactions.length + user.received_transactions.length}
          </h2>
        </div>
      </div>
    </main>
  );
}
