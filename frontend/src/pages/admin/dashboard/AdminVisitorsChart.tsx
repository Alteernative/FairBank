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
    <Card className="aspect-auto h-[150px] w-full xl:h-[175px]">
      <CardHeader className="py-4 pb-0 text-center xl:pb-4">
        <CardTitle>Comptes Actifs</CardTitle>
        <CardDescription>
          Nombre d'utilisateurs actifs chez FairBank
        </CardDescription>
      </CardHeader>
      <CardContent className="h-30 flex items-center justify-center">
        <span className="font-jomhuria text-6xl md:text-8xl">
          {activeCount}
        </span>
      </CardContent>
    </Card>
  );
};

export default ActiveAccountsChart;
