import { FC } from "react";
import { Checkbox } from "@/ui/CheckBox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Label } from "@/ui/Label";
interface CustomCheckboxProps {
  id: string;
  label: string;
  mutedLabel?: string;
  onCheckedChange?: (e: CheckedState) => void;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  id,
  label,
  mutedLabel,
  onCheckedChange,
}) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id} onCheckedChange={onCheckedChange} />
      <div className="grid leading-none">
        <Label size="sm" htmlFor="checkbox-publish">
          {label}
        </Label>
        <p className="text-sm opacity-80">{mutedLabel}</p>
      </div>
    </div>
  );
};

export default CustomCheckbox;
