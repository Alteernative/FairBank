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
import { useTranslation } from "react-i18next";

export default function Home() {
  return (
    <main className="mt-10">
      {Hero()}
      {Sponsors()}
      {About()}
      {CTA()}
      {Reviews()}
    </main>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="flex items-center justify-around dark:bg-slate-950 dark:text-white">
      <div className="mr-10 flex flex-1 items-start justify-start">
        <div className="flex w-full flex-col gap-5">
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t("homepage.hero.h1")}
          </h1>
          <h2 className="text-xl tracking-tight lg:text-2xl">
            {t("homepage.hero.h2")}
          </h2>
          <Button
            asChild
            variant={"default"}
            size={"lg"}
            className="min-w-52 max-w-72 rounded-3xl"
          >
            <Link to={"/inscription"}>{t("buttons.signUp")}</Link>
          </Button>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center md:flex">
        <img src="/images/hero.svg" alt="Hero section image" />
      </div>
    </section>
  );
}

function Sponsors() {
  const { t } = useTranslation();
  return (
    <section className="mt-24 flex flex-col gap-7 text-center opacity-70 dark:opacity-50">
      <h2 className="font-bold tracking-wide">{t("homepage.sponsors.h2")}</h2>
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
  const { t } = useTranslation();
  return (
    <section className="mt-24 flex items-center">
      <div className="hidden flex-1 items-center justify-center md:flex">
        <img src="/images/about_us.svg" alt="About section image" />
      </div>
      <div className="flex flex-1 flex-col items-start justify-center">
        <div className="mx-auto flex w-3/4 flex-col gap-7">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {t("homepage.about.h2")}
          </h2>
          <p className="leading-loose">{t("homepage.about.p")}</p>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useTranslation();
  return (
    <section className="mt-24 flex items-center">
      <div className="flex flex-1 items-start justify-center">
        <div className="mx-auto flex w-3/4 flex-col gap-7">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            {t("homepage.cta.h2")}
          </h2>
          <p className="leading-loose">{t("homepage.cta.p")}</p>
        </div>
      </div>
      <div className="hidden flex-1 items-center justify-center md:flex">
        <img src="/images/call_to_action.svg" alt="CTA section image" />
      </div>
    </section>
  );
}

function Reviews() {
  const { t } = useTranslation();
  return (
    <section className="mx-10 my-20 flex flex-col items-center justify-center">
      <h2 className="mb-3 text-lg font-bold tracking-tight opacity-70 dark:opacity-50">
        {t("homepage.reviews.h2")}
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
                <p className="leading-relaxed">{t("homepage.reviews.1")}</p>
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
                <p className="leading-relaxed">{t("homepage.reviews.2")}</p>
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
                <p className="leading-relaxed">{t("homepage.reviews.3")}</p>
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
                <p className="leading-relaxed">{t("homepage.reviews.4")}</p>
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
                <p className="leading-relaxed">{t("homepage.reviews.5")}</p>
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
