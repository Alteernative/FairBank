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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AppearanceSettings() {
  return (
    <main className="ml-14 mt-20 flex w-4/5 flex-col gap-4 md:ml-12 lg:ml-8">
      <Card className="w-10/12 border-none shadow-none">
        <CardHeader>
          <CardTitle>Font</CardTitle>
          <CardDescription>
            Choisissez un font pour votre tableau de bord.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="max-w-[20rem]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fonts</SelectLabel>
                <SelectItem value="font-system">Système</SelectItem>
                <SelectItem value="font-inter">Inter</SelectItem>
                <SelectItem value="font-roboto">Roboto</SelectItem>
                <SelectItem value="font-montserrat">Montserrat</SelectItem>
                <SelectItem value="font-satoshi">Satoshi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="w-10/12 border-none shadow-none">
        <CardHeader>
          <CardTitle>Mode sombre</CardTitle>
          <CardDescription>
            Choisissez un mode entre clair, sombre et système.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ModeToggle />
        </CardContent>
      </Card>
      <Card className="w-10/12 border-none shadow-none">
        <CardHeader>
          <CardTitle>Préférence de couleurs</CardTitle>
          <CardDescription>
            Choisissez un thème de couleurs parmis les palettes suivantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: Convert to a 3x3 grid */}
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

      {/* TODO: No submit buttons. Update on user click */}
      {/* <Button type="submit" className="min-w-1/2 ml-6 mt-5 max-w-[10rem]">
        Sauvegarder
      </Button> */}
    </main>
  );
}
