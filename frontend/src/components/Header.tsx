import {Link, useNavigate} from "react-router-dom";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { useEffect, useState } from "react";
import AxiosInstance from "@/components/AxiosInstance.tsx";


export default function Header() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

   const logoutUser = () => {

    console.log("we clicked logout")
    AxiosInstance.post(`logoutall/`, {}).then(
      () => {
        setIsAuthenticated(false)
        localStorage.removeItem("Token")
        navigate('/')
        console.log("Log out successfull")
      }
    )
  }


  return (
    <>
      <header className="flex justify-between items-cente mt-7">
        <Link to="/" className="flex items-center ">
          {/* <img className="w-10" src="/logo_no_bg.png" alt="Logo du site" />
          <h1 className="text-2xl font-bold font-sans">FairBank</h1> */}
          <h1 className="text-6xl font-jomhuria">FairBank</h1>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="gap-5">
            <NavigationMenuItem>
              <Link
                to="/particuliers"
                className="text-primary font-semibold hover:text-primary/50 transition-all duration-250"
              >
                Particuliers
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/services"
                className="text-primary font-semibold hover:text-primary/50 transition-all duration-250"
              >
                Services
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/apropos"
                className="text-primary font-semibold hover:text-primary/50 transition-all duration-250"
              >
                À Propos
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/faq"
                className="text-primary font-semibold hover:text-primary/50 transition-all duration-250"
              >
                FAQ
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center">
          {isAuthenticated? (

            <Button
              variant={"default"} className="rounded-3xl ms-2"
              onClick={logoutUser}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant={"ghost"}
                className="rounded-3xl font-semibold hover:bg-primary/10"
              >
                <Link to={"/connexion"}>Se connecter</Link>
              </Button>
              <Button variant={"default"} className="rounded-3xl ms-2">
                <Link to={"/inscription"}>Devenir membre</Link>
              </Button>
            </>
          )}
          {/* <Button variant={"outline"} className="bg-transparent text-black border-black hover:bg-transparent rounded-3xl text-primary font-semibold hover:text-primary/90 transition-all duration-250">S'incrire</Button> */}
          {/* <Button variant={"outline"} className="bg-transparent text-primary border-primary rounded-3xl font-semibold transition-all duration-250 hover:bg-primary/10">Se connecter</Button> */}
        </div>
      </header>
    </>
  );
}
