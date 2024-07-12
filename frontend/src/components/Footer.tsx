import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="mb-3 mt-10 flex flex-col items-center gap-7">
      {/* Top footer */}
      <section className="flex w-full max-w-screen-xl justify-between">
        {/* Left */}
        <section className="flex flex-1 flex-col">
          {/* <div className="flex mb-1 cursor-default">
            <img src="/logo_no_bg.png" alt="logo du site" className="w-7"/>
            <h2 className="text-xl font-semibold">FairBank</h2>
          </div> */}
          <div className="cursor-default">
            <h1 className="font-jomhuria text-6xl">FairBank</h1>
            <p>Banque différente, avenir&nbsp;différent.</p>
          </div>
          <section className="mt-10">
            <div className="flex items-center gap-3">
              <FaPhone />
              <a href="tel:1-800-123-4567" className="hover:underline">
                1-800-123-4567
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MdEmail />
              <a
                href="mailto: contact@fairbank.com "
                className="hover:underline"
              >
                contact@fairbank.com
              </a>
            </div>
          </section>

          {/* Socials */}
          <section className="mt-auto flex gap-3 py-2">
            <a href="https://facebook.com">
              <FaFacebookF className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="https://instagram.com">
              <FaInstagram className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="https://x.com">
              <FaXTwitter className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="https://youtube.com">
              <FaYoutube className="cursor-pointer hover:opacity-70" />
            </a>
            <a href="https://linkedin.com">
              <FaLinkedinIn className="cursor-pointer hover:opacity-70" />
            </a>
          </section>
        </section>
        {/* Middle */}
        <section className="flex flex-1 flex-col text-center">
          <h3 className="cursor-default text-lg font-semibold">Plan du site</h3>
          <div className="flex flex-col gap-2 pt-5">
          <Button variant="link">
              <Link to={"/particuliers"} onClick={scrollToTop}>Particuliers</Link>
            </Button>
            <Button variant="link">
              <Link to={"/services"} onClick={scrollToTop}>Services</Link>
            </Button>
            <Button variant="link">
              <Link to={"/apropos"} onClick={scrollToTop}>À Propos</Link>
            </Button>
            <Button variant="link">
              <Link to={"/faq"} onClick={scrollToTop}>FAQ</Link>
            </Button>
            <Button variant="link">
              <Link to={"/politiques"} onClick={scrollToTop}>Confidentialité et sécurité</Link>
            </Button>
          </div>
        </section>
        {/* Right */}
        <section className="flex flex-1 flex-col gap-2 text-center">
          <h3 className="cursor-default text-lg font-semibold">
            Contactez-nous
          </h3>
          <Input id="name" placeholder="Nom" className="w-5/6  bg-white/70" />
          <Input
            type="email"
            placeholder="Email"
            className="w-5/6  bg-white/70"
          />
          <Textarea
            placeholder="Message"
            className="h-20 resize-none bg-white/70"
          />
          <Button className="mt-2">Soumettre</Button>
        </section>
      </section>
      <p className="cursor-default">
        &copy; 2024 FairBank Inc. Tous droits réservés.
      </p>
    </footer>
  );
}
