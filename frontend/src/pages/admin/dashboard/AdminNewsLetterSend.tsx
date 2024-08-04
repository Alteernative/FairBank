import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Newspaper } from "lucide-react";

const AdminNewsLetterSend = () => {
  const envoyerCourriels = async () => {
    try {
      await AxiosInstance.get("dashboard_admin/send_newsLetter/");
    } catch (err: any) {
      console.error("Error fetching data: " + err.message);
    }
  };

  return (
    <Card className="aspect-auto h-[125px] w-full xl:h-[150px]">
      <CardHeader className="text-center">
        <CardTitle>Envoyer les Newsletters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center ">
        <Button className="w-32" onClick={envoyerCourriels}>
          <span className="flex items-center justify-center gap-4">
            <Newspaper size={20} />
            Envoyer
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminNewsLetterSend;
