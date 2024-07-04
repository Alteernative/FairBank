import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function FormWrapper({
  title,
  description,
  children,
}: FormWrapperProps) {
  return (
    <Card className="h-[25rem] w-96 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
