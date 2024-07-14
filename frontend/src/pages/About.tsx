export default function Apropos() {
  return (
    <div className={"mb-60"}>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img src="/images/about.svg" alt="" className="h-auto w-2/5" />
          </div>
          <h1 className="mb-14 font-jomhuria text-6xl text-primary">
            Qui est Fairbank?
          </h1>
        </div>
      </section>

      <section className="mb-4">
        <h1 className="mb-10 text-4xl font-bold">Notre Mission</h1>
        <p>
          {" "}
          Contribuer à la réussite des nos clients en leur offrant des services
          bancaires de qualité et en les aidant à atteindre leurs objectifs
          financiers.{" "}
        </p>
        <p>
          {" "}
          Nous nous engageons à offrir des services bancaires efficaces en
          assurant la sécurité de vos données pour que vous puissiez investir
          dans votre futur.{" "}
        </p>

        <h1 className="mb-10 text-4xl font-bold"></h1>
        <h2 className="mb-10 text-4xl font-bold">Nos Valeurs</h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Transparence:</strong> Maintenir une communication claire et
            ouverte avec nos clients.
          </li>
          <li>
            <strong>Innovation:</strong> Continuellement améliorer nos services
            pour répondre aux besoins changeants de nos utilisateurs.
          </li>
          <li>
            <strong>Le client avant tout :</strong> Nous devons toujours mériter
            le privilège d'être le premier choix de nos clients.
          </li>
          <li>
            <strong>Intégrité :</strong> Respecter les normes mises en place par
            gouvernement pour la réglementation et supervision des comptes.
          </li>
        </ul>
      </section>
    </div>
  );
}
