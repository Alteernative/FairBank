import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function FAQPage() {
  return (
    <section className="my-20 flex flex-col items-center justify-center">
      <h1 className="mb-14 font-jomhuria text-6xl text-primary">FAQ</h1>
      <Accordion
        type="single"
        collapsible
        className="mb-20 w-2/3 rounded-md bg-white p-3"
      >
        <AccordionItem value="item1" className="p-4">
          <AccordionTrigger className="text-lg">
            1. Comment puis-je ouvrir un compte à FairBank?
          </AccordionTrigger>
          <AccordionContent>
            Rien de plus simple! Vous pouvez ouvrir un compte en visitant{" "}
            <Link to={"/inscription"} className="hover:underline">
              fairbank.com/inscription
            </Link>{" "}
            et en présentant une demande en ligne.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2" className="p-4">
          <AccordionTrigger className="text-lg">
            2. Qui peut ouvrir un compte à FairBank?
          </AccordionTrigger>
          <AccordionContent>
            Chaque client chez FairBank doit :
            <ul className="ml-4 mt-1 list-disc">
              <li>Être des résidents canadiens;</li>
              <li>
                Avoir atteint l'âge de la majorité dans leur province (18 ou 19
                ans, selon l'endroit où ils vivent);
              </li>
              <li>Posséder un numéro d'assurance sociale.</li>
            </ul>
            <p className="mt-4">
              Remarque : Pour vous inscrire en ligne, un numéro de téléphone
              mobile canadien est requis.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3" className="p-4">
          <AccordionTrigger className="text-lg">
            3. Les dépôts directs ont-ils une période de retenue?
          </AccordionTrigger>
          <AccordionContent>
            Non, vos fonds sont disponibles dès qu'ils sont déposés.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4" className="p-4">
          <AccordionTrigger className="text-lg">
            4. Mon compte est verrouillé. Que dois-je faire pour y avoir accès à
            nouveau?
          </AccordionTrigger>
          <AccordionContent>
            Pour déverrouiller votre compte, veuillez communiquer avec l'équipe
            du Service à la clientèle de FairBank au 1-800-123-4567 ou par
            courriel à contact@fairbank.com
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item5" className="p-4">
          <AccordionTrigger className="text-lg">
            5. Quel type de produits FairBank offre-t-elle?
          </AccordionTrigger>
          <AccordionContent>
            Nous offrons trois types de comptes: Regulier, Premium, Ultime avec
            chacun des avantages uniques. Avec vos comptes Fairbank, vous pouvez
            effectuer des paiements de factures, des transferts de fonds, et
            bien plus encore!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item6" className="p-4">
          <AccordionTrigger className="text-lg">
            6. Comment puis-je trouver mon numéro de compte?
          </AccordionTrigger>
          <AccordionContent>
            Ouvrez une session dans le portail de Fairbank et, à partir du
            tableau de bord, vous verrez votre numéro unique à neuf chiffres
            unique à chaque compte.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item7" className="p-4">
          <AccordionTrigger className="text-lg">
            7. Comment le taux de conversion du dollar américain est-il calculé
            chez FairBank?
          </AccordionTrigger>
          <AccordionContent>
            Les taux de change fluctuent constamment, mais vous pouvez accéder à
            notre taux de change en direct du dollar américain en vous
            connectant à votre compte. Nous mettons à jour nos taux de change
            toutes les 15 minutes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item8" className="p-4">
          <AccordionTrigger className="text-lg">
            8. Puis-je profiter des services de FairBank si je vis à l'extérieur
            du Canada?
          </AccordionTrigger>
          <AccordionContent>
            Vous pouvez continuer d'accéder à votre compte actuel pendant que
            vous voyagez à l'extérieur du Canada. Toutefois, tous les titulaires
            de comptes de la Banque EQ doivent être des résidents canadiens pour
            pouvoir conserver leur compte.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item9" className="p-4">
          <AccordionTrigger className="text-lg">
            9. Où puis-je utiliser ma carte FairBank?
          </AccordionTrigger>
          <AccordionContent>
            Vous pouvez utiliser votre carte partout où les cartes Visa sont
            acceptées, tant au Canada qu'à l'étranger.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item10" className="p-4">
          <AccordionTrigger className="text-lg">
            10. Où puis-je trouver mes feuillets d'impôt?
          </AccordionTrigger>
          <AccordionContent>
            Une fois que vous avez ouvert une session, naviguez jusqu'à l'onglet
            « Mes comptes » pour télécharger l'historique de nos transactions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
