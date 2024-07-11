import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import formatCurrency from "@/utils/formatCurrency";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaCrown } from "react-icons/fa6";

type PlanFormProps = {
  isLastStep: boolean;
  isSubmitting: boolean;
};

export default function PlanForm({ isLastStep, isSubmitting }: PlanFormProps) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const {
    register,
    formState: { errors },
  } = useForm();

  type Plan = {
    title: string;
    description: string;
    price: number;
  };

  const plans: { [key: string]: Plan } = {
    tier1: {
      title: "Régulier",
      description: "Description",
      price: 10,
    },
    tier2: {
      title: "Premium",
      description: "Description",
      price: 100,
    },
    tier3: {
      title: "Ultime",
      description: "Description",
      price: 500,
    },
  };

  const handleSelectPlan = (planTier: string) => {
    setSelectedPlan(planTier);
  };

  // return (
  //   <StepWrapper
  //     title="Plan bancaire"
  //     description="Choisissez un plan bancaire pour créer votre compte."
  //     isLastStep={isLastStep}
  //     isSubmitting={isSubmitting}
  //   >
  //     <Tabs
  //       defaultValue="tier1"
  //       className="flex flex-col items-center justify-center"
  //     >
  //       <TabsList>
  //         <TabsTrigger value="tier1">Régulier</TabsTrigger>
  //         <TabsTrigger value="tier2">Premium</TabsTrigger>
  //         <TabsTrigger value="tier3">Ultime</TabsTrigger>
  //       </TabsList>
  //       <TabsContent value="tier1" className="w-full">
  //         <Card className="flex-1 w-full">
  //           <CardHeader>
  //             <CardTitle className="text-center text-xl">Régulier</CardTitle>
  //             <CardDescription className="text-center">
  //               Plan de base, fonctionnalités essentielles.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="flex flex-col justify-between">
  //             Contenu
  //           </CardContent>
  //           <CardFooter>
  //             <div className="mt-6 flex w-full">
  //               <Button
  //                 type="submit"
  //                 // onClick={() => handleSelectPlan(planId)}
  //                 className="mx-auto rounded-2xl bg-green-500 hover:bg-green-600"
  //               >
  //                 {` ${formatCurrency(25)}/mo`}
  //               </Button>
  //             </div>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="tier2" className="w-full">
  //         <Card className="flex-1 w-full">
  //           <CardHeader>
  //             <CardTitle className="text-center text-xl">Premium</CardTitle>
  //             <CardDescription className="text-center">
  //               Plan avancé, avantages supplémentaires.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="flex flex-col justify-between">
  //             Nombre illimité d'opérations.
  //             {formatCurrency(15000)} en transactions quotidienne.
  //           </CardContent>
  //           <CardFooter>
  //             <div className="mt-6 flex w-full">
  //               <Button
  //                 type="submit"
  //                 // onClick={() => handleSelectPlan(planId)}
  //                 className="mx-auto rounded-2xl bg-green-500 hover:bg-green-600"
  //               >
  //                 {` ${formatCurrency(50)}/mo`}
  //               </Button>
  //             </div>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="tier3" className="w-full">
  //         <Card className="flex-1 w-full ">
  //           <CardHeader>
  //             <CardTitle className="text-center text-xl">Ultime</CardTitle>
  //             <CardDescription className="text-center">
  //               Plan exclusif, fonctionnalités complètes.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="flex flex-col justify-between">
  //             Nombre illimité d'opérations.
  //             <br />
  //             {formatCurrency(100000)} en transcations quotidiennes
  //           </CardContent>
  //           <CardFooter>
  //             <div className="mt-6 flex w-full">
  //               <Button
  //                 type="submit"
  //                 // onClick={() => handleSelectPlan(planId)}
  //                 className="mx-auto rounded-2xl bg-green-500 hover:bg-green-600"
  //               >
  //                 {` ${formatCurrency(100)}/mo`}
  //               </Button>
  //             </div>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>

  //     <input type="hidden" {...register("plan")} value={selectedPlan} />
  //   </StepWrapper>
  // );
  return (
    <StepWrapper
      title="Plan bancaire"
      description="Choisissez un plan bancaire pour créer votre compte."
      isLastStep={isLastStep}
      isSubmitting={isSubmitting}
    >
      <section className="flex w-full flex-col gap-3">
        <Card
          // className="w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary"
          className={`w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary ${selectedPlan === "tier1" ? "border-primary" : ""}`}
          onClick={() => handleSelectPlan("tier1")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <MdAccountBalanceWallet size={32} />
            <div>
              <CardTitle className="text-center text-xl">Régulier</CardTitle>
              {/* <CardDescription className="text-center">
                {` ${formatCurrency(25)}/mo`}
              </CardDescription> */}
            </div>
            <div className="content-center font-jomhuria text-3xl">{` ${formatCurrency(25)}/mo`}</div>
          </CardHeader>
        </Card>
        {/* <div className="w-full flex-1 cursor-pointer rounded-xl border p-3 shadow-none transition-all duration-200 hover:border-primary">
          <div className="flex flex-row items-center justify-around">
            <MdAccountBalanceWallet size={32} />
            <div>
              <CardTitle className="text-center text-xl">Régulier</CardTitle>
              <CardDescription className="text-center">
                {` ${formatCurrency(25)}/mo`}
              </CardDescription>
            </div>
          </div>
        </div> */}

        <Card
          // className="w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary"
          className={`w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary ${selectedPlan === "tier2" ? "border-primary" : ""}`}
          onClick={() => handleSelectPlan("tier2")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <MdOutlineWorkspacePremium size={32} />
            <div>
              <CardTitle className="text-center text-xl">Premium</CardTitle>
              {/* <CardDescription className="text-center">
                Description
              </CardDescription> */}
            </div>
            <div className="content-center font-jomhuria text-3xl">{` ${formatCurrency(50)}/mo`}</div>
          </CardHeader>
        </Card>
        {/* <div className="w-full flex-1 cursor-pointer rounded-xl border p-3 shadow-none transition-all duration-200 hover:border-primary">
          <div className="flex flex-row items-center justify-around">
            <MdOutlineWorkspacePremium size={32} />
            <div>
              <CardTitle className="text-center text-xl">Premium</CardTitle>
              <CardDescription className="text-center">
                {` ${formatCurrency(50)}/mo`}
              </CardDescription>
            </div>
          </div>
        </div> */}

        <Card
          // className="w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary"
          className={`w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary ${selectedPlan === "tier3" ? "border-primary" : ""}`}
          onClick={() => handleSelectPlan("tier3")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <FaCrown size={32} />
            <div>
              <CardTitle className="text-center text-xl">Ultime</CardTitle>
              {/* <CardDescription className="text-center">
                {` ${formatCurrency(100)}/mo`}
              </CardDescription> */}
            </div>
            <div className="content-center font-jomhuria text-3xl">{` ${formatCurrency(100)}/mo`}</div>
          </CardHeader>
        </Card>
        {/* <div className="w-full flex-1 cursor-pointer rounded-xl border p-3 shadow-none transition-all duration-200 hover:border-primary">
          <div className="flex flex-row items-center justify-around">
            <FaCrown size={32} />
            <div>
              <CardTitle className="text-center text-xl">Ultime</CardTitle>
              <CardDescription className="text-center">
                {` ${formatCurrency(100)}/mo`}
              </CardDescription>
            </div>
          </div>
        </div> */}
      </section>

      <input type="hidden" {...register("plan")} value={selectedPlan} />
    </StepWrapper>
  );
}
