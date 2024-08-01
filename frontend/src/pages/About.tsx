import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function Apropos() {
  const { t } = useTranslation();

  return (
    <section className="mb-32 mt-12 flex flex-col items-center justify-center">
      <h1 className="mb-10 font-jomhuria text-6xl text-primary">
        {t("aboutUs.h1")}
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
                <h2 className="text-4xl font-semibold tracking-tight">
                  {t("aboutUs.card1.h2")}
                </h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7">{t("aboutUs.card1.p1")}</p>
              <p className="leading-7">{t("aboutUs.card1.p2")}</p>
            </CardContent>
          </Card>

          <Card className="max-w-[50rem] border-none">
            <CardHeader>
              <CardTitle>
                <h2 className="text-4xl font-semibold tracking-tight">
                  {t("aboutUs.card2.h2")}
                </h2>
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
