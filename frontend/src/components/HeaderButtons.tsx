import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

type HeaderButtonsProps = {
  isAuthenticated: boolean;
  logoutUser: () => void;
  className?: string;
};

export const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  isAuthenticated,
  logoutUser,
  className,
}: HeaderButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-2 sm:flex-row ",
        className
      )}
    >
      {isAuthenticated ? (
        <>
          <Button
            asChild
            variant={"ghost"}
            className="w-full rounded-3xl font-semibold"
          >
            <Link to={"/dashboard"}>{t("buttons.dashboard")}</Link>
          </Button>
          <Button
            variant={"destructive"}
            className="flex w-full items-center gap-2 rounded-3xl"
            onClick={logoutUser}
          >
            <LogOut size={20} />
            {t("buttons.signOut")}
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            variant={"ghost"}
            className="w-full rounded-3xl font-semibold"
          >
            <Link to={"/signin"}>{t("buttons.signIn")}</Link>
          </Button>
          <Button asChild className="w-full rounded-3xl">
            <Link to={"/signup"}>{t("buttons.signUp")}</Link>
          </Button>
        </>
      )}
    </div>
  );
};
