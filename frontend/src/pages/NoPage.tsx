import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"

export default function NoPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/404_image.svg" alt="404 image" className="w-4/6"></img>
      {/* <Button variant={"outline"} className="rounded-3xl"><Link to="/">Retourner à la page d'accueil</Link></Button> */}
      <Button variant={"default"} className="rounded-3xl"><Link to="/">Retourner à la page d'accueil</Link></Button>
    </div>
  )
}