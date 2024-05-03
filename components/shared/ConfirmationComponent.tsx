import React, { ReactNode } from "react";
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
} from "@/components/ui/alert-dialog";

const ConfirmationComponent = ({
  children,
  title,
  description,
  confirmedCallback,
  disabled,
}: {
  children: ReactNode;
  title: string;
  description: string;
  confirmedCallback: () => void;
  disabled?: boolean;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription> {description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="primary-background-color secondary-font-color"
            onClick={confirmedCallback}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationComponent;
