import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Apropos() {
  return (
    <section className="mb-32 mt-12 flex flex-col items-center justify-center">
      <h1 className="mb-10 font-jomhuria text-6xl text-primary">
        Qui est Fairbank ?
      </h1>
      <main className="flex flex-col lg:flex-row">
        <div className="mx-auto mb-8 flex flex-1 items-center lg:mr-20 lg:justify-start">
          <img
            src="/images/about.svg"
            alt="About page image"
            className="w-full"
          />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          <Card className="max-w-[50rem] border-none">
            <CardHeader>
              <CardTitle>
                <h1 className="text-4xl font-semibold tracking-tight">
                  Notre Mission
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                Contribuer à la réussite des nos clients en leur offrant des
                services bancaires de qualité et en les aidant à atteindre leurs
                objectifs financiers.
              </p>
              <p className="leading-7">
                Nous nous engageons à offrir des services bancaires efficaces en
                assurant la sécurité de vos données pour que vous puissiez
                investir dans votre futur.
              </p>
            </CardContent>
          </Card>

          <Card className="max-w-[50rem] border-none">
            <CardHeader>
              <CardTitle>
                <h1 className="text-4xl font-semibold tracking-tight">
                  Nos Valeurs
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="ml-6 list-disc">
                <li className="mb-4">
                  <p className="leading-7">
                    <strong>Transparence:</strong> Maintenir une communication
                    claire et ouverte avec nos clients.
                  </p>
                </li>
                <li className="mb-4">
                  <p className="leading-7">
                    <strong>Innovation:</strong> Continuellement améliorer nos
                    services pour répondre aux besoins changeants de nos
                    utilisateurs.
                  </p>
                </li>
                <li className="mb-4">
                  <p className="leading-7">
                    <strong>Le client avant tout :</strong> Nous devons toujours
                    mériter le privilège d'être le premier choix de nos clients.
                  </p>
                </li>
                <li className="mb-4">
                  <p className="leading-7">
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
