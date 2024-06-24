import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function UserProfileSettings() {
  return (
    <section>
      <h1 className="text-6xl font-jomhuria mb-10">Profil Utilisateur</h1>
      <div className="flex items-center justify-center mt-52">
        <p className="text-3xl font-semibold">Coming Soon</p>
      </div>
      <Link to={"/dashboard"}>
        <Button>Retourner au tableau de bord</Button>
      </Link>
    </section>
  );
}
