import { LayoutDashboard, Settings, LogOut, Menu, Inbox } from "lucide-react";
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
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AdminAppearanceSettings from "@/pages/admin/dashboard/dashboard-settings/AdminAppearanceSettings";
import { Separator } from "./ui/separator";

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
    </aside>
  );
}

const AdminSettingsDialog = () => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          asChild
          variant="ghost"
          className={
            "flex w-full items-center justify-start gap-2 hover:bg-transparent hover:underline"
          }
        >
          <span className="cursor-pointer">
            <Settings size={20} />
            {t("settings.h1")}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 border-b p-0">
        <DialogHeader className="border-b px-4 pt-2">
          <h1 className="font-jomhuria text-6xl">{t("settings.h1")}</h1>
        </DialogHeader>
        <AdminAppearanceSettings />
      </DialogContent>
    </Dialog>
  );
};
