import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  UserRoundPen,
  Wallet,
  Palette,
  Bell,
  ArrowLeft,
  LockIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";

export default function SettingsSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="flex h-full w-1/5 flex-col items-center">
      <Link to={"/"}>
        <h1 className="font-jomhuria text-6xl">Paramètres</h1>
        <Separator />
      </Link>

      <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
        {/* Top nav */}
        <div className="flex flex-col gap-5">
          <Button
            variant="ghost"
            className={`${isActive("/dashboard/settings") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
          >
            <Link
              to={"/dashboard/settings"}
              className="flex w-full items-center justify-start gap-2"
            >
              <UserRoundPen size={"20"} />
              Profile
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`${isActive("/dashboard/settings/account") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
          >
            <Link
              to={"/dashboard/settings/account"}
              className="flex w-full items-center justify-start gap-2"
            >
              <Wallet size={"20"} />
              Compte
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`${isActive("/dashboard/settings/themes") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
          >
            <Link
              to={"/dashboard/settings/themes"}
              className="flex w-full items-center justify-start gap-2"
            >
              <Palette size={"20"} />
              Apparence
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/notifications") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
          >
            <Link to={"/dashboard/settings/notifications"}>
              <Bell size={"20"} />
              Notifications
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/display") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
          >
            <Link to={"/dashboard/settings/security"}>
              <LockIcon size={"20"} />
              Sécurité
            </Link>
          </Button>
        </div>

        {/* Bottom nav*/}
        <Button
          asChild
          variant={"ghost"}
          className="items-center justify-start gap-2 font-medium"
        >
          <Link to={"/dashboard"}>
            <ArrowLeft size={"20"} />
            Retouner
          </Link>
        </Button>
      </nav>
    </aside>
  );
}
