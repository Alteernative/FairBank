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
import { SiWalmart, SiZara, SiMercedes } from "react-icons/si";
import { IconContext } from "react-icons";

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
      <div className="flex flex-1 flex-col items-start justify-center gap-5">
        <h2 className="text-5xl font-bold">
          L'intérêt de notre banque&nbsp;?
          <br />
          Votre bien-être financier.
        </h2>
        <h3 className="text-2xl">
          Ouvrez un compte en quelques minutes et dites adieu aux intérêts.
        </h3>
        <Button
          asChild
          variant={"default"}
          size={"lg"}
          className="w-1/2 rounded-3xl"
        >
          <Link to={"/inscription"}>Devenir membre</Link>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img src="/images/hero.svg" alt="Card image" />
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section className="mt-24 flex flex-col text-center opacity-70">
      <h3 className="font-semibold">Magasinez dans vos boutiques préférées</h3>
      <div className="flex w-full items-center justify-around">
        <IconContext.Provider value={{ size: "50px" }}>
          <FaApple />
          <FaAmazon />
          <FaMicrosoft />
          <SiZara size="70px" />
          <SiWalmart size="100px" />
          <FaShopify />
          <SiMercedes />
        </IconContext.Provider>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mt-24 flex items-center">
      <div className="flex flex-1 items-center justify-center">
        <img src="/images/about_us.svg" alt="" />
      </div>
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-2xl font-bold">Faites Valoir Vos Avoirs</h2>
        <p>
          Nous nous engageons à offrir des services bancaires efficaces pour
          vous laisser investir dans votre futur. Envoyez de l'argent sans payer
          aucuns frais de transfert.
          <br />
          Nos services sont facilement accessibles de n'importe où, à n'importe
          quel moment.{" "}
        </p>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="mt-24 flex items-center">
      <div className="flex flex-1 flex-col items-start justify-center">
        <h2 className="text-2xl font-semibold">
          Obtenez les services bancaires que vous méritez!
        </h2>
        <p>
          Des frais mensuels? Pas question. <br />
          Profitez de retraits gratuits à n'importe quel guichet automatique au
          Canada et d'une remise en argent sur chaque achat avec la carte
          FairBank.
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img src="/images/call_to_action.svg" alt="" />
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="mx-10 my-20 flex flex-col items-center justify-center">
      <h2 className="mb-3 text-lg font-bold opacity-70">Avis de nos membres</h2>
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
                FairBank a transformé ma gestion financière. Service client
                exceptionnel!
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
                La simplicité d'utilisation de FairBank est impressionnante.
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
                Le taux d'échange est compétitif et fréquemment mis à jour! 5/5{" "}
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
                Services en ligne toujours rapides chez FairBank
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
                Excellent support client, toujours à l'écoute.
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
