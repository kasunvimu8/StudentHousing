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
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PropertyDataTableType } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { propertyTypes } from "@/constants";

const handlePropertyDelete = (id: string) => {
  console.log(id);
};

export const columns: ColumnDef<PropertyDataTableType | any>[] = [
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "rent",
    header: () => <div className="text-right">Rent</div>,
    cell: ({ row }) => {
      const amount = parseInt(row.getValue("rent"));

      // Format the amount as a euro amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "from",
    header: "From Date",
    cell: ({ row }) => {
      const from = row.getValue("from");
      const date = formatDateTime(new Date(String(from))).simpleDate;
      return <div className="capitalize">{date}</div>;
    },
  },
  {
    accessorKey: "to",
    header: "To Date",
    cell: ({ row }) => {
      const to = row.getValue("to");
      const date = to ? formatDateTime(new Date(String(to))).simpleDate : "-";
      return <div className="capitalize">{date}</div>;
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("created_by")}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = row.getValue("created_at");
      const date = formatDateTime(new Date(String(created_at))).simpleDateTime;

      return <div className="capitalize">{date}</div>;
    },
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("updated_by")}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const created_at = row.getValue("updated_at");
      const date = formatDateTime(new Date(String(created_at))).simpleDateTime;

      return <div className="capitalize">{date}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const propertyId = row.getValue("property_id");
      const router = useRouter();

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
              onClick={() => handlePropertyDelete(String(propertyId))}
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
