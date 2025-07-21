import { CheckoutSteps } from "@/components/checkout/checkout-steps";

interface CheckoutSectionProps {
  isVisible: boolean;
}

export function CheckoutSection({ isVisible }: CheckoutSectionProps) {
  return <CheckoutSteps isVisible={isVisible} />;
}