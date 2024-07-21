import {
  LayoutDashboard,
  ScrollText,
  Radio,
  CircleHelp,
  Settings,
  LogOut,
} from "lucide-react";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/components/AxiosInstance";

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
    <aside className="flex h-full w-2/12 flex-col items-center">
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
            <Link to={"dashboard/settings"}>
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
    </aside>
  );
}
