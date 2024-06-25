import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance.tsx";
import { useMultiStepForm } from "@/hooks/useMultiStepFrom.ts";
import UserForm from "./signup/UserForm.tsx";
import PasswordForm from "./signup/PasswordForm.tsx";
import PlanForm from "./signup/PlanForm.tsx";
import EmailForm from "./signup/EmailForm.tsx";

// DEBUG: This variable is unused?
// import { Simulate } from "react-dom/test-utils";
// import error = Simulate.error;

export default function Home() {
  /*const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <EmailForm />,
      <UserForm />,
      <PasswordForm />,
      <PlanForm />,
    ]);

  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const submission = (data) => {
    console.log(data);
    AxiosInstance.post(
      "register/",
      {
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        console.log("registered successfully");
        navigate(`/connexion`);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  };*/

  const navigate = useNavigate();
  const steps = [
    <EmailForm onSubmit={nextStep} />,
    <PasswordForm onSubmit={nextStep} />,
    <UserForm onSubmit={nextStep} />,
    <PlanForm onSubmit={handleFinalSubmit} />,
  ];
  const { currentStepIndex, step, next, back } = useMultiStepForm(steps);

  function nextStep(data) {
    // Handle the form data of the current step
    console.log(data);
    next();
  }

  function handleFinalSubmit(data) {
    console.log(data);
    AxiosInstance.post("register/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("registered successfully");
        navigate(`/connexion`);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  }

  return (
    <section className="flex h-screen">
      <aside className="flex flex-1 flex-col gap-24">
        <Link to={"/"} className="flex mt-7 ml-8 items-center">
          {/* <img className="w-10" src="/logo_no_bg.png" alt="Logo du site" /> */}
          {/* <h1 className="text-2xl font-bold font-sans">FairBank</h1> */}
          <h1 className="text-6xl font-jomhuria">FairBank</h1>
        </Link>
        <div className="w-full px-10">
          <img src="/login.svg" alt="Sign in image" />
        </div>
      </aside>
      {/* <section className="flex flex-1 justify-center w-80 bg-green-50"> */}
      <section className="flex flex-1 justify-center w-80 bg-white">
        <div className="absolute top-0 right-0 m-5">
          <Link to={"/connexion"}>
            <Button variant={"ghost"}>Se connecter</Button>
          </Link>
        </div>
        {/* <Card className="w-96 h-[25rem] mt-52"> */}
        {step}
        {currentStepIndex > 0 && <Button onClick={back}>Back</Button>}
      </section>
    </section>
  );
}
