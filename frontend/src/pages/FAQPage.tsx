import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <section className="mt-12 flex flex-col items-center justify-center">
      <h1 className="font-jomhuria text-6xl">FAQ</h1>
      <Accordion
        type="single"
        collapsible
        className="mb-20 w-full content-center rounded-md md:w-2/3"
      >
        <AccordionItem value="item1" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ1")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR1")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ2")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR2")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ3")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR3")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ4")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR4")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item5" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ5")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR5")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item6" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ6")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR6")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item7" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ7")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR7")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item8" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ8")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR8")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item9" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ9")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faqR9")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item10" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            {t("faqQ10")}
          </AccordionTrigger>
          <AccordionContent className="w-4/5 leading-7 tracking-wider">
            {t("faq10")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
