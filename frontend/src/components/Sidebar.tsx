import {
  LayoutDashboard,
  ScrollText,
  Radio,
  CircleHelp,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/components/AxiosInstance";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    console.log("Logout button clicked");
    AxiosInstance.post("logoutall/", {})
      .then(() => {
        localStorage.removeItem("Token");
        setTimeout(() => {
          navigate("/");
        }, 500);
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <aside className="fixed left-0 h-screen py-5 lg:w-60 lg:border-r">
      <div className="hidden h-full w-full flex-col items-center lg:flex">
        <Link to={"/"}>
          <h1 className="font-jomhuria text-6xl">FairBank</h1>
        </Link>

        <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
          {/* Top nav */}
          <div className="flex flex-col gap-5">
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard"}>
                <LayoutDashboard size={20} />
                Menu
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/transactions") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/transactions"}>
                <ScrollText size={20} />
                Historique
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/activity") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/activity"}>
                <Radio size={20} />
                Activité
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/exchange-rates") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/exchange-rates"}>
                <BsCurrencyExchange size={20} />
                Taux de change
              </Link>
            </Button>
          </div>

          {/* Bottom nav*/}
          <div className="flex flex-col gap-5">
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/help") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/help"}>
                <CircleHelp size={20} />
                Aide
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("dashboard/settings") ? "default" : "ghost"}
              className="flex w-full items-center justify-start gap-2"
            >
              <Link to={"/dashboard/settings"}>
                <Settings size={20} />
                Paramètres
              </Link>
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleLogout}
              className="flex w-full items-center justify-start gap-2"
            >
              <LogOut size={20} />
              Se déconnecter
            </Button>
          </div>
        </nav>
      </div>

      {/* Responsive Sidebar */}
      <div className="flex gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="ml-2 mt-2">
              <Menu size={30} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="flex min-h-screen flex-col">
            <SheetHeader className="hidden">
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <div className="flex h-screen w-full flex-col items-start pl-10">
              <Link to={"/"}>
                <h1 className="font-jomhuria text-6xl">FairBank</h1>
              </Link>

              <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
                {/* Top nav */}
                <div className="flex flex-col gap-5">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard"}>
                        <LayoutDashboard size={20} />
                        Menu
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/transactions") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/transactions"}>
                        <ScrollText size={20} />
                        Historique
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/activity") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/activity"}>
                        <Radio size={20} />
                        Activité
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/exchange-rates") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/exchange-rates"}>
                        <BsCurrencyExchange size={20} />
                        Taux de change
                      </Link>
                    </Button>
                  </SheetClose>
                </div>

                {/* Bottom nav*/}
                <div className="flex flex-col gap-5">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/help") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/help"}>
                        <CircleHelp size={20} />
                        Aide
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant={
                        isActive("dashboard/settings") ? "default" : "ghost"
                      }
                      className="flex w-full items-center justify-start gap-2"
                    >
                      <Link to={"/dashboard/settings"}>
                        <Settings size={20} />
                        Paramètres
                      </Link>
                    </Button>
                  </SheetClose>
                  <Button
                    variant={"destructive"}
                    onClick={handleLogout}
                    className="flex w-full items-center justify-start gap-2"
                  >
                    <LogOut size={20} />
                    Se déconnecter
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Option 3 Tooltip Sidebar (Ne pas supprimer)*/}
      {/* <div className="flex h-full w-14 flex-col items-center lg:hidden">
        <nav className="mb-5 mt-10 flex h-full flex-col justify-between">

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/dashboard"}>
                  <LayoutDashboard size={20} />
                  <span className="sr-only">Menu</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Menu</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex flex-col gap-5">
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/transactions") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/transactions"}>
                <ScrollText size={20} />
                Historique
              </Link>
            </Button>
          </div>
        </nav>
      </div> */}
    </aside>
  );
}
