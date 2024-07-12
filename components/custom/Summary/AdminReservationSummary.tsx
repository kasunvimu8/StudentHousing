"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuBookmark } from "react-icons/lu";
import { CiBookmarkRemove } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { HiOutlineDocument } from "react-icons/hi";
import Link from "next/link";

const AdminReservationSummary = ({
  totalReservations,
  rentedReservation,
  cancelled,
  documentSubmission,
}: {
  totalReservations: number;
  rentedReservation: number;
  cancelled: number;
  documentSubmission: number;
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/manage-reservations">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <LuBookmark />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReservations}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-reservations?status=rented">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rented</CardTitle>
            <MdDone />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rentedReservation}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-reservations?status=reservation_canceled">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <CiBookmarkRemove />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelled}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-reservations?status=document_submission">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Document Submission
            </CardTitle>
            <HiOutlineDocument />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentSubmission}</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default AdminReservationSummary;
