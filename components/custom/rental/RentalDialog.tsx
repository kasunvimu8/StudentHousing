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
import { handleRelistingProperty, sendRentalEndConfirmationEmail } from "@/actions/rentals";

export function RentalDialog({
  data,
  actionOutputHandle,
}: {
  data: {
    reservation_id: string;
    property_id: string;
    rental_end_property_dispatch: boolean;
    rental_end_tenant_confirmation_status: boolean;
    days_to_end_rental: number;
    rental_end_last_email_sent_date: string;
    rental_end_email_sent_count: number;
    to: string;
  };
  actionOutputHandle: (title: string, type: string, msg: string) => void;
}) {
  const [relistingDate, setRelistingDate] = useState(getRelsitingDate(data.to));

  const emailSentDate =
    data.rental_end_last_email_sent_date &&
    data.rental_end_last_email_sent_date !== "undefined"
      ? formatDateTime(new Date(data.rental_end_last_email_sent_date))
          .simpleDateTime
      : "-";

  const endDate = data.to ? formatDateTime(new Date(data.to)).simpleDate : "-";
  const emailSentText =
    data.rental_end_email_sent_count > 0 ? "Resend Email" : "Send Email";

  const handleEmailSent = async (reservation_id: string) => {
    const res = await sendRentalEndConfirmationEmail(reservation_id);

    actionOutputHandle("Email Send", res.type, res.msg);
  };

  const handleRelisting = async (
    date: string,
    reservation_id: string,
    property_id: string
  ) => {
    const res = await handleRelistingProperty(
      date,
      reservation_id,
      property_id
    );

    actionOutputHandle("Relisting", res.type, res.msg);
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4">
        <div className="col-span-1">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none primary-light-font-color">
              Num. of Emails Sent
            </h4>
            <p className="text-sm text-muted-foreground">
              {data.rental_end_email_sent_count}
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none primary-light-font-color ">
              Last Email Date
            </h4>
            <p className="text-sm text-muted-foreground">{emailSentDate}</p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none primary-light-font-color">
              Days to End
            </h4>
            <p className="text-sm text-muted-foreground">
              {data.days_to_end_rental}
            </p>
          </div>
        </div>
        <div className="col-span-1">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none primary-light-font-color">
              Tenant Confirmation
            </h4>
            <p className="text-sm text-muted-foreground">
              {data.rental_end_tenant_confirmation_status
                ? "Confirmed"
                : "Not Confirmed"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-6">
        {!data.rental_end_property_dispatch && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="py-5 px-7 text-bold primary-background-color secondary-font-color gap-2"
              >
                Relist the Property
                <LuListStart className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Property Relist : Are you absolutely sure ?
                </DialogTitle>
                {data.rental_end_tenant_confirmation_status ? (
                  <DialogDescription className="pt-4 flex items-center gap-2 success-color">
                    <MdOutlineDone className="w-5 h-5" />
                    The tenant has confirmed the moving out.
                  </DialogDescription>
                ) : (
                  <DialogDescription className="pt-4 flex items-center gap-2 hightlight-font-color">
                    <PiWarningCircleLight className="w-5 h-5" />
                    The tenant has not yet confirmed about moving out.
                  </DialogDescription>
                )}
              </DialogHeader>

              {!data.rental_end_tenant_confirmation_status && (
                <p className="text-sm text-muted-foreground">
                  Once click Relist, the property will be made avaialble for the
                  other tenants to reserver. If the current tenant is not
                  confirmed yet regarding moving out, it is highly recommended
                  to wait until the confirmation to avoid future conflicts
                </p>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div className="text-sm font-normal primary-light-font-color flex items-center">
                  Rented From
                </div>
                <div className="text-sm font-normal col-span-2">
                  <Calender
                    date={new Date(relistingDate)}
                    handleSelect={(value) =>
                      setRelistingDate(
                        String(formatDateToISOStringWithTimeZone(value))
                      )
                    }
                  />
                </div>
              </div>
              <DialogFooter className="pt-5">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="primary-background-color secondary-font-color gap-2"
                    disabled={false}
                    onClick={() => {
                      handleRelisting(
                        relistingDate,
                        data.reservation_id,
                        data.property_id
                      );
                    }}
                  >
                    Relist <LuListPlus className="w-5 h-5" />
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {!data.rental_end_tenant_confirmation_status && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="py-5 px-7 text-bold primary-background-color secondary-font-color gap-2"
              >
                {emailSentText}
                <RiMailSendLine className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Email Send : Are you absolutely sure ?
                </DialogTitle>
                <DialogDescription className="pt-4">{""}</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Once click send, an email will be sent to the tenant's email
                address, along with a link to confirm the tenant's move-out date
                of {endDate}. Once confirmation is received from the tenant, it
                will be acknowledged in our system. Thereafter, you will be able
                to relist the property for the next tenant.
              </p>
              <DialogFooter className="pt-5">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="primary-background-color secondary-font-color gap-2"
                    disabled={false}
                    onClick={() => {
                      handleEmailSent(data.reservation_id);
                    }}
                  >
                    Send <LuSend />
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
