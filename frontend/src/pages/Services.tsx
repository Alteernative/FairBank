import { FaMoneyCheckAlt, FaExchangeAlt, FaWallet, FaDollarSign, FaChartLine, FaPiggyBank, FaReceipt, FaMoneyBillWave } from 'react-icons/fa';

export default function Services() {
  return (
    <>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img src="/services.svg" alt="" className="w-1/3 h-auto mb-8" />
          </div>
          <h1 className="text-5xl font-bold mb-8">Services Offerts</h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaMoneyCheckAlt className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Gestion de comptes bancaires</h2>
            <p>Gérez vos comptes facilement et en toute sécurité depuis n'importe où.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaExchangeAlt className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Transferts de fonds</h2>
            <p>Effectuez des transferts de fonds rapides et sécurisés.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaReceipt className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Paiements de factures</h2>
            <p>Paiements de factures des services publics et privés en toute simplicité.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaDollarSign className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Taux de change actuels</h2>
            <p>Accédez aux taux de change actuels pour la conversion de devises.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaWallet className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Retraits gratuits</h2>
            <p>Retraits gratuits à n’importe quel ATM au Canada.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaMoneyBillWave className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Virements sans frais</h2>
            <p>Virements d'argent sans payer des frais de transfert.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaPiggyBank className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Remises en argent</h2>
            <p>Remises en argent sur chaque achat fait avec la carte FairBank.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FaChartLine className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Tableau de bord personnalisé</h2>
            <p>Tableau de bord avec statistiques pour suivre vos dépenses et revenus.</p>
          </div>

        </div>
      </section>
    </>
  );
}
