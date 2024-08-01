import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { toast } from "sonner";

const Unsubscribe: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userId);
    if (userId) {
      AxiosInstance.post("unsubscribe/unsubscribe/", {
        id: userId,
      })
        .then((response) => {
          console.log(response);
          toast.success("Unsubscribed successfully.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          toast.error("There was an error processing your request.");
        });
    }
  }, [userId]);

  return (
    <div>
      <h1>Unsubscribe Confirmation</h1>
      <p>Your unsubscription has been processed successfully.</p>
    </div>
  );
};

export default Unsubscribe;
