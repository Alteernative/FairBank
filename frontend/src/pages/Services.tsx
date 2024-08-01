import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Banknote,
  CircleDollarSign,
  Landmark,
  LayoutDashboard,
  Lock,
  Receipt,
  Send,
  WalletMinimal,
} from "lucide-react";
import { BsCurrencyExchange } from "react-icons/bs";

export default function Services() {
  return (
    <section className="mb-32 mt-12">
      <h1 className="mb-4 text-center font-jomhuria text-6xl">
        Services Offerts
      </h1>
      {/* <main className="mx-auto"> */}
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <Banknote
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Gestion de compte bancaire
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Gérez votre compte facilement et en toute sécurité.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Send
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Transferts de fonds
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Effectuez des transferts de fonds rapides et sécurisés.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Receipt
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Paiements de factures
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Paiements de factures des services publics et privés en toute
            simplicité.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BsCurrencyExchange
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Taux de change actuels
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Accédez aux taux de change actuels pour la conversion de devises.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <WalletMinimal
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Retraits sans frais
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Retraits gratuits à n'importe quel ATM au Canada.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CircleDollarSign
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Virements sans frais
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Virements d'argent sans payer des frais de transfert.
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <Landmark
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Remises en argent
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Remises en argent sur chaque achat fait avec la carte FairBank.
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <LayoutDashboard
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Tableau de bord personnalisé
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Tableau de bord avec statistiques pour suivre vos dépenses et
            revenus.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Lock
              size={40}
              className="mb-4 text-green-500 dark:text-green-600"
            />
            <CardTitle className="text-2xl leading-tight">
              Sécurité garantie
            </CardTitle>
          </CardHeader>
          <CardContent className="leading-loose">
            Fairbank utilise un système d'encryption avancées pour la protection
            de vos données personnelles.
          </CardContent>
        </Card>
      </main>
    </section>
  );
}
