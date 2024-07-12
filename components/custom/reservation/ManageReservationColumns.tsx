"use client";

import { Button } from "@/components/ui/button";
import { propertyTypes, reservationCancelled, reservationStatuses } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { ExtendedColumnDef } from "@/types";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    accessorKey: "room_id",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("room_id")}</div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    columnTitle: "Room ID",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusData = reservationStatuses.find((item) => item.id === status);
      return <div className="capitalize">{statusData?.description || ""}</div>;
    },
    columnTitle: "Status",
    enableHiding: false,
  },
  {
    accessorKey: "desired_semesters_stay",
    header: "Num. Semesters",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("desired_semesters_stay")}</div>
    ),
    columnTitle: "Num. Semesters",
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
    header: "To",
    cell: ({ row }) => {
      const to = row.getValue("to");
      const status = row.getValue("status");
      const date = to ? formatDateTime(new Date(String(to))).simpleDate : "-";
      const statusData = reservationStatuses.find((item) => item.id === status);

      const removeEndDate = statusData?.id === reservationCancelled;
      return <div className="capitalize">{removeEndDate ? '-' : date}</div>;
    },
    columnTitle: "To",
  },
  {
    accessorKey: "created_at",
    header: "Reserved At",
    cell: ({ row }) => {
      const created_at = row.getValue("created_at");
      const date = formatDateTime(new Date(String(created_at))).simpleDateTime;

      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Reserved At",
  },
  {
    accessorKey: "document_submission_deadline",
    header: "Doc. Submission Deadline",
    cell: ({ row }) => {
      const document_submission_deadline = row.getValue("document_submission_deadline");
      const date = formatDateTime(new Date(String(document_submission_deadline))).simpleDateTime;

      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Doc. Submission Deadline",
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
      const id: string = row.getValue("property_ref_id");
      const refId: string = row.getValue("_id");
      const router = useRouter();
      const [open, setOpen] = React.useState(false);

      return (
        <DropdownMenu open={open} onOpenChange={() => setOpen((open) => !open)}>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Action Menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white"
            hideWhenDetached={true}
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/reservation/${refId}`, { scroll: false })
              }
              className="hover:section-light-background-color"
            >
              Reservation Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/property/view/${id}`, { scroll: false })
              }
              className="hover:section-light-background-color"
            >
              View Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
