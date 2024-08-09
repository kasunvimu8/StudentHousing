"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuTimerOff } from "react-icons/lu";
import { ImStopwatch } from "react-icons/im";
import Link from "next/link";

const AdminActionSummary = ({
  deadlineMissed,
  approvalWaiting,
  tenantNotConfirmed,
  propertyNotDispatched,
}: {
  deadlineMissed: number;
  approvalWaiting: number;
  tenantNotConfirmed: number;
  propertyNotDispatched: number;
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      <Link href="/manage-rentals?rental-end=true&confirm=false">
        <Card
          className={`${
            tenantNotConfirmed > 0
              ? "section-highlight-background-color secondary-font-color"
              : "section-background-color"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              End date unconfirmed
            </CardTitle>
            <LuTimerOff />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantNotConfirmed}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-rentals?rental-end=true&confirm=true&dispatch=false">
        <Card
          className={`${
            propertyNotDispatched > 0
              ? "section-highlight-background-color secondary-font-color"
              : "section-background-color"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Property not relisted
            </CardTitle>
            <LuTimerOff />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyNotDispatched}</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default AdminActionSummary;
