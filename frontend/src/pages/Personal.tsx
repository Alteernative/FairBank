import { FaMoneyCheck, FaPiggyBank, FaCrown } from 'react-icons/fa';

export default function Particuliers() {
  return (
    <div className='mb-60'>

      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img src="/choix.svg" alt="" className="w-1/4 h-auto mb-8" />
          </div>
          <h1 className="text-6xl mb-14 font-jomhuria text-primary">Les choix pour Particuliers</h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaMoneyCheck className="text-green-600 text-4xl mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">Comptes Régulier</h2>
            <p>Limite de transfert quotidiennes:  10 000$ / jour</p>
            <p>Transactions quotidiennes: 20</p>
            <p>Transactions quotidiennes: 20.99% </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaPiggyBank className="text-green-600 text-4xl mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">Comptes Premium</h2>
            <p>Limite de transfert quotidiennes: 50 000$ / jour </p>
            <p>Transactions quotidiennes: 50</p>
            <p>Taux d'interets sur les prets: 15.99%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaCrown className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Comptes Ultime</h2>
            <p>Limite de transfert quotidiennes: Illimité</p>
            <p>Transactions quotidiennes: Illimité</p>
            <p>Taux d'interets sur les prets: 9.99%</p>

          </div>
        </div>
      </section>
    </div>
  );
}
