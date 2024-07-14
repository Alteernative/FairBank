import {
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaWallet,
  FaDollarSign,
  FaChartLine,
  FaPiggyBank,
  FaReceipt,
  FaMoneyBillWave,
  FaLock,
} from "react-icons/fa";

export default function Services() {
  return (
    <div className={"mb-60"}>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <img
              src="/images/services.svg"
              alt=""
              className="mb-8 h-auto w-1/3"
            />
          </div>
          <h1 className="mb-14 font-jomhuria text-6xl text-primary">
            Services Offerts
          </h1>
        </div>
      </section>

      <section className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaMoneyCheckAlt className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">
              Gestion de comptes bancaires
            </h2>
            <p>
              Gérez vos comptes facilement et en toute sécurité depuis n'importe
              où.
            </p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaExchangeAlt className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">Transferts de fonds</h2>
            <p>Effectuez des transferts de fonds rapides et sécurisés.</p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaReceipt className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">
              Paiements de factures
            </h2>
            <p>
              Paiements de factures des services publics et privés en toute
              simplicité.
            </p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaDollarSign className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">
              Taux de change actuels
            </h2>
            <p>
              Accédez aux taux de change actuels pour la conversion de devises.
            </p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaWallet className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">Retraits gratuits</h2>
            <p>Retraits gratuits à n’importe quel ATM au Canada.</p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaMoneyBillWave className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">
              Virements sans frais
            </h2>
            <p>Virements d'argent sans payer des frais de transfert.</p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaPiggyBank className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">Remises en argent</h2>
            <p>
              Remises en argent sur chaque achat fait avec la carte FairBank.
            </p>
          </div>

          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaChartLine className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">
              Tableau de bord personnalisé
            </h2>
            <p>
              Tableau de bord avec statistiques pour suivre vos dépenses et
              revenus.
            </p>
          </div>
          <div className="rounded-lg border p-6 dark:border-slate-900">
            <FaLock className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-2 text-2xl font-semibold">Securite garantie</h2>
            <p>
              Fairbank utilise une encryption des données avancées pour la
              protection des données personnelles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
