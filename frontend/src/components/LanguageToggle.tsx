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

export function LanguageToggle() {
  // const { setLanguage } = useLanguage();

  // const languages = {
  //   // francais: "fr",
  //   français: "fr",
  //   anglais: "en",
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <Languages size={"1.2rem"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map(({ code, language }) => (
          <DropdownMenuItem key={code} onClick={() => setLanguage(code)}>
            {capitalize(language)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
