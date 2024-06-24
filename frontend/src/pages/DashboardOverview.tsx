import AxiosInstance from "../components/AxiosInstance.tsx";
import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [userData, setUserData] = useState([]);

  const fetchUserData = () => {
    AxiosInstance.get("users/")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    // <main className="border border-green-500 w-7/12 px-10 h-screen">
    <main className="w-7/12 px-10 h-screen shadow-lg rounded-lg">
      <h1 className="text-6xl font-jomhuria mb-10">Overview</h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-1 bg-white p-4 shadow rounded-lg">
          <h2>Balance: {userData.balance}</h2>
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
