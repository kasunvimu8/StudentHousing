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
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";

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
    header: "Property ID",
    enableHiding: false,
    columnTitle: "Property ID",
  },
  {
    accessorKey: "room_id",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("room_id")}</div>
    ),
    header: "Room ID",
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
    cell: async ({ row, ...rest }) => {
      const propertyId: string = row.getValue("_id");
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
                router.push(`/property/view/${propertyId}`, { scroll: false })
              }
              className="hover:section-light-background-color"
            >
              View Property
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/property/edit/${propertyId}`, { scroll: false })
              }
              className="hover:section-light-background-color"
            >
              Edit Property
            </DropdownMenuItem>

            <ConfirmationComponent
              title="Are you absolutely sure ?"
              description="This action cannot be undone. This will permanently delete the
            property and its all data from the system."
              confirmedCallback={() => {
                handlePropertyDelete(
                  String(propertyId),
                  row.getValue("property_id"),
                  columnDef?.customData
                );
              }}
            >
              <div
                role="menuitem"
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:section-light-background-color"
              >
                Delete Property
              </div>
            </ConfirmationComponent>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
