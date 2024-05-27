"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuBookmark, LuTimerOff } from "react-icons/lu";
import { CiBookmarkRemove } from "react-icons/ci";
import { ImStopwatch } from "react-icons/im";
import { MdDone } from "react-icons/md";
import { HiOutlineDocument } from "react-icons/hi";
import Link from "next/link";

const AdminReservationSummary = ({
  totalReservations,
  rentedReservation,
  cancelled,
  deadlineMissed,
  approvalWaiting,
  documentSubmission,
}: {
  totalReservations: number;
  rentedReservation: number;
  cancelled: number;
  deadlineMissed: number;
  approvalWaiting: number;
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
      <Link href="/manage-reservations?status=document_review">
        <Card
          className={`${
            approvalWaiting > 0
              ? "section-highlight-background-color secondary-font-color"
              : "section-background-color"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Document Review
            </CardTitle>
            <ImStopwatch />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalWaiting}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-reservations?expire=true">
        <Card
          className={`${
            deadlineMissed > 0
              ? "section-highlight-background-color secondary-font-color"
              : "section-background-color"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deadline Missed
            </CardTitle>
            <LuTimerOff />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deadlineMissed}</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default AdminReservationSummary;
