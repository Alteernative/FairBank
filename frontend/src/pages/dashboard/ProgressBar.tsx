import { Progress } from "@/components/ui/progress";
import * as React from "react";

export function ProgressBar({ transactionsCount, upperLimit }) {
  const progress = (transactionsCount / upperLimit) * 100;

  return <Progress value={progress} className="w-[100%]" />;
}
