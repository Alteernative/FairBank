import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  UserRoundPen,
  Wallet,
  Palette,
  Bell,
  ArrowLeft,
  LockIcon,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTranslation } from "react-i18next";

export default function SettingsSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { t } = useTranslation();

  return (
    <aside className="fixed left-0 h-screen w-14 border-r py-5 lg:w-52">
      <div className="hidden h-full w-full flex-col items-center lg:flex">
        <h1 className="cursor-default font-jomhuria text-6xl">
          {t("sidebar.settings.h1")}
        </h1>

        <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
          <div className="flex flex-col gap-5">
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings"}>
                <UserRoundPen size={20} />
                {t("sidebar.settings.profile")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/account") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings/account"}>
                <Wallet size={20} />
                {t("sidebar.settings.account")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/appearance") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings/appearance"}>
                <Palette size={20} />
                {t("sidebar.settings.appearance")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/notifications") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings/notifications"}>
                <Bell size={20} />
                {t("sidebar.settings.notifications")}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/security") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings/security"}>
                <LockIcon size={20} />
                {t("sidebar.settings.security")}
              </Link>
            </Button>
          </div>

          <Button
            asChild
            variant={"ghost"}
            className="items-center justify-start gap-2 font-medium"
          >
            <Link to={"/dashboard"}>
              <ArrowLeft size={20} />
              {t("buttons.return")}
            </Link>
          </Button>
        </nav>
      </div>

      {/* Responsive nav */}
      <div className="flex h-full w-full flex-col items-center lg:hidden">
        <Link to={"#"} className="cursor-default">
          <Settings size={25} className="mt-4" />
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
                    className={`${isActive("/dashboard/settings") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
                  >
                    <Link to={"/dashboard/settings"}>
                      <UserRoundPen size={20} />
                      <span className="sr-only">Profile</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.settings.profile")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/settings/account") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
                  >
                    <Link to={"/dashboard/settings/account"}>
                      <Wallet size={20} />
                      <span className="sr-only">Compte</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.settings.account")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/settings/appearance") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
                  >
                    <Link to={"/dashboard/settings/appearance"}>
                      <Palette size={20} />
                      <span className="sr-only">Apparence</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.settings.appearance")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/settings/notifications") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
                  >
                    <Link to={"/dashboard/settings/notifications"}>
                      <Bell size={20} />
                      <span className="sr-only">Notifications</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.settings.notifications")}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size={"icon"}
                    variant={"ghost"}
                    className={`${isActive("/dashboard/settings/security") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
                  >
                    <Link to={"/dashboard/settings/security"}>
                      <LockIcon size={20} />
                      <span className="sr-only">Sécurité</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("sidebar.settings.security")}
                </TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  size={"icon"}
                  variant={"ghost"}
                  className={"hover:bg-transparent"}
                >
                  <Link to={"/dashboard"}>
                    <ArrowLeft size={20} />
                    <span className="sr-only">Retouner</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {t("buttons.return")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  );
}
