"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { formatDateTime, isFunction } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { propertyTypes } from "@/constants";
import { ExtendedColumnDef } from "@/types";

/* Server Action to Delete Property */
import { deleteProperty } from "@/actions/properties";

const handlePropertyDelete = async (
  id: string,
  property_id: string,
  customData: any
) => {
  const res = await deleteProperty(id);
  const toast = isFunction(customData?.toast) ? customData?.toast : undefined;

  if (res && toast) {
    toast({
      title: `Property ${property_id} : Delete ${
        res.type === "ok" ? "Success" : "Failed"
      }`,
      description: res.msg,
    });
  }
};

export const columns: ExtendedColumnDef[] = [
  {
    accessorKey: "_id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
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
    enableHiding: false,
    columnTitle: "Room ID",
  },
  {
    accessorKey: "property_type",
    header: "Property Type",
    cell: ({ row }) => {
      const typeId = row.getValue("property_type");
      const propertyTypeDesc = propertyTypes.find((type) => type.id === typeId);
      return <div className="capitalize">{propertyTypeDesc?.description}</div>;
    },
    enableHiding: false,
    columnTitle: "Property Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    enableHiding: false,
    columnTitle: "Status",
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
    accessorKey: "rent",
    header: () => <div className="text-right">Rent</div>,
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("rent"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    columnTitle: "Rent",
  },
  {
    accessorKey: "from",
    header: "From Date",
    cell: ({ row }) => {
      const from = row.getValue("from");
      const date = formatDateTime(new Date(String(from))).simpleDate;
      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "From Date",
  },
  {
    accessorKey: "to",
    header: "To Date",
    cell: ({ row }) => {
      const to = row.getValue("to");
      const date = to ? formatDateTime(new Date(String(to))).simpleDate : "-";
      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "To Date",
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("created_by")}</div>
    ),
    columnTitle: "Created By",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = row.getValue("created_at");
      const date = formatDateTime(new Date(String(created_at))).simpleDateTime;

      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Created At",
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("updated_by")}</div>
    ),
    columnTitle: "Updated By",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const created_at = row.getValue("updated_at");
      const date = formatDateTime(new Date(String(created_at))).simpleDateTime;

      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Updated At",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, ...rest }) => {
      const propertyId = row.getValue("_id");
      const router = useRouter();
      const columnDef: ExtendedColumnDef = rest?.column?.columnDef;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Action Menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/property/edit/${propertyId}`, { scroll: false })
              }
              className="hover:section-light-background-color"
            >
              Edit Property
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handlePropertyDelete(
                  String(propertyId),
                  row.getValue("property_id"),
                  columnDef?.customData
                )
              }
              className="hover:section-light-background-color"
            >
              Delete Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
