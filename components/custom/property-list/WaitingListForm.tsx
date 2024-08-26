"use client";

import { useState } from "react";
import { z } from "zod";
import DatePicker from "@/components/ui/NewCalender";
import {
  deleteWaitingListEntry,
  saveWaitingList,
} from "@/actions/waiting-list";
import { propertyTypes, reservationPeriods } from "@/constants";
import { BaseComponent as Select } from "@/components/ui/dropdown/BaseComponent";
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
import { LuInfo, LuSend } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/shared/Loading";
import { MdDeleteOutline } from "react-icons/md";
import { WaitinRecordType } from "@/types";

const WaitingListSchema = z.object({
  fromDate: z.date(),
  maxRent: z.number().gt(0),
  apartmentType: z.string().min(1),
  desiredSemesters: z.string().min(1),
  additionalData: z.string().optional(),
});

export default function WaitingListForm({
  existingData,
  isUpdate,
}: {
  existingData: WaitinRecordType;
  isUpdate: boolean;
}) {
  const [formData, setFormData] = useState(existingData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function resetFormData() {
    setFormData({
      fromDate: new Date(),
      maxRent: 0,
      apartmentType: "all",
      desiredSemesters: "1",
      additionalData: "",
    });
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const validation = WaitingListSchema.safeParse(formData);
      if (!validation.success) {
        const formErrors: { [key: string]: string } = {};
        validation.error.errors.forEach((error) => {
          if (error.path.length > 0) {
            formErrors[error.path[0]] = error.message;
          }
        });
        setErrors(formErrors);
        return;
      }
      const { msg, type } = await saveWaitingList(formData);
      if (type === "ok") {
        setOpen(false);
      }

      toast({
        title: `Waiting list entry operation : ${
          type === "ok" ? "Success" : "Failed"
        } `,
        description: msg,
        variant: type,
      });
    } catch (error) {
      console.log("Waiting list record submit error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { msg, type } = await deleteWaitingListEntry();
      if (type === "ok") {
        resetFormData();
        setOpen(false);
      }

      toast({
        title: `Waiting list entry deletion : ${
          type === "ok" ? "Success" : "Failed"
        } `,
        description: msg,
        variant: type,
      });
    } catch (error) {
      console.log("Waiting list record delete error : ", error);
    }
  };

  const today = new Date();
  const toDate = new Date(
    today.getFullYear(),
    today.getMonth() + 6,
    today.getDate()
  );
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="link" className="font-normal text-sm">
          Couldn't find what you're looking for ? Join our waiting list.
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Do you want to add to the waiting list ?</DialogTitle>
          <DialogDescription className="pt-4 flex items-center gap-2">
            Please provide us with the details of your interests, and we will
            allocate you a place once one becomes available.
          </DialogDescription>
          {isUpdate && (
            <div className="w-full text-xs font-normal primary-font-color flex items-center hightlight-font-color">
              <LuInfo className="mr-1" />
              Update entry does not impact your position in the waiting list.
            </div>
          )}
          <div className="w-full text-xs font-normal primary-font-color flex items-center hightlight-font-color">
            <LuInfo className="mr-1" />
            If you are searching for a place immediately, keep the from date as
            today.
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="pb-1">From Date</label>
            <DatePicker
              value={
                formData.fromDate ? new Date(formData.fromDate) : undefined
              }
              onChange={(value: string) => {
                setErrors((erros) => ({ ...erros, fromDate: "" }));
                handleChange("fromDate", new Date(value));
              }}
              selectionType="year"
              fromDate={today}
              toDate={toDate}
            />
            {errors.fromDate && (
              <p className="failure-color text-xs pt-1">{errors.fromDate}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="pb-1">Apartment Type</label>
            <Select
              value={formData.apartmentType || ""}
              options={propertyTypes}
              optionsLabel="Select Property Status"
              showAllItem={true}
              handleSelect={(value) => {
                setErrors((erros) => ({ ...erros, apartmentType: "" }));
                handleChange("apartmentType", value);
              }}
            />
            {errors.apartmentType && (
              <p className="failure-color text-xs pt-1">
                {errors.apartmentType}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="pb-1">Desired Num. of Semesters</label>
            <Select
              value={formData.desiredSemesters || ""}
              options={reservationPeriods}
              optionsLabel="Select Num. of Semesters"
              showAllItem={false}
              handleSelect={(value) => {
                setErrors((erros) => ({ ...erros, desiredSemesters: "" }));
                handleChange("desiredSemesters", value);
              }}
            />
            {errors.apartmentType && (
              <p className="failure-color text-xs pt-1">
                {errors.apartmentType}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="pb-1">Max Rent (€)</label>
            <Input
              type="number"
              value={formData.maxRent || ""}
              onChange={(e) => {
                setErrors((erros) => ({ ...erros, maxRent: "" }));
                handleChange("maxRent", Number(e.target.value));
              }}
              className="w-full border p-2"
            />
            {errors.maxRent && (
              <p className="failure-color text-xs pt-1">{errors.maxRent}</p>
            )}
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="pb-1">Additional Details</label>
            <Textarea
              placeholder="Type any additional comments here."
              value={formData.additionalData}
              rows={2}
              onChange={(e) => handleChange("additionalData", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="pt-5">
          {isUpdate && (
            <Button
              className="primary-background-color secondary-font-color gap-2"
              disabled={false}
              onClick={handleDelete}
            >
              Delete <MdDeleteOutline className="w-5 h-5" />
            </Button>
          )}
          <Button
            type="submit"
            className="primary-background-color secondary-font-color gap-2"
            disabled={false}
            onClick={handleSubmit}
          >
            {isUpdate ? "Update" : "Submit"}
            {loading ? (
              <Loading className="w-5 h-5" />
            ) : (
              <LuSend className="w-5 h-5" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
