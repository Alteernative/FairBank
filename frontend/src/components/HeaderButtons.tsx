import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

type HeaderButtons = {
  isAuthenticated: boolean;
  signoutUser: () => void;
};

export const HeaderButtons = ({
  isAuthenticated,
  signoutUser,
}: HeaderButtons) => {
  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      {isAuthenticated ? (
        <div>
          <Button
            asChild
            variant={"ghost"}
            className="rounded-3xl font-semibold"
          >
            <Link to={"/dashboard"}>Tableau de bord</Link>
          </Button>
          <Button asChild className="rounded-3xl" onClick={signoutUser}>
            Déconnecter
          </Button>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};
