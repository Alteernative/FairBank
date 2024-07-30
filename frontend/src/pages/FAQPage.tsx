import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <section className="mt-12 flex flex-col items-center justify-center">
      <h1 className="font-jomhuria text-6xl">{t("header.faq")}</h1>
      <Accordion
        type="single"
        collapsible
        className="mb-20 w-full content-center rounded-md md:w-2/3"
      >
        <AccordionItem value="item1" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q1")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            <Trans i18nKey={"faqR1"}>
              {t("faq.r1")}
              <Link to={"/inscription"} className="hover:underline" />
            </Trans>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q2")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r2")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q3")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r3")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q4")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r4")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item5" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q5")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r5")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item6" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q6")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r6")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item7" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q7")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r7")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item8" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q8")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r8")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item9" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q9")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r9")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item10" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faq.q10")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq.r10")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
