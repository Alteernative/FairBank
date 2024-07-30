import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LANGUAGES } from "@/constants";
import { useLanguage } from "@/provider/LanguageProvider";

type Language =
  | "ar"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "hi"
  | "it"
  | "ja"
  | "pt"
  | "ru"
  | "zh";

export function LanguageToggle() {
  const { setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Languages size={"1.2rem"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map(({ code, language }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
          >
            {language}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
