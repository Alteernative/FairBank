import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src="/images/404.svg" alt="404 image" className="w-4/6"></img>
      <Button asChild variant={"ghost"} className="rounded-3xl">
        <Link to="/">Retourner à la page d'accueil</Link>
      </Button>
    </div>
  );
}
