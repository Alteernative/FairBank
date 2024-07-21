import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
            className="rounded-3xl"
            onClick={logoutUser}
          >
            Déconnecter
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            variant={"ghost"}
            className="rounded-3xl font-semibold"
          >
            <Link to={"/connexion"}>Se connecter</Link>
          </Button>
          <Button asChild className="rounded-3xl">
            <Link to={"/inscription"}>Devenir membre</Link>
          </Button>
        </>
      )}
    </div>
  );
};
