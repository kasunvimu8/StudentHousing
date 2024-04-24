"use client";

import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const DialogComponent = ({
  children,
  buttonTitle,
  cls,
  dialogTitle,
  dialogDescription,
  submitTitleMain,
  submitMainButtonDisable,
  submitTitleSecondary,
  clickSubmit,
}: {
  children: ReactNode;
  buttonTitle: string;
  cls: string;
  dialogTitle: string;
  dialogDescription: string;
  submitTitleMain: string;
  submitMainButtonDisable?: boolean;
  submitTitleSecondary?: string;
  clickSubmit: () => void;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className={cls}>
            {buttonTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription className="pt-4">
              {dialogDescription}
            </DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="pt-5">
            {submitTitleSecondary && (
              <DialogClose asChild>
                <Button type="submit">{submitTitleSecondary}</Button>
              </DialogClose>
            )}
            <DialogClose asChild>
              <Button
                type="submit"
                className="primary-background-color secondary-font-color"
                disabled={submitMainButtonDisable}
                onClick={() => clickSubmit()}
              >
                {submitTitleMain}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
