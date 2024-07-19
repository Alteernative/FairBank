import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { HeaderButtons } from "./HeaderButtons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./ModeToggle";

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
      <div className="flex gap-2">
        <span className="hidden gap-2 lg:flex">
          <LanguageToggle />
          <ModeToggle />
        </span>
        <HeaderButtons
          isAuthenticated={isAuthenticated}
          logoutUser={logoutUser}
          className="hidden lg:flex"
        />
      </div>
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button size={"icon"} variant={"ghost"}>
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex min-h-screen flex-col">
          <nav className="mt-20 flex flex-col items-start justify-start gap-10 text-xl font-medium">
            <SheetClose asChild>
              <Link to="/particuliers" className="hover:underline">
                Plans
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/apropos" className="hover:underline">
                À Propos
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </SheetClose>
            {/* </SheetClose> */}
          </nav>
          <HeaderButtons
            isAuthenticated={isAuthenticated}
            logoutUser={logoutUser}
            className="mt-20 flex items-center justify-center gap-5"
          />
          <span className="mt-auto flex items-end justify-start gap-2">
            <LanguageToggle />
            <ModeToggle />
          </span>
        </SheetContent>
      </Sheet>
    </header>
  );
}
