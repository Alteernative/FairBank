import { useState } from "react";
import { ModeButtons } from "@/components/ModeButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
// import { cn } from "@/lib/utils";

// type AdminAppearanceSettingsProps = {
//   className?: string;
// };

// FIXME: Font resets to default on refresh; Fonts select check mark resets on page change.
// export default function AdminAppearanceSettings({
//   className,
// }: AdminAppearanceSettingsProps) {
export default function AdminAppearanceSettings() {
  const { t } = useTranslation();
  const [currentFont, setCurrentFont] = useState("Inter");
  const handleFontChange = (value: string) => {
    document.documentElement.style.setProperty("--font-family", value);
    setCurrentFont(value);
  };

  return (
    <main className="flex w-full flex-col gap-4 rounded-md bg-muted/20 p-4">
      {/* <main
      className={
        (cn(
          "ml-14 flex min-h-screen w-full flex-col gap-4 bg-muted/20 px-3 pt-[7rem] sm:px-10 lg:ml-52"
        ),
        className)
      }
    > */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("settings.appearance.card1.title")}</CardTitle>
          <CardDescription>
            {t("settings.appearance.card1.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleFontChange} value={currentFont}>
            <SelectTrigger className="max-w-[20rem]">
              <SelectValue>{currentFont}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Satoshi" className="font-satoshi">
                  Satoshi
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("settings.appearance.card2.title")}</CardTitle>
          <CardDescription>
            {t("settings.appearance.card2.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LanguageToggle />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("settings.appearance.card3.title")}</CardTitle>
          <CardDescription>
            {t("settings.appearance.card3.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModeButtons className="max-w-[20rem]" />
        </CardContent>
      </Card>

      {/* TODO: À implémenter */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("settings.appearance.card4.title")}</CardTitle>
          <CardDescription>
            {t("settings.appearance.card4.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section className="flex max-w-[20rem] flex-wrap gap-2">
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-green-500"></div>
              <p className="ml-3">Vert</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-blue-500"></div>
              <p className="ml-3">Bleu</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-red-500"></div>
              <p className="ml-3">Rouge</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-yellow-500"></div>
              <p className="ml-3">Jaune</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-orange-500"></div>
              <p className="ml-3">Orange</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-rose-500"></div>
              <p className="ml-3">Rose</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-purple-500"></div>
              <p className="ml-3">Violet</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-gray-500"></div>
              <p className="ml-3">Gris</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-slate-500"></div>
              <p className="ml-3">Ardoise</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-full items-center justify-start sm:w-32"
            >
              <div className="size-6 rounded-full border bg-neutral-500"></div>
              <p className="ml-3">Neutre</p>
            </Button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
