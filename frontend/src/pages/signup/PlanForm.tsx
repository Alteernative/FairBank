import { useFormContext } from "react-hook-form";
import StepWrapper from "./StepWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import formatCurrency from "@/utils/formatCurrency";
import { Link } from "react-router-dom";
import { CircleAlert, Wallet, Award, Crown } from "lucide-react";

export default function PlanForm({ isLastStep, isSubmitting }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const plans = [
    {
      id: "tier1",
      name: "Régulier",
      icon: Wallet,
      price: 25,
    },
    {
      id: "tier2",
      name: "Premium",
      icon: Award,
      price: 40,
    },
    {
      id: "tier3",
      name: "Ultime",
      icon: Crown,
      price: 85,
    },
  ];

  const selectedPlanId = watch("plan");

  return (
    <StepWrapper
      title="Plan bancaire"
      description="Choisissez un de nos plans bancaires pour créer votre compte."
      isLastStep={isLastStep}
      isSubmitting={isSubmitting}
    >
      <div className="relative flex flex-col gap-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`w-full flex-1 shadow-none transition-all duration-200 hover:border-primary ${selectedPlanId === plan.id ? "border-primary" : ""}`}
          >
            <input
              id={`plan-${plan.id}`}
              type="radio"
              className="hidden"
              value={plan.id}
              {...register("plan")}
            />
            <label htmlFor={`plan-${plan.id}`}>
              <CardHeader className="flex cursor-pointer flex-row items-center justify-between">
                <plan.icon size={32} />
                <CardTitle className="text-center text-xl">
                  {plan.name}
                </CardTitle>
                <span className="content-center font-jomhuria text-3xl">{`${formatCurrency(plan.price)}/mo`}</span>
              </CardHeader>
            </label>
          </Card>
        ))}
        {errors.plan && (
          <span className="mb-2 flex items-center gap-1 text-xs text-destructive">
            <CircleAlert size={20} />
            {errors.plan.message && String(errors.plan.message)}
          </span>
        )}

        <Link
          to="/particuliers"
          target="_blank"
          className="absolute -bottom-11 left-0 rounded-md px-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Plus d'infos sur les plans.
        </Link>
      </div>
    </StepWrapper>
  );
}
