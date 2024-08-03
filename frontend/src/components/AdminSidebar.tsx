import { LayoutDashboard, Settings, LogOut, Inbox, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/components/AxiosInstance";
import { useTranslation } from "react-i18next";
import AdminAppearanceSettings from "@/pages/admin/dashboard/dashboard-settings/AdminAppearanceSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
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
    <aside className="fixed left-0 h-screen w-14 border-r py-5 lg:w-52 xl:w-60">
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
              className={`flex w-full items-center justify-start gap-2 ${isActive("/admin") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/admin"}>
                <LayoutDashboard size={20} />
                {t("sidebar.dashboard")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/admin/transactions") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/admin/demands"}>
                <Inbox size={20} />
                Demandes
              </Link>
            </Button>
          </div>

          {/* Bottom nav*/}
          <div className="flex flex-col gap-5">
            <AdminSettingsDialog />
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
                    variant="ghost"
                    className={`${isActive("/admin") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/admin"}>
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
                    variant="ghost"
                    className={`${isActive("/admin/transactions") ? "bg-muted" : "hover:bg-transparent"}`}
                  >
                    <Link to={"/admin/demands"}>
                      <Inbox size={20} />
                      <span className="sr-only">Requests</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Demandes</TooltipContent>
              </Tooltip>
            </div>

            {/* Bottom nav*/}
            <div className="flex flex-col items-center gap-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <AdminSettingsDialog />
                </TooltipTrigger>
                <TooltipContent></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"destructive"}
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    <span className="sr-only">Sign Out</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
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

const AdminSettingsDialog = () => {
  const { t } = useTranslation();

  const dialogTrigger = (isResponsive: boolean) => {
    return (
      <DialogTrigger asChild className="hidden lg:flex">
        <Button
          variant="ghost"
          size={isResponsive ? "icon" : "default"}
          className={
            isResponsive
              ? "flex lg:hidden"
              : "hidden w-full items-center justify-start hover:bg-transparent hover:underline lg:flex"
          }
        >
          <span className="flex cursor-pointer items-center gap-2">
            <Settings size={20} />
            {!isResponsive && t("settings.h1")}
          </span>
        </Button>
      </DialogTrigger>
    );
  };

  const dialogContent = () => {
    return (
      <DialogContent className="w-11/12 gap-0 overflow-scroll rounded-xl border-b p-0">
        <DialogHeader className="border-b px-4 pt-2">
          <h1 className="font-jomhuria text-6xl">{t("settings.h1")}</h1>
        </DialogHeader>
        <AdminAppearanceSettings />
        {/* TODO: Option 2: Use cn className on AppearanceSettings instead of creating AdminAppearanceSettings */}
        {/* <AdminAppearanceSettings className="m-0 min-w-full rounded-md bg-muted/20 p-4" /> */}
      </DialogContent>
    );
  };

  return (
    <>
      <Dialog>
        {dialogTrigger(false)}
        {dialogContent()}
      </Dialog>

      <Dialog>
        {dialogTrigger(true)}
        {dialogContent()}
      </Dialog>
    </>
  );
};
