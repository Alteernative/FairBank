import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { HeaderButtons } from "./HeaderButtons";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        <h1 className="font-jomhuria text-6xl text-primary">FairBank</h1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="hidden gap-5 lg:flex">
          <NavigationMenuItem asChild>
            <Link
              to="/particuliers"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              Plans
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to="/services"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              Services
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to="/apropos"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              À Propos
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to="/faq"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              FAQ
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <HeaderButtons
        isAuthenticated={isAuthenticated}
        signoutUser={logoutUser}
      />
    </header>
  );
}
