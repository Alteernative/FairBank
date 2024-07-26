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

export default function SettingsSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 h-screen w-14 border-r py-5 lg:w-52">
      <div className="hidden h-full w-full flex-col items-center lg:flex">
        <h1 className="cursor-default font-jomhuria text-6xl">Paramètres</h1>

        <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
          <div className="flex flex-col gap-5">
            <Button
              variant="ghost"
              className={`${isActive("/dashboard/settings") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link
                to={"/dashboard/settings"}
                className="flex w-full items-center justify-start gap-2"
              >
                <UserRoundPen size={20} />
                Profile
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`${isActive("/dashboard/settings/account") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link
                to={"/dashboard/settings/account"}
                className="flex w-full items-center justify-start gap-2"
              >
                <Wallet size={20} />
                Compte
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`${isActive("/dashboard/settings/themes") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link
                to={"/dashboard/settings/themes"}
                className="flex w-full items-center justify-start gap-2"
              >
                <Palette size={20} />
                Apparence
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/notifications") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings/notifications"}>
                <Bell size={20} />
                Notifications
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/display") ? "bg-muted" : "hover:bg-transparent hover:underline"}`}
            >
              <Link to={"/dashboard/settings/security"}>
                <LockIcon size={20} />
                Sécurité
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
              Retouner
            </Link>
          </Button>
        </nav>
      </div>

      {/* Responsive nav */}
      <div className="flex h-full w-full flex-col items-center lg:hidden">
        <Settings size={25} className="mb-10" />
        <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
          <TooltipProvider>
            <div className="flex flex-col gap-10">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={"/dashboard/settings"}>
                    <UserRoundPen size={20} />
                    <span className="sr-only">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={"/dashboard/settings/account"}>
                    <Wallet size={20} />
                    <span className="sr-only">Compte</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Compte</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={"/dashboard/settings/themes"}>
                    <Palette size={20} />
                    <span className="sr-only">Apparence</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Apparence</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={"/dashboard/settings/notifications"}>
                    <Bell size={20} />
                    <span className="sr-only">Notifications</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Notifications</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={"/dashboard/settings/security"}>
                    <LockIcon size={20} />
                    <span className="sr-only">Sécurité</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Sécurité</TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={"/dashboard"}>
                  <ArrowLeft size={20} />
                  <span className="sr-only">Retouner</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Retouner</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </aside>
  );
}
