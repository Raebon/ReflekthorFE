"use client";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/Select";
import { SelectItemType } from "@/types/appTypes";

interface CustomSelectProps {
  items: SelectItemType[];
  onChangeValue: (e: any) => void;
  value: string;
  placeholder: string;
  isLoading: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({
  items,
  onChangeValue,
  value,
  placeholder,
  isLoading,
}) => {
  return (
    <Select onValueChange={onChangeValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={isLoading ? "Loading..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
