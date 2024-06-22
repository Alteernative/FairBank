import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { FaApple, FaAmazon, FaShopify, FaMicrosoft } from "react-icons/fa"
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
  )
}

function Hero() {
  return (
    <section className="flex items-center justify-around">
      <div className="flex flex-col gap-5 flex-1 items-start justify-center">
        <h2 className="font-bold text-5xl">L'intérêt de notre banque&nbsp;?<br />Votre bien-être financier.</h2>
        <h3 className="text-2xl">Ouvrez un compte en quelques minutes et dites adieu aux intérêts.</h3>
        <Button variant={"default"} size={"lg"} className="rounded-3xl w-6/12">
          <Link to={'/inscription'}>Devenir membre</Link>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img src="/hero.svg" alt="Card image"/>
      </div>
    </section>
  )
}

function Sponsors(){
  return (
    <section className="flex flex-col text-center mt-24 opacity-70">
      <h3 className="font-semibold">Magasinez dans vos boutiques préférées</h3>
      <div className="flex items-center justify-around w-full">
        <IconContext.Provider value={{ size: '50px' }}>
          <FaApple />
          <FaAmazon />
          <FaMicrosoft />
          <SiZara size= '70px'/>
          <SiWalmart size= '100px' />
          <FaShopify />
          <SiMercedes />
        </IconContext.Provider>
      </div>
    </section>
  )
}

function About(){
  return (
    <section className="flex mt-24 items-center">
      <div className="flex flex-1 items-center justify-center">
        <img src="/about_us.svg" alt="" />
      </div>
      <div className="flex flex-col flex-1 items-start justify-center">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, dolorum maxime minus recusandae quasi ullam vitae nihil possimus asperiores, optio quae delectus soluta nisi ab error nam laboriosam. Molestias, voluptatibus.</p>
      </div>
    </section>
  )
}

function CallToAction(){
  return (
    <section className="flex mt-24 items-center">
      <div className="flex flex-col flex-1 items-start justify-center">
        <h2 className="text-2xl font-semibold">Call to Action</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam explicabo sunt minus ullam impedit a voluptatem rem ipsum tempore consequatur, ratione fugiat, doloribus obcaecati illum inventore? Id recusandae ad blanditiis.</p>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <img src="/call_to_action.svg" alt="" />
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="flex flex-col items-center justify-center my-20 mx-10">
      <h2 className="text-lg font-bold mb-3 opacity-70">Écoutez de nos membres</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex flex-col h-80 items-center p-6  bg-white/70">
              <CardHeader className="flex flex-col items-center cursor-default">
                <Avatar>
                  <AvatarImage src="https://placehold.co/50"/>
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Person 1</h2>
              </CardHeader>
              <CardDescription>Description</CardDescription>
              <CardContent className="text-center">Message</CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex flex-col h-80 items-center p-6  bg-white/70">
              <CardHeader className="flex flex-col items-center cursor-default">
                <Avatar>
                  <AvatarImage src="https://placehold.co/50"/>
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Person 2</h2>
              </CardHeader>
              <CardDescription>Description</CardDescription>
              <CardContent className="text-center">Message</CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex flex-col h-80 items-center p-6  bg-white/70">
              <CardHeader className="flex flex-col items-center cursor-default">
                <Avatar>
                  <AvatarImage src="https://placehold.co/50"/>
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Person 3</h2>
              </CardHeader>
              <CardDescription>Description</CardDescription>
              <CardContent className="text-center">Message</CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex flex-col h-80 items-center p-6  bg-white/70">
              <CardHeader className="flex flex-col items-center cursor-default">
                <Avatar>
                  <AvatarImage src="https://placehold.co/50"/>
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Person 4</h2>
              </CardHeader>
              <CardDescription>Description</CardDescription>
              <CardContent className="text-center">Message</CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Card className="flex flex-col h-80 items-center p-6  bg-white/70">
              <CardHeader className="flex flex-col items-center cursor-default">
                <Avatar>
                  <AvatarImage src="https://placehold.co/50"/>
                  <AvatarFallback>Avatar placeholder</AvatarFallback>
                </Avatar>
                <h2>Person 5</h2>
              </CardHeader>
              <CardDescription>Description</CardDescription>
              <CardContent className="text-center">Message</CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}