import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Unsubscribe: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(userId);
    if (userId) {
      AxiosInstance.post("unsubscribe/unsubscribe/", {
        id: userId,
      })
        .then((response) => {
          console.log(response);
          toast.success(`${t("toast.unsubscribe.success")}`);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          toast.error(`${t("toast.unsubscribe.error")}`);
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
