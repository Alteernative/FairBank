import {
  LayoutDashboard,
  ScrollText,
  Radio,
  CircleHelp,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/components/AxiosInstance";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <aside className="fixed left-0 h-screen w-14 border-r py-5 lg:w-52">
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
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard"}>
                <LayoutDashboard size={20} />
                {t("sidebar.dashboard")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/transactions") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/transactions"}>
                <ScrollText size={20} />
                {t("sidebar.transaction")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/activity") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/activity"}>
                <Radio size={20} />
                {t("sidebar.activity")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/exchange-rates") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/exchange-rates"}>
                <BsCurrencyExchange size={20} />
                {t("sidebar.exchangeRate")}
              </Link>
            </Button>
          </div>

          {/* Bottom nav*/}
          <div className="flex flex-col gap-5">
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/help") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/help"}>
                <CircleHelp size={20} />
                {t("sidebar.help")}
              </Link>
            </Button>
            <Button
              asChild
              variant={"ghost"}
              className={
                "flex w-full items-center justify-start gap-2 hover:bg-transparent hover:underline"
              }
            >
              <Link to={"/dashboard/settings"}>
                <Settings size={20} />
                {t("sidebar.settings")}
              </Link>
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleLogout}
              className="flex w-full items-center justify-start gap-2"
            >
              <LogOut size={20} />
              {t("buttons.signOut")}
            </Button>
          </div>
        </nav>
      </div>

      {/* Responsive nav */}
      <div className="flex h-full w-full flex-col items-center lg:hidden">
        <Link to={"/"}>
          <Home size={25} className="mt-4" />
        </Link>
        <nav className="mb-5 mt-20 flex h-full flex-col items-center justify-between">
          <TooltipProvider>
            <div className="flex flex-col items-center gap-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/dashboard"}>
                      <LayoutDashboard size={20} />
                      <span className="sr-only">Menu</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.dashboard")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/transactions") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/dashboard/transactions"}>
                      <ScrollText size={20} />
                      <span className="sr-only">Historique</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.transaction")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/activity") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/dashboard/activity"}>
                      <Radio size={20} />
                      <span className="sr-only">Activité</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.activity")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/exchange-rates") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/dashboard/exchange-rates"}>
                      <BsCurrencyExchange size={20} />
                      <span className="sr-only">Taux de change</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.exchangeRate")}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex flex-col items-center gap-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/help") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/dashboard/help"}>
                      <CircleHelp size={20} />
                      <span className="sr-only">Aide</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.help")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={"hover:bg-transparent"}
                  >
                    <Link to={"/dashboard/settings"}>
                      <Settings size={20} />
                      <span className="sr-only">Paramètres</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.settings.h1")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-destructive text-white"
                >
                  {t("buttons.signOut")}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  );
}
