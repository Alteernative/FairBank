import { Moon, Sun, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/provider/ThemeProvider";

export function ModeButtons() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button
        variant="outline"
        className="flex items-center justify-start gap-2"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <p>Clair</p>
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-start gap-2"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <p>Sombre</p>
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-start gap-2"
        onClick={() => setTheme("system")}
      >
        <SunMoon className="h-[1.2rem] w-[1.2rem]" />
        <p>Système</p>
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  );
}
