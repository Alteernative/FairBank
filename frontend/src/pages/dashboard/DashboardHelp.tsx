import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export default function DashboardHelp() {
  const { t } = useTranslation();
  return (
    <main className="mx-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:mr-72 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">Centre d'aide</h1>
      <Accordion
        type="single"
        collapsible
        className="mb-20 w-full content-center rounded-md"
      >
        <AccordionItem value="item1" className="px-4 pb-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q1")}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            <p>{t("dashboard.help.a1.p1")}</p>
            <br />
            <p>{t("dashboard.help.a1.p2")}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q2")}
            {/* Comment modifier mes informations personelles? */}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            {t("dashboard.help.a2")}
            {/* En appuyant sur les "Paramètres" dans le Dashboard et "Compte", vous
            pourrez entrer votre nouveau mot de passe ou faire une demande de
            changement de courriel. */}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q3")}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            <p>{t("dashboard.help.a3.p1")}</p>
            <br />
            <p>{t("dashboard.help.a3.p2")}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q4")}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            {t("dashboard.help.a4")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item5" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q5")}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            <p>{t("dashboard.help.a5.p1")}</p>
            <br />
            <p>{t("dashboard.help.a5.p2")}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item6" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q6")}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            {t("dashboard.help.a6")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item7" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("dashboard.help.q7")}
          </AccordionTrigger>
          <AccordionContent className="leading-relaxed tracking-wider sm:w-5/6">
            {t("dashboard.help.a7")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
