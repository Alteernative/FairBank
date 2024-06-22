import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <section className="my-20 flex items-center justify-center flex-col">
      <h1 className="mb-20 text-4xl font-medium">FAQ</h1>
      <Accordion
        type="single"
        collapsible
        className="w-2/3 bg-white p-3 rounded-md mb-20"
      >
        <AccordionItem value="item1" className="p-4">
          <AccordionTrigger className="text-lg">
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2" className="p-4">
          <AccordionTrigger className="text-lg">
            2. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3" className="p-4">
          <AccordionTrigger className="text-lg">
            3. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4" className="p-4">
          <AccordionTrigger className="text-lg">
            4. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item5" className="p-4">
          <AccordionTrigger className="text-lg">
            5. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item6" className="p-4">
          <AccordionTrigger className="text-lg">
            6. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item7" className="p-4">
          <AccordionTrigger className="text-lg">
            7. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item8" className="p-4">
          <AccordionTrigger className="text-lg">
            8. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item9" className="p-4">
          <AccordionTrigger className="text-lg">
            9. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item10" className="p-4">
          <AccordionTrigger className="text-lg">
            10. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            officiis et facere nam rerum quaerat quidem qui tempore, consequatur
            culpa, ducimus cupiditate dolorum, delectus sunt repellat maiores
            hic illo in.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
