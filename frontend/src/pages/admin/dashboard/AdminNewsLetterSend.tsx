import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { Button } from "@/components/ui/button.tsx";

const AdminNewsLetterSend: React.FC = () => {
  const [activeCount, setActiveCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const envoyerCourriels = async () => {
    try {
      await AxiosInstance.get(
        "dashboard_admin/send_newsLetter/",
      );
    } catch (err) {
      setError("Error fetching data: " + err.message);
    }
  };

  return (
    <Card className="mb-2">
      <CardHeader className="text-center">
        <CardTitle>Envoyer les Newsletter</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-11 ">
        <Button onClick={envoyerCourriels}>Envoyer</Button>
      </CardContent>
    </Card>
  );
};

export default AdminNewsLetterSend;
