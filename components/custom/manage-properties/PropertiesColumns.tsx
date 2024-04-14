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

export const columns: ColumnDef<PropertyDataTableType | any>[] = [
  {
    accessorKey: "property_id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("property_id")}</div>
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
  },
  {
    accessorKey: "property_type",
    header: "Property Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("property_type")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Property Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
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
    accessorKey: "tanent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanent Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("tanent")}</div>
    ),
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
              <span className="sr-only">Open menu</span>
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
              onClick={() => {
                console.log(" Check on delete ");
              }}
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
