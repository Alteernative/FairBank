import { FaSignOutAlt, FaRegQuestionCircle, FaCog } from "react-icons/fa";
import { PiCirclesFourFill } from "react-icons/pi";
import { BsCurrencyExchange } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdCompareArrows } from "react-icons/md";
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
            variant={isActive("/dashboard") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <Link to={"/dashboard"}>
              <PiCirclesFourFill />
              Menu
            </Link>
          </Button>
          <Button
            asChild
            variant={isActive("/dashboard/transactions") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <Link to={"/dashboard/transactions"}>
              <IoDocumentTextOutline />
              Historique
            </Link>
          </Button>
          <Button
            asChild
            variant={isActive("/dashboard/activity") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <Link to={"/dashboard/activity"}>
              <MdCompareArrows />
              Activité
            </Link>
          </Button>
          <Button
            asChild
            variant={
              isActive("/dashboard/exchange-rates") ? "default" : "ghost"
            }
            className="flex w-full items-center justify-start gap-2"
          >
            <Link to={"/dashboard/exchange-rates"}>
              <BsCurrencyExchange />
              Taux de change
            </Link>
          </Button>
        </div>

        {/* Bottom nav*/}
        <div className="flex flex-col gap-5">
          <Button
            asChild
            variant={isActive("/dashboard/help") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <Link to={"/dashboard/help"}>
              <FaRegQuestionCircle />
              Aide
            </Link>
          </Button>
          <Button
            asChild
            variant={isActive("/dashboard/settings") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <Link to={"/dashboard/settings"}>
              <FaCog />
              Paramètres
            </Link>
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleLogout}
            className="flex w-full items-center justify-start gap-2"
          >
            <FaSignOutAlt />
            Se déconnecter
          </Button>
        </div>
      </nav>
    </aside>
  );
}
