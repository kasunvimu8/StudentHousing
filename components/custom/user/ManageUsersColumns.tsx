"use client";

import { Button } from "@/components/ui/button";
import { userRoles } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { ExtendedColumnDef } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

export const columns: ExtendedColumnDef[] = [
  {
    accessorKey: "_id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
    header: "User Id",
    columnTitle: "Reservation Id",
    enableHiding: false,
  },
  {
    accessorKey: "user_name",
    cell: ({ row }) => (
      <div>{row.getValue("user_name")}</div>
    ),
    header: "User Name",
    columnTitle: "User Name",
    enableHiding: false,
  },
  {
    accessorKey: "user_email",
    cell: ({ row }) => (
      <div>{row.getValue("user_email")}</div>
    ),
    header: "Email",
    columnTitle: "Email",
    enableHiding: false,
  },
  {
    accessorKey: "role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      const statusData = userRoles.find((item) => item.id === role);
      return <div className="capitalize">{statusData?.description || ""}</div>;
    },
    header: "Role",
    columnTitle: "Role",
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
          NIC/Passport
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
    columnTitle: "NIC/Passport",
  },
  // {
  //   accessorKey: "enrollment_id",
  //   cell: ({ row }) => (
  //     <div className="text-center font-medium">
  //       {row.getValue("enrollment_id")}
  //     </div>
  //   ),
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Enrollment ID
  //         <CaretSortIcon className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   enableHiding: false,
  //   columnTitle: "Enrollment ID",
  // },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created_at = row.getValue("created_at");
      const date = created_at
        ? formatDateTime(new Date(String(created_at))).simpleDate
        : "-";
      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const updated_at = row.getValue("updated_at");
      const date = updated_at
        ? formatDateTime(new Date(String(updated_at))).simpleDate
        : "-";
      return <div className="capitalize">{date}</div>;
    },
    columnTitle: "Updated At",
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const user_id = row.getValue("user_id");
      return (
        <Button
          variant="ghost"
          onClick={() => {
            router.push(`/manage-users/${user_id}`, { scroll: false });
          }}
        >
          <LuArrowRight />
        </Button>
      );
    },
  },
];
