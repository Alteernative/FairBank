import { FaMoneyCheck, FaPiggyBank, FaCrown } from "react-icons/fa";

export default function Particuliers() {
  return (
    <div className="mb-60">
      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img
              src="/images/personal.svg"
              alt=""
              className="mb-8 h-auto w-1/3"
            />
          </div>
          <h1 className="mb-14 font-jomhuria text-6xl text-primary">
            Les choix pour Particuliers
          </h1>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <FaMoneyCheck className="mb-4 text-4xl text-[#66C02E]" />
            <h2 className="mb-2 text-2xl font-semibold">Comptes Régulier</h2>
            <p>Limite de transfert quotidiennes: 10 000$ / jour</p>
            <p>Transactions quotidiennes: 20</p>
            <p>Transactions quotidiennes: 20.99% </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <FaPiggyBank className="mb-4 text-4xl text-[#66C02E]" />
            <h2 className="mb-2 text-2xl font-semibold">Comptes Premium</h2>
            <p>Limite de transfert quotidiennes: 50 000$ / jour </p>
            <p>Transactions quotidiennes: 50</p>
            <p>Taux d'interets sur les prets: 15.99%</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <FaCrown className="mb-4 text-4xl text-[#66C02E]" />
            <h2 className="mb-2 text-2xl font-semibold">Comptes Ultime</h2>
            <p>Limite de transfert quotidiennes: Illimité</p>
            <p>Transactions quotidiennes: Illimité</p>
            <p>Taux d'interets sur les prets: 9.99%</p>
          </div>
        </div>
      </section>
    </div>
  );
}
