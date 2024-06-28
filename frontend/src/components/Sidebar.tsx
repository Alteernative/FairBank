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
    <section className="flex h-full w-2/12 flex-col items-center">
      <Link to={"/"}>
        <h1 className="font-jomhuria text-6xl">FairBank</h1>
      </Link>

      <div className="mt-10 flex flex-col gap-5">
        <Link to={"/dashboard"}>
          <Button
            variant={isActive("/dashboard") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <PiCirclesFourFill />
            Overview
          </Button>
        </Link>
        <Link to={"/dashboard/transactions"}>
          <Button
            variant={isActive("/dashboard/transactions") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <IoDocumentTextOutline />
            Transactions
          </Button>
        </Link>
        <Link to={"/dashboard/compare-plans"}>
          <Button
            variant={isActive("/dashboard/compare-plans") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <MdCompareArrows />
            Comparer les plans
          </Button>
        </Link>
        <Link to={"/dashboard/exchange-rates"}>
          <Button
            variant={
              isActive("/dashboard/exchange-rates") ? "default" : "ghost"
            }
            className="flex w-full items-center justify-start gap-2"
          >
            <BsCurrencyExchange />
            Taux de change
          </Button>
        </Link>
      </div>

      <div className="mb-5 mt-auto flex flex-col gap-5">
        <Link to={"/dashboard/help"}>
          <Button
            variant={isActive("/dashboard/help") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <FaRegQuestionCircle />
            Aide
          </Button>
        </Link>
        <Link to={"/dashboard/settings"}>
          <Button
            variant={isActive("/dashboard/settings") ? "default" : "ghost"}
            className="flex w-full items-center justify-start gap-2"
          >
            <FaCog />
            Paramètres
          </Button>
        </Link>
        <Button
          variant={"destructive"}
          onClick={handleLogout}
          className="flex w-full items-center justify-start gap-2"
        >
          <FaSignOutAlt />
          Se déconnecter
        </Button>
      </div>
    </section>
  );
}
