import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  UserRoundPen,
  Wallet,
  Palette,
  Bell,
  ArrowLeft,
  LockIcon,
  Menu,
} from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function SettingsSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="fixed left-0 h-screen py-5 lg:w-60 lg:border-r">
      <div className="hidden h-full w-full flex-col items-center lg:flex">
        <Link to={"/"}>
          <h1 className="font-jomhuria text-6xl">Paramètres</h1>
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
      </div>

      {/* Responsive Sidebar */}
      <div className="flex gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"} variant={"ghost"} className="ml-2 mt-2">
              <Menu size={30} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="flex min-h-screen flex-col">
            <SheetHeader className="hidden">
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <div className="flex h-full w-full flex-col items-start pl-10">
              <Link to={"/"}>
                <h1 className="font-jomhuria text-6xl">Paramètres</h1>
                <Separator />
              </Link>

              <nav className="mb-5 mt-10 flex h-full flex-col justify-between">
                {/* Top nav */}
                <div className="flex flex-col gap-5">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/settings"}>
                        <UserRoundPen size={"20"} />
                        Profile
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/account") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/settings/account"}>
                        <Wallet size={"20"} />
                        Compte
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`flex w-full items-center justify-start gap-2 ${isActive("/dashboard/settings/themes") ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline"}`}
                    >
                      <Link to={"/dashboard/settings/themes"}>
                        <Palette size={"20"} />
                        Apparence
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
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
                  </SheetClose>
                  <SheetClose asChild>
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
                  </SheetClose>
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </aside>
  );
}
