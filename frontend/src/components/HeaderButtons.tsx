import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LogIn, LogOut } from "lucide-react";

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
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {isAuthenticated ? (
        <>
          <Button
            asChild
            variant={"ghost"}
            className="rounded-3xl font-semibold"
          >
            <Link to={"/dashboard"}>Tableau de bord</Link>
          </Button>
          <Button
            variant={"destructive"}
            className="flex items-center justify-start gap-2 rounded-3xl"
            onClick={logoutUser}
          >
            <LogOut size={20} />
            Se déconnecter
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            variant={"ghost"}
            className="rounded-3xl font-semibold"
          >
            <Link
              to={"/connexion"}
              className="flex items-center justify-start gap-2"
            >
              <LogIn size={20} />
              Se connecter
            </Link>
          </Button>
          <Button asChild className="rounded-3xl">
            <Link to={"/inscription"}>Devenir membre</Link>
          </Button>
        </>
      )}
    </div>
  );
};
