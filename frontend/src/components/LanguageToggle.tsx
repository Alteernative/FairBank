import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import capitalize from "@/utils/capitalize";
import { LANGUAGES } from "@/constants";
import { useLanguage } from "@/provider/LanguageProvider";

export function LanguageToggle() {
  // const { setLanguage } = useLanguage();

  const languages = {
    // francais: "fr",
    français: "fr",
    anglais: "en",
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Languages size={"1.2rem"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([language, langCode]) => (
          <DropdownMenuItem
            key={langCode}
            onClick={() => setLanguage(langCode)}
          >
            {capitalize(language)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
