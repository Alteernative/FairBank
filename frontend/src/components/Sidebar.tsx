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
        }, 1000);
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    // <section className="border border-fuchsia-500 w-2/12 flex flex-col items-center h-screen">
    <section className="w-2/12 flex flex-col items-center h-screen">
      <Link to={"/"}>
        <h1 className="text-6xl font-jomhuria">FairBank</h1>
      </Link>

      <div className="flex flex-col gap-5 mt-10">
        <Link to={"/dashboard"}>
          <Button
            variant={isActive("/dashboard") ? "default" : "ghost"}
            className="flex items-center w-full gap-2 justify-start"
          >
            <PiCirclesFourFill />
            Overview
          </Button>
        </Link>
        <Link to={"/services"}>
          <Button
            variant={isActive("/services") ? "default" : "ghost"}
            className="flex items-center w-full gap-2 justify-start"
          >
            <IoDocumentTextOutline />
            Transactions
          </Button>
        </Link>
        <Link to={"/compare-plans"}>
          <Button
            variant={isActive("/compare-plans") ? "default" : "ghost"}
            className="flex items-center w-full gap-2 justify-start"
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
            className="flex items-center w-full gap-2 justify-start"
          >
            <BsCurrencyExchange />
            Taux de change
          </Button>
        </Link>
      </div>

      <div className="mt-auto mb-5 flex flex-col gap-2">
        <Link to={"/dashboard/help"}>
          <Button
            variant={isActive("/dashboard/help") ? "default" : "ghost"}
            className="flex items-center gap-2 w-full justify-start"
          >
            <FaRegQuestionCircle />
            Aide
          </Button>
        </Link>
        <Link to={"/dashboard/settings"}>
          <Button
            variant={isActive("/dashboard/settings") ? "default" : "ghost"}
            className="flex items-center gap-2 w-full justify-start"
          >
            <FaCog />
            Paramètres
          </Button>
        </Link>
        <Link to={"/"}>
          <Button
            variant={"destructive"}
            onClick={handleLogout}
            className="flex items-center gap-2 w-full justify-start"
          >
            <FaSignOutAlt />
            Se déconnecter
          </Button>
        </Link>
      </div>
    </section>
  );
}
