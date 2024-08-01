import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AxiosInstance from "@/components/AxiosInstance.tsx";

const ActiveAccountsChart: React.FC = () => {
  const [activeCount, setActiveCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(
        "dashboard_admin/list_all_users/"
      );
      if (Array.isArray(response.data)) {
        // Filter only users with is_active tag
        const activeUsers = response.data.filter((user: any) => user.is_active);
        setActiveCount(activeUsers.length);
      } else {
        setError("Invalid data format: Expected an array");
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Total Comptes Actifs</CardTitle>
          {activeCount}
        </div>
      </CardHeader>
    </Card>
  );
};

export default ActiveAccountsChart;
