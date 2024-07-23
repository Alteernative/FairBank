import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Copyright, Mail, Phone } from "lucide-react";
import AxiosInstance from "@/components/AxiosInstance.tsx";
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    AxiosInstance.post(
      "contactus/",
      {
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        message: data.message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        toast.success("Merci de votre commentaire.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erreur! Veuillez réessayer plus tard.");
      });
  };

  return (
    <>
      <footer className="mb-3 mt-10 flex flex-col gap-7 lg:items-center">
        {/* Top footer */}
        <section className="flex w-full max-w-screen-xl flex-col gap-14 lg:flex-row lg:gap-0">
          {/* Left */}
          <section className="flex flex-1 flex-col">
            <span className="relative cursor-default select-none">
              <h1 className="font-jomhuria text-6xl">FairBank</h1>
              <p className="absolute top-12">{t("footerSlogan")}</p>
            </span>
            <div className="mt-10 flex flex-col gap-2 lg:mt-14">
              <span className="flex items-center gap-3">
                <Phone size={"20"} />
                <Link to="tel:1-800-123-4567" className="hover:underline">
                  1-800-123-4567
                </Link>
              </span>
              <span className="flex items-center gap-3">
                <Mail size={"20"} />
                <Link
                  to="mailto: contact@fairbank.com "
                  className="hover:underline"
                >
                  contact@fairbank.com
                </Link>
              </span>
            </div>

            {/* Socials */}
            <div className="mt-10 flex gap-3 lg:mt-auto">
              <Link to="https://facebook.com">
                <FaFacebookF className="cursor-pointer hover:opacity-70" />
              </Link>
              <Link to="https://instagram.com">
                <FaInstagram className="cursor-pointer hover:opacity-70" />
              </Link>
              <Link to="https://x.com">
                <FaXTwitter className="cursor-pointer hover:opacity-70" />
              </Link>
              <Link to="https://youtube.com">
                <FaYoutube className="cursor-pointer hover:opacity-70" />
              </Link>
              <Link to="https://linkedin.com">
                <FaLinkedinIn className="cursor-pointer hover:opacity-70" />
              </Link>
            </div>
          </section>
          {/* Middle */}
          <section className="flex flex-1 flex-col text-start lg:mt-3 lg:items-center lg:text-center">
            <h3 className="mb-5 cursor-default text-xl font-semibold">
              {t("footerMapsite")}
            </h3>
            <nav className=" flex flex-col items-start gap-2 lg:items-center">
              <Button asChild variant="link">
                <Link to={"/particuliers"} onClick={scrollToTop}>
                  {t("footerPlans")}
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link to={"/services"} onClick={scrollToTop}>
                  {t("footerServices")}
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link to={"/apropos"} onClick={scrollToTop}>
                  {t("footerAboutUs")}
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link to={"/faq"} onClick={scrollToTop}>
                  {t("footerFAQ")}
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link to={"/politiques"} onClick={scrollToTop}>
                  {t("footerPrivacy")}
                </Link>
              </Button>
            </nav>
          </section>
          {/* Right */}
          <section className="flex w-full flex-1 flex-col gap-2 lg:ml-14 lg:mt-3 lg:text-center">
            <h3 className="mb-5 cursor-default text-xl font-semibold">
              {t("footerContactUs")}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-2"
            >
              <div className="flex gap-2">
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Prénom"
                  className="h-12 w-1/2"
                  {...register("prenom")}
                />
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Nom"
                  className="h-12 w-1/2"
                  {...register("nom")}
                />
              </div>
              <Input
                id="email"
                type="text"
                placeholder="Email"
                className="h-12 w-full"
                {...register("email")}
              />
              <Textarea
                placeholder="Message"
                autoComplete="off"
                className="h-24 resize-none"
                {...register("message")}
              />
              <Button className="mt-2" onSubmit={handleSubmit}>
                {t("footerSubmitBtn")}
              </Button>
            </form>
          </section>
        </section>

        <p className="flex cursor-default items-center gap-2">
          <Copyright size={16} /> {new Date().getFullYear()} {t("copyright")}
        </p>
      </footer>
      <Toaster closeButton richColors position="bottom-left" />
    </>
  );
}