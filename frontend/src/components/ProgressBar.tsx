import { Progress } from "@/components/ui/progress";

export function ProgressBar({ transactionsCount, upperLimit }) {
  const progress = (transactionsCount / upperLimit) * 100;

  return <Progress value={progress} className="w-full" />;
}
