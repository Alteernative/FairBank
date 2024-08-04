import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { Button } from "@/components/ui/button.tsx";

const AdminNewsLetterSend = () => {
  const envoyerCourriels = async () => {
    try {
      await AxiosInstance.get("dashboard_admin/send_newsLetter/");
    } catch (err: any) {
      console.error("Error fetching data: " + err.message);
    }
  };

  return (
    <Card className="mb-2 h-full lg:h-1/4">
      <CardHeader className="text-center">
        <CardTitle>Envoyer les Newsletter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center ">
        <Button onClick={envoyerCourriels}>Envoyer</Button>
      </CardContent>
    </Card>
  );
};

export default AdminNewsLetterSend;
