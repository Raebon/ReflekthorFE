import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Terminal } from "lucide-react";

interface AlertBoxProps {
  variant?: "default" | "destructive" | null | undefined;
  title: string;
  description: React.ReactNode | string;
}

const AlertBox: FC<AlertBoxProps> = ({ variant, title, description }) => {
  return (
    <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertBox;
