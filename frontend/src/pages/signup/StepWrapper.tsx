import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type StepWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
  isLastStep?: boolean;
};

export default function StepWrapper({
  title,
  description,
  children,
  isLastStep,
}: StepWrapperProps) {
  return (
    // DEBUG: Remove border debugger
    <Card className="h-[25rem] w-96 border-none shadow-none">
      {/* <Card className="h-[25rem] w-96 border shadow-md"> */}
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        {children}
        <div className="mt-6 flex w-full">
          {/* <Button type="submit" onClick={onNext} className="ml-auto"> */}
          <Button type="submit" className="ml-auto">
            {isLastStep ? "Soumettre" : "Suivant"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
