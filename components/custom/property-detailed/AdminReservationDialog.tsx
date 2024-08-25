"use client";

import {
  formatDateTime,
  formatDateToISOStringWithTimeZone,
  getRelsitingDate,
} from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { RiMailSendLine } from "react-icons/ri";
import { LuListPlus, LuListStart, LuSend } from "react-icons/lu";
import { PiWarningCircleLight } from "react-icons/pi";
import { MdOutlineDone } from "react-icons/md";
import { useState } from "react";
import { BaseComponent as Calender } from "@/components/ui/calendar/BaseComponent";
import {
  handleRelistingProperty,
  sendRentalEndConfirmationEmail,
} from "@/actions/rentals";
import DialogComponent from "@/components/shared/DialogComponent";
import { Property, userProfileExtended } from "@/types";
import { BaseComponent } from "@/components/ui/dropdown/BaseComponent";
import { Label } from "@/components/ui/label";
import { reservationPeriods } from "@/constants";
import { ComboboxComponent } from "@/components/ui/combo/BaseComponent";
import { getAllProfiles } from "@/actions/profiles";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { assignReservation } from "@/actions/reservations";
import DatePicker from "@/components/ui/NewCalender";

export function AdminReservationDialog({
  property,
  tenants,
}: {
  property: Property;
  tenants: userProfileExtended[];
}) {
  const [period, setPeriod] = useState("");
  const [user, setUser] = useState("");
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();

  const today = new Date();
  const toDate = new Date(
    today.getFullYear() + 2,
    today.getMonth(),
    today.getDate()
  );
  const fromDate = today;

  const tenantsList = tenants?.map((tenants) => ({
    id: tenants.user_id,
    value: tenants.user_id,
    label: tenants.user_id,
  }));

  const onValueChange = (value: string) => {
    setUser(value);
  };

  const handleReservation = async () => {
    const res: { msg: string; type: string } = await assignReservation({
      property_ref_id: property._id,
      desired_semesters_stay: period,
      user_id: user,
      from: from,
    });
    if (res) {
      toast({
        title: `Property ${property.property_id} : Reservation Assignment ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
        variant: res.type === "ok" ? "ok" : "error",
      });

      if (res.type === "ok") {
        router.push("/manage-reservations");
      } else {
        router.push("/properties");
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-end gap-2 pt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="py-5 px-7 text-bold primary-background-color secondary-font-color gap-2"
            >
              Reserve for Tanent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{`Reserve Property ${property.property_id} for Tenant`}</DialogTitle>
              <DialogDescription className="pt-4">
                Upon confirmation, the property will be temporarily reserved for
                the below selected tenant
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm font-normal primary-light-font-color flex items-center">
                Select the Tanent by Entrollment Id
              </div>
              <div className="text-sm font-normal">
                <ComboboxComponent
                  notfoundLabel="No Tenant Found"
                  placeholder="Search Tenant"
                  options={tenantsList}
                  value={user}
                  onValueChange={onValueChange}
                  showAllItem={false}
                />
              </div>
              <div className="text-sm font-normal primary-light-font-color flex items-center">
                Number of semesters to reserve
              </div>
              <div className="text-sm font-normal">
                <BaseComponent
                  value={period}
                  options={reservationPeriods}
                  optionsLabel={"Desired semesters stay"}
                  showAllItem={false}
                  handleSelect={(selectItem: string) => {
                    const periodItem = reservationPeriods.find(
                      (option) => option.id === selectItem
                    );
                    if (periodItem?.id) {
                      setPeriod(periodItem.id);
                    }
                  }}
                />
              </div>
              <div className="text-sm font-normal primary-light-font-color flex items-center">
                Select Possible Starting Date
              </div>
              <div className="text-sm font-normal">
                <DatePicker
                  value={from ? new Date(from) : undefined}
                  onChange={(value: string) => {
                    setFrom(new Date(value));
                  }}
                  selectionType="year"
                  fromDate={fromDate}
                  toDate={toDate}
                />
              </div>
            </div>

            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="primary-background-color secondary-font-color gap-2"
                  disabled={!period || !user || !from}
                  onClick={handleReservation}
                >
                  Reserve
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
