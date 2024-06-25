import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {useUserContext} from "@/components/UserContext.tsx";
import {useEffect, useState} from "react";
import {log10} from "chart.js/helpers";

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
  type: 'received' | 'sent';
};

export default function DashboardGraph() {
  const {user} = useUserContext();
  const [balanceData, setBalanceData] = useState<{ labels: number[], datasets: any[] }>({
    labels: [],
    datasets: []
  });


  useEffect(() => {
    if (user) {

      const transactions: Transaction[] = [
        ...(user.received_transactions ?? []).map(t => ({...t, type: 'received' as const})),
        ...(user.sent_transactions ?? []).map(t => ({...t, type: 'sent' as const}))
      ];

      transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      //  console.log(transactions)
      console.log("the sorted transaction is ", transactions)
      console.log("the user is ", user)
      console.log("the balance is ", user.balance)

      let currentBalance = user.balance;

      const balanceDataLabels: number[] = [];
      const balanceDataPoints: number[] = [];

      balanceDataPoints.push(user.balance);
      balanceDataLabels.push(transactions.length + 1);
      transactions.forEach((transaction, index) => {
        const amount = parseFloat(transaction.amount);
        if (transaction.type === 'received') {
          currentBalance -= amount;
        } else if (transaction.type === 'sent') {
          currentBalance += amount;
        }
        balanceDataLabels.unshift(index + 1);
        balanceDataPoints.unshift(currentBalance);

      });

      setBalanceData({
        labels: balanceDataLabels,
        datasets: [
          {
            label: 'Balance',
            data: balanceDataPoints,
            borderColor: 'rgb(80,189,76)',
            backgroundColor: 'rgba(74,182,69,0.5)',
            tension: 0.4
          }
        ]
      });
    }
  }, [user]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Account Balance After Each Transaction'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Transactions'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Balance Amount'
        }
      }
    }
  };

  console.log(balanceData)
  return (

    <Line options={options} data={balanceData}/>
  );
}
