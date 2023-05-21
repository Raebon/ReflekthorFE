import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { Trash } from "lucide-react";

interface CategoryDeleteDialogProps {
  description: string;
  handleOnDelete: () => void;
  customButtonElement?: React.ReactNode;
}

const DeleteDialog: FC<CategoryDeleteDialogProps> = ({
  description,
  handleOnDelete,
  customButtonElement,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {customButtonElement ? (
          customButtonElement
        ) : (
          <Button variant="destructive">
            <Trash className="w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOnDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
