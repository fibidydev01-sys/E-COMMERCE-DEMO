import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Alamat" },
  { id: 2, name: "Pengiriman" },
  { id: 3, name: "Pembayaran" },
  { id: 4, name: "Konfirmasi" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <div className="flex items-center">
              <span className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-colors",
                currentStep > step.id ? "bg-primary border-primary text-white" : currentStep === step.id ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground"
              )}>
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </span>
              <span className={cn("ml-3 text-sm font-medium hidden sm:block", currentStep >= step.id ? "text-foreground" : "text-muted-foreground")}>{step.name}</span>
            </div>
            {index < steps.length - 1 && <div className={cn("w-12 sm:w-24 h-0.5 mx-4", currentStep > step.id ? "bg-primary" : "bg-muted")} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}