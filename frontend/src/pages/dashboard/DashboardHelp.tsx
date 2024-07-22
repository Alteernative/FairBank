import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DashboardHelp() {
  return (
    // <section className="h-full w-7/12 rounded-lg px-10 shadow-lg">
    <main className="h-full w-full bg-muted/20 px-5 py-5 lg:ml-60 lg:mr-72">
      <h1 className="mb-10 font-jomhuria text-6xl">Centre d'aide</h1>
      <Accordion
        type="single"
        collapsible
        className="mb-20 w-full content-center rounded-md"
        // className="mb-20 w-[30rem] content-center rounded-md"
      >
        <AccordionItem value="item1" className="px-4 pb-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Comment acheter des devises étrangères?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            En appuyant sur les "Taux de change" dans l'aperçu de compte, le
            choix de devises étrangères achetables s'affichera.
          </AccordionContent>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            En entrant le montant en $CAD à convertir, le bouton Convertir fera
            l'échange avec le taux immédiat du marché et votre balance de
            devises étrangères sera mise à jour.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item2" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Comment modifier mes informations personelles?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            En appuyant sur les "Paramètres" dans le Dashboard et "Compte", vous
            pourrez entrer votre nouveau mot de passe ou faire une demande de
            changement de courriel.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item3" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Comment faire une demande de fonds?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            Dans l'aperçu du compte, en appuyant sur le buton "Demander" et en
            rentrant les informations d'un autre client Fairbank avec le montant
            désiré, vous enverrez une demande à celui-ci.
          </AccordionContent>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            Lorsqu'il acceptera votre demande, les fonds vous seront déposés
            dans les minutes suivant l'acceptation.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item4" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Puis-je transmettre des devises étrangères?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            Non, notre système actuel ne permet pas les transactions en devises
            étrangères entre comptes. Seulement les transactions en $CAD sont
            permises pour le moment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item5" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Comment fermer mon compte Fairbank?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            En appuyant sur les "Paramètres" dans le Dashboard et "Sécurité",
            vous trouverez le bouton de demande de fermeture de compte.
          </AccordionContent>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            Un employé Fairbank examinera et procédera à la fermeture de votre
            compte dans les plus amples délais.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item6" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Comment télécharger l'historique de mes transactions?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            Dans l'aperçu du compte, un bouton vert est présent sur le côté
            droit du graphique qui lancera un téléchargement de votre historique
            de transactions sous le format Excel.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item7" className="p-4">
          <AccordionTrigger className="text-start text-lg tracking-tight">
            Comment changer l'apparence de l'application?
          </AccordionTrigger>
          <AccordionContent className="w-3/4 leading-relaxed tracking-wider">
            En appuyant sur les "Paramètres" dans le Dashboard et "Apparence",
            le choix de polices, mode sombre ou clair ainsi que les options de
            préférence des couleurs y sont présentes.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
    // </section>
  );
}
