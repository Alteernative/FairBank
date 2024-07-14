import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [position, setPosition] = useState("top")

  const navigate = useNavigate();

  // FIXME: Auth is true, when user logs out from dashboard
  console.log(isAuthenticated);
  useEffect(() => {
    const token = localStorage.getItem("Token");

    console.log(token);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logoutUser = () => {
    console.log("we clicked logout");
    AxiosInstance.post(`logoutall/`, {}).then(() => {
      setIsAuthenticated(false);
      localStorage.removeItem("Token");
      navigate("/");
      console.log("Log out successfull");
    });
  };

  return (
    <header className="mt-7 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        {/* <img className="w-10" src="/logo_no_bg.png" alt="Logo du site" />
          <h1 className="text-2xl font-bold font-sans">FairBank</h1> */}
        <h1 className="font-jomhuria text-6xl text-primary">FairBank</h1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Link
              to="/particuliers"
              className="duration-250 font-semibold text-primary transition-all hover:text-primary/50"
            >
              Particuliers
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/services"
              className="duration-250 font-semibold text-primary transition-all hover:text-primary/50"
            >
              Services
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/apropos"
              className="duration-250 font-semibold text-primary transition-all hover:text-primary/50"
            >
              À Propos
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              to="/faq"
              className="duration-250 font-semibold text-primary transition-all hover:text-primary/50"
            >
              FAQ
            </Link>
          </NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Français</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Changer la langue:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Français</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Anglais</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <Button
              variant={"ghost"}
              className="rounded-3xl font-semibold hover:bg-primary/10"
            >
              <Link to={"/dashboard"}>Tableau de bord</Link>
            </Button>
            <Button
              variant={"default"}
              className="ms-2 rounded-3xl"
              onClick={logoutUser}
            >
              Déconnecter
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={"ghost"}
              className="rounded-3xl font-semibold hover:bg-primary/10"
            >
              <Link to={"/connexion"}>Se connecter</Link>
            </Button>
            <Button variant={"default"} className="ms-2 rounded-3xl">
              <Link to={"/inscription"}>Devenir membre</Link>
            </Button>
          </>
        )}
        {/* <Button variant={"outline"} className="bg-transparent text-black border-black hover:bg-transparent rounded-3xl text-primary font-semibold hover:text-primary/90 transition-all duration-250">S'incrire</Button> */}
        {/* <Button variant={"outline"} className="bg-transparent text-primary border-primary rounded-3xl font-semibold transition-all duration-250 hover:bg-primary/10">Se connecter</Button> */}
      </div>
    </header>
  );
}
