"use client";

import { Button } from "@/components/ui/button";
import { defaultNoticePeriod } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { ExtendedColumnDef } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RentalDialog } from "@/components/custom/rental/RentalDialog";
import { MdOpenInNew } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
export const columns: ExtendedColumnDef[] = [
  {
    accessorKey: "_id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
    header: "Reservation Id",
    columnTitle: "Reservation Id",
  },
  {
    accessorKey: "property_ref_id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("property_ref_id")}</div>
    ),
    header: "Property Reference Id",
    columnTitle: "Property Reference Id",
    enableHiding: false,
  },
  {
    accessorKey: "property_id",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("property_id")}
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Property ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
    columnTitle: "Property ID",
  },
  {
    accessorKey: "user_id",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("user_id")}</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
    columnTitle: "Room ID",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
    columnTitle: "Address",
  },
  {
    accessorKey: "from",
    header: "Available From",
    cell: ({ row }) => {
      const from = row.getValue("from");
      const date = from
        ? formatDateTime(new Date(String(from))).simpleDate
        : "-";
      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Available From",
  },
  {
    accessorKey: "to",
    header: "End Date",
    cell: ({ row }) => {
      const to = row.getValue("to");
      const date = to ? formatDateTime(new Date(String(to))).simpleDate : "-";

      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "End Date",
  },
  {
    accessorKey: "notice_period",
    header: "Notice Period",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.getValue("notice_period") || defaultNoticePeriod}
        </div>
      );
    },
    columnTitle: "Notice Period",
    enableHiding: true,
  },
  {
    accessorKey: "rental_end_email_sent_count",
    header: "Num. Emails Sent",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.getValue("rental_end_email_sent_count")}
        </div>
      );
    },
    columnTitle: "Num. Emails Sent",
    enableHiding: true,
  },
  {
    accessorKey: "rental_end_last_email_sent_date",
    header: "Last Email Date",
    cell: ({ row }) => {
      const date = row.getValue("rental_end_last_email_sent_date");
      const formattedDate = date
        ? formatDateTime(new Date(String(date))).simpleDate
        : "-";
      return <div className="capitalize">{formattedDate}</div>;
    },
    columnTitle: "Last Email Date",
    enableHiding: true,
  },
  {
    accessorKey: "days_to_end_rental",
    header: "Days to End",
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("days_to_end_rental")}</div>
      );
    },
    columnTitle: "Last Email Date",
    enableHiding: true,
  },
  {
    accessorKey: "rental_end_tenant_confirmation_status",
    header: "Tenant confirmation",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.getValue("rental_end_tenant_confirmation_status")
            ? "Confirmed"
            : "Not confirmed"}
        </div>
      );
    },
    columnTitle: "Tenant confirmation",
    enableHiding: true,
  },
  {
    accessorKey: "rental_end_property_dispatch",
    header: "Property Dispatch Status",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.getValue("rental_end_property_dispatch") ? "Yes" : "No"}
        </div>
      );
    },
    columnTitle: "Property Dispatch Status",
    enableHiding: true,
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const updated_at = row.getValue("updated_at");
      const date = updated_at
        ? formatDateTime(new Date(String(updated_at))).simpleDateTime
        : "-";

      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Updated At",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row, ...rest }) => {
      const [open, setOpen] = useState(false);
      const { toast } = useToast();

      const refId: string = row.getValue("_id");
      const data = {
        reservation_id: refId,
        property_id: String(row.getValue("property_ref_id")),
        rental_end_property_dispatch: Boolean(
          row.getValue("rental_end_property_dispatch")
        ),
        rental_end_tenant_confirmation_status: Boolean(
          row.getValue("rental_end_tenant_confirmation_status")
        ),
        days_to_end_rental: Number(row.getValue("days_to_end_rental")),
        rental_end_last_email_sent_date: String(
          row.getValue("rental_end_last_email_sent_date")
        ),
        rental_end_email_sent_count: Number(
          row.getValue("rental_end_email_sent_count")
        ),
        to: String(row.getValue("to")),
      };

      const actionOutputHandle = (title: string, type: string, msg: string) => {
        toast({
          title: `${title} : ${type === "ok" ? "Success" : "Failed"}`,
          description: msg,
          variant: type === "ok" ? "ok" : "error",
        });

        setOpen(false);
      };

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MdOpenInNew className="w-5 h-5 transform -rotate-90" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>
                Moving Out Handle - Reservation Id
                <span className="font-xs primary-light-font-color">
                  ({refId})
                </span>
              </DialogTitle>
              <DialogDescription>
                You can inform and get confirmation from tenant's move-out date
                by emailing them about the termination notice with a
                confirmation form and, once confirmed, relist the property.
              </DialogDescription>
            </DialogHeader>
            <RentalDialog data={data} actionOutputHandle={actionOutputHandle} />
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
