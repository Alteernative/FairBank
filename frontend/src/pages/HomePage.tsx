import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { FaApple, FaAmazon, FaShopify, FaMicrosoft } from "react-icons/fa";
import { SiWalmart, SiZara, SiMercedes, SiTesla } from "react-icons/si";

export default function Home() {
  return (
    <main className="mt-10">
      {Hero()}
      {Sponsors()}
      {About()}
      {CallToAction()}
      {Reviews()}
    </main>
  );
}

function Hero() {
  return (
    <section className="flex items-center justify-around dark:bg-slate-950 dark:text-white">
      <div className="mr-10 flex flex-1 items-start justify-start">
        <div className="flex w-full flex-col gap-5">
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
            L'intérêt de notre banque&nbsp;?
            <br />
            Votre bien-être financier.
          </h1>
          <h2 className="text-xl tracking-tight lg:text-2xl">
            Ouvrez un compte en quelques minutes et dites adieu aux intérêts.
          </h2>
          <Button
            asChild
            variant={"default"}
            size={"lg"}
            className="min-w-52 max-w-72 rounded-3xl"
          >
            <Link to={"/inscription"}>Devenir membre</Link>
          </Button>
        </div>
      </div>
      {/* <div className="flex flex-1 items-center justify-center"> */}
      <div className="hidden flex-1 items-center justify-center md:flex">
        <img src="/images/hero.svg" alt="Hero section image" />
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section className="mt-24 flex flex-col gap-7 text-center opacity-70 dark:opacity-50">
      <h2 className="font-semibold tracking-wide">
        Magasinez dans vos boutiques préférées
      </h2>
      {/* <div className="flex w-full items-center justify-around"> */}
      <div className="md: grid grid-cols-2 items-center justify-items-center gap-y-10 md:grid-cols-4 lg:grid-cols-8">
        <FaApple size={50} />
        <FaAmazon size={50} />
        <FaMicrosoft size={50} />
        <FaShopify size={50} />
        <SiZara size={50} className="scale-150" />
        <SiWalmart size={50} className="scale-[2]" />
        <SiMercedes size={50} />
        <SiTesla size={50} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mt-24 flex items-center">
      <div className="hidden flex-1 items-center justify-center md:flex">
        <img src="/images/about_us.svg" alt="About section image" />
      </div>
      <div className="flex flex-1 flex-col items-start justify-center">
        <div className="mx-auto flex w-3/4 flex-col gap-7">
          <h2 className="text-4xl font-semibold tracking-tight">
            Faites valoir vos avoirs
          </h2>
          <p className="leading-loose">
            Nous nous engageons à offrir des services bancaires efficaces pour
            vous laisser investir dans votre futur. Envoyez de l'argent sans
            payer aucuns frais de transfert.
            <br />
            Nos services sont facilement accessibles de n'importe où, à
            n'importe quel moment.
          </p>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="mt-24 flex items-center">
      <div className="flex flex-1 items-start justify-center">
        <div className="mx-auto flex w-3/4 flex-col gap-7">
          <h2 className="text-4xl font-semibold tracking-tight">
            Obtenez les services bancaires que vous méritez!
          </h2>
          <p className="leading-loose">
            Des frais mensuels? Pas question. <br />
            Profitez de retraits gratuits à n'importe quel guichet automatique
            au Canada et d'une remise en argent sur chaque achat avec la carte
            FairBank.
          </p>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center md:flex">
        <img src="/images/call_to_action.svg" alt="CTA section image" />
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="mx-10 my-20 flex flex-col items-center justify-center">
      <h2 className="mb-3 text-lg font-bold tracking-tight opacity-70 dark:opacity-50">
        Avis de nos membres
      </h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex h-80 flex-col items-center p-6">
              <CardHeader className="flex cursor-default flex-col items-center">
                <Avatar>
                  <AvatarImage src="/reviews/woman1.jpg" />
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Jacqueline Bergeron</h2>
              </CardHeader>
              <CardDescription>27/01/2024</CardDescription>
              <CardContent className="text-center">
                <p className="leading-relaxed">
                  FairBank a transformé ma gestion financière. Service client
                  exceptionnel!
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex h-80 flex-col items-center p-6">
              <CardHeader className="flex cursor-default flex-col items-center">
                <Avatar>
                  <AvatarImage src="/reviews/man3.jpg" />
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Antoine Augustin</h2>
              </CardHeader>
              <CardDescription>3/12/2023</CardDescription>
              <CardContent className="text-center">
                <p className="leading-relaxed">
                  La simplicité d'utilisation de FairBank est impressionnante.
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex h-80 flex-col items-center p-6">
              <CardHeader className="flex cursor-default flex-col items-center">
                <Avatar>
                  <AvatarImage src="/reviews/man2.jpg" />
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Gigi Jordan</h2>
              </CardHeader>
              <CardDescription>23/02/2024</CardDescription>
              <CardContent className="text-center">
                <p className="leading-relaxed">
                  Le taux d'échange est compétitif et fréquemment mis à jour!
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex h-80 flex-col items-center p-6">
              <CardHeader className="flex cursor-default flex-col items-center">
                <Avatar>
                  <AvatarImage src="/reviews/man4.png" />
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Charles Bisonette</h2>
              </CardHeader>
              <CardDescription>19/03/2024</CardDescription>
              <CardContent className="text-center">
                <p className="leading-relaxed">
                  Services en ligne toujours rapides chez FairBank
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex h-80 flex-col items-center p-6">
              <CardHeader className="flex cursor-default flex-col items-center">
                <Avatar>
                  <AvatarImage src="/reviews/man1.jpg" />
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Émile Paquette</h2>
              </CardHeader>
              <CardDescription>11/04/2024</CardDescription>
              <CardContent className="text-center">
                <p className="leading-relaxed">
                  Excellent support client, toujours à l'écoute.
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
