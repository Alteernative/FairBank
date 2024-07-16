import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Apropos() {
  return (
    <section
      className={"flex h-full w-full flex-col items-center justify-center"}
    >
      <h1 className="my-10 font-jomhuria text-6xl text-primary">
        Qui est Fairbank?
      </h1>
      <main className="flex flex-col lg:flex-row">
        <div className="flex flex-1 items-center justify-start">
          <img src="/images/about.svg" alt="" className="w-full lg:mr-20" />
        </div>

        <div className="mb-10 flex flex-1 flex-col items-center justify-center gap-5">
          <Card className="max-w-[50rem] border-none">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-loose">
                Contribuer à la réussite des nos clients en leur offrant des
                services bancaires de qualité et en les aidant à atteindre leurs
                objectifs financiers.
              </p>
              <p className="leading-loose">
                Nous nous engageons à offrir des services bancaires efficaces en
                assurant la sécurité de vos données pour que vous puissiez
                investir dans votre futur.
              </p>
            </CardContent>
          </Card>

          <Card className="max-w-[50rem] border-none">
            <CardHeader>
              <CardTitle className="text-4xl font-semibold">
                Nos Valeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="ml-6 list-disc">
                <li className="mb-4">
                  <p className="leading-loose">
                    <strong>Transparence:</strong> Maintenir une communication
                    claire et ouverte avec nos clients.
                  </p>
                </li>
                <li className="mb-4">
                  <p className="leading-loose">
                    <strong>Innovation:</strong> Continuellement améliorer nos
                    services pour répondre aux besoins changeants de nos
                    utilisateurs.
                  </p>
                </li>
                <li className="mb-4">
                  <p className="leading-loose">
                    <strong>Le client avant tout :</strong> Nous devons toujours
                    mériter le privilège d'être le premier choix de nos clients.
                  </p>
                </li>
                <li className="mb-4">
                  <p className="leading-loose">
                    <strong>Intégrité :</strong> Respecter les normes mises en
                    place par gouvernement pour la réglementation et supervision
                    des comptes.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </section>
  );
}
