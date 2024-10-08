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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./ModeToggle";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
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
    <header className="mt-7 flex items-baseline justify-between">
      <Link to="/" className="flex items-center">
        <h1 className="font-jomhuria text-6xl text-primary">FairBank</h1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="hidden gap-5 lg:flex">
          <NavigationMenuItem asChild>
            <Link
              to="/plans"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              {t("header.plans")}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to="/services"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              {t("header.services")}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to="/about-us"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              {t("header.aboutUs")}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem asChild>
            <Link
              to="/faq"
              className="duration-250 font-semibold transition-all hover:text-primary/70"
            >
              {t("header.faq")}
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

      {/* Responsive hearder */}
      <div className="flex gap-4 lg:hidden">
        <span className="flex items-end justify-start gap-2">
          <LanguageToggle />
          <ModeToggle />
        </span>
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex min-h-screen flex-col">
            <SheetHeader className="hidden">
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <nav className="mt-20 flex flex-col items-start justify-start gap-10 text-xl font-medium">
              <SheetClose asChild>
                <Link to="/plans" className="hover:underline">
                  {t("header.plans")}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/services" className="hover:underline">
                  {t("header.services")}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/about-us" className="hover:underline">
                  {t("header.aboutUs")}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/faq" className="hover:underline">
                  {t("header.faq")}
                </Link>
              </SheetClose>
            </nav>
            <HeaderButtons
              isAuthenticated={isAuthenticated}
              logoutUser={logoutUser}
              className="mt-auto flex items-center justify-center gap-5"
            />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
