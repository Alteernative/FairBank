import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useUserContext } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";
import formatDate from "@/utils/formatDate"; // Adjust the import path according to your project structure
import { FaFileDownload } from "react-icons/fa";
// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Transaction = {
  id: number;
  sender: string;
  receiver: string;
  amount: string;
  date: string;
  type: "received" | "sent";
};

export default function DashboardGraph() {
  const { user } = useUserContext();
  const [balanceData, setBalanceData] = useState<{
    labels: number[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });
  const [JsonObj, setJsonObj] = useState<string>("");

  // TODO: Does not update the graph dynamically :
  useEffect(() => {
    if (user) {
      const transactions: Transaction[] = [
        ...(user.received_transactions ?? []).map((t) => ({
          ...t,
          type: "received" as const,
          date: formatDate(t.date),
        })),
        ...(user.sent_transactions ?? []).map((t) => ({
          ...t,
          type: "sent" as const,
          date: formatDate(t.date),
        })),
      ];

      transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      let currentBalance = user.balance;

      const balanceDataLabels: number[] = [];
      const balanceDataPoints: number[] = [];

      balanceDataPoints.push(user.balance);
      balanceDataLabels.push(0);
      transactions.forEach((transaction, index) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === "received") {
          currentBalance -= amount;
        } else if (transaction.type === "sent") {
          currentBalance += amount;
        }
        balanceDataLabels.unshift(index + 1);
        balanceDataPoints.unshift(currentBalance);
      });
      balanceDataLabels.reverse();
      setBalanceData({
        labels: balanceDataLabels,
        datasets: [
          {
            label: "Balance",
            data: balanceDataPoints,
            borderColor: "rgb(80,189,76)",
            backgroundColor: "rgba(74,182,69,0.5)",
            tension: 0.4,
          },
        ],
      });

      const transactionsWithoutType = transactions.map(
        ({ type, ...rest }) => rest
      );

      const transactionsForCsv = transactionsWithoutType.map((transaction) => ({
        ...transaction,
        amount: transaction.amount + "$",
      }));
      const additionalData = {
        user_id: user.id,
        user_name: user.name,
        transactions: transactionsForCsv,
        transactionCount: transactions.length,
      };
      const formattedJsonObj = JSON.stringify(additionalData, null, 2);
      const header = "User Transactions Data\n";
      setJsonObj(header + formattedJsonObj);
      console.log(JsonObj);
    }
  }, [user]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Graphe de la balance",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Transactions",
        },
      },
      y: {
        title: {
          display: true,
          text: "Balance",
        },
      },
    },
  };

  // console.log(balanceData)
  return (
    <>
      <div className="my-4 flex flex-row ">
        <CSVLink
          filename={"Historiquetransactions.csv"}
          data={JsonObj}
          className="hover:bg-green-600-600 flex items-center rounded-md bg-green-500 px-4 py-2 text-white transition-colors duration-300"
        >
          <FaFileDownload className="mr-2" />
          <span>Telecharger</span>
        </CSVLink>
      </div>
      <div className="h-full w-full flex-grow">
        <Line options={options} data={balanceData} className="h-full w-full" />
      </div>
    </>
  );
}
