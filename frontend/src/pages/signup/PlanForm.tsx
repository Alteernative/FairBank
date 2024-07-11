import { useForm } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import formatCurrency from "@/utils/formatCurrency";
import { useState } from "react";
import { MdAccountBalanceWallet } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaCrown } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

  return (
    <StepWrapper
      title="Plan bancaire"
      description="Choisissez un plan bancaire pour créer votre compte."
      isLastStep={isLastStep}
      isSubmitting={isSubmitting}
    >
      <section className="flex w-full flex-col gap-3">
        <Card
          className={`w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary ${selectedPlan === "tier1" ? "border-primary" : ""}`}
          onClick={() => handleSelectPlan("tier1")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <MdAccountBalanceWallet size={32} />
            <CardTitle className="text-center text-xl">Régulier</CardTitle>
            <span className="content-center font-jomhuria text-3xl">{` ${formatCurrency(25)}/mo`}</span>
          </CardHeader>
        </Card>

        <Card
          className={`w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary ${selectedPlan === "tier2" ? "border-primary" : ""}`}
          onClick={() => handleSelectPlan("tier2")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <MdOutlineWorkspacePremium size={32} />
            <CardTitle className="text-center text-xl">Premium</CardTitle>
            <span className="content-center font-jomhuria text-3xl">{` ${formatCurrency(50)}/mo`}</span>
          </CardHeader>
        </Card>
        <Card
          className={`w-full flex-1 cursor-pointer shadow-none transition-all duration-200 hover:border-primary ${selectedPlan === "tier3" ? "border-primary" : ""}`}
          onClick={() => handleSelectPlan("tier3")}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <FaCrown size={32} />
            <CardTitle className="text-center text-xl">Ultime</CardTitle>
            <span className="content-center font-jomhuria text-3xl">{` ${formatCurrency(100)}/mo`}</span>
          </CardHeader>
        </Card>
      </section>
      <input type="hidden" {...register("plan")} value={selectedPlan} />
    </StepWrapper>
  );
}
