import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Loader } from "lucide-react";

type StepWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
  isLastStep?: boolean;
  isSubmitting?: boolean;
};

export default function StepWrapper({
  title,
  description,
  children,
  isLastStep,
  isSubmitting,
}: StepWrapperProps) {
  return (
    <Card className="h-[25rem] w-96 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        {children}
        <div className="mt-6 flex w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto w-32"
          >
            {isLastStep ? (
              isSubmitting ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Soumettre"
              )
            ) : (
              "Suivant"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
