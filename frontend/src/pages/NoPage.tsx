import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NoPage() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        src="/images/404.svg"
        alt="404 image"
        className="w-9/12 xl:w-[1000px]"
      ></img>
      <Button
        asChild
        variant={"secondary"}
        className="mt-8
       rounded-3xl"
      >
        <Link to="/">{t("buttons.returnHome")}</Link>
      </Button>
    </div>
  );
}
