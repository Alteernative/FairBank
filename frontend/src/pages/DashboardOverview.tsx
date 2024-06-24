import formatCurrency from "@/utils/formatCurrency.ts";
import { useUserContext } from "@/components/UserContext";

export default function DashboardOverview() {
  const { user } = useUserContext();

  return (
    // <main className="border border-green-500 w-7/12 px-10 h-screen">
    <main className="w-7/12 px-10 shadow-lg rounded-lg h-full">
      <h1 className="text-6xl font-jomhuria mb-10">Overview</h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 bg-white p-4 shadow rounded-lg">
          <h2>Balance: {formatCurrency(user.balance)}</h2>
        </div>

        <div className="col-span-1 row-span-1 bg-white p-4 shadow rounded-lg">
          <h2>Credit Score/Graph</h2>
        </div>

        <div className="col-span-2 row-span-3 bg-white p-4 shadow rounded-lg">
          <h2>Balance Graph</h2>
        </div>

        <div className="col-span-1 row-span-3 bg-white p-4 shadow rounded-lg">
          <h2>Quick Transactions</h2>
        </div>

        <div className="col-span-3 row-span-1 bg-white p-4 shadow rounded-lg">
          {/* 200 -> Nombre total de transactions du client */}
          {/* <h2>Transactions {totalTransaction}</p> */}
          <h2>Transactions 200</h2>
        </div>
      </div>
    </main>
  );
}
