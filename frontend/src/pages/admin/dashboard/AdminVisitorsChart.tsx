import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AxiosInstance from "@/components/AxiosInstance.tsx";

const ActiveAccountsChart = () => {
  const [activeCount, setActiveCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(
          "dashboard_admin/list_all_users/"
        );
        if (Array.isArray(response.data)) {
          const activeUsers = response.data.filter(
            (user: any) => user.is_active
          );
          setActiveCount(activeUsers.length);
        } else {
          setError("Invalid data format: Expected an array");
        }
      } catch (err: any) {
        setError("Error fetching data: " + err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  return (
    <Card className="h-1/2">
      <CardHeader className="text-center">
        <CardTitle>Comptes Actifs</CardTitle>
        <CardDescription>
          Nombre d'utilisateurs actifs chez FairBank
        </CardDescription>
      </CardHeader>
      <CardContent className="h-30 flex items-center justify-center">
        <span className="font-jomhuria text-7xl sm:text-8xl md:text-9xl">
          {activeCount}
        </span>
      </CardContent>
    </Card>
  );
};

export default ActiveAccountsChart;
