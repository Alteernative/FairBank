import { useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
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

// FIXME: Font resets to default on refresh; Fonts select check mark resets on page change.
export default function AppearanceSettings() {
  const [currentFont, setCurrentFont] = useState("Inter");
  const handleFontChange = (value: string) => {
    document.documentElement.style.setProperty("--font-family", value);
    setCurrentFont(value);
  };

  return (
    <main className="flex w-full flex-col gap-4 bg-muted/20 pl-10 pt-[7rem] lg:ml-60">
      <Card className="w-10/12">
        <CardHeader>
          <CardTitle>Choix de polices</CardTitle>
          <CardDescription>
            Choisissez une police pour modifier l'apparence du site.
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
                <SelectItem value="Satoshi">Satoshi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="w-10/12">
        <CardHeader>
          <CardTitle>Mode sombre</CardTitle>
          <CardDescription>
            Choisissez entre un mode sombre, clair, ou système.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModeToggle />
        </CardContent>
      </Card>
      <Card className="w-10/12">
        <CardHeader>
          <CardTitle>Préférence de couleurs</CardTitle>
          <CardDescription>
            Choisissez un thème de couleurs parmis les palettes suivantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <section className="flex flex-wrap gap-2">
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-green-500"></div>
              <p className="ml-3">Vert</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-blue-500"></div>
              <p className="ml-3">Bleu</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-red-500"></div>
              <p className="ml-3">Rouge</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-yellow-500"></div>
              <p className="ml-3">Jaune</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-orange-500"></div>
              <p className="ml-3">Orange</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-rose-500"></div>
              <p className="ml-3">Rose</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-purple-500"></div>
              <p className="ml-3">Violet</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
            >
              <div className="size-6 rounded-full border bg-gray-500"></div>
              <p className="ml-3">Gris</p>
            </Button>
            <Button
              variant={"outline"}
              className="flex w-32 items-center justify-start"
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
