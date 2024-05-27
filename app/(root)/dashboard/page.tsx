import { getSummaryData } from "@/actions/dashboard";
import { getUserType } from "@/actions/profiles";
import AdminPropertySummary from "@/components/custom/Summary/AdminPropertySummary";
import AdminReservationSummary from "@/components/custom/Summary/AdminReservationSummary";
import AdminUserSummary from "@/components/custom/Summary/AdminUserSummary";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";

export default async function Page() {
  const {
    totalProperties,
    availableProperties,
    rentedProperties,
    totalReservations,
    activeReservation,
    cancelled,
    deadlineMissed,
    approvalWaiting,
    documentSubmission,
    users,
  } = await getSummaryData();
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Properties" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <AdminPropertySummary
          totalProperties={totalProperties}
          availableProperties={availableProperties}
          rentedProperties={rentedProperties}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Reservations" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <AdminReservationSummary
          totalReservations={totalReservations}
          activeReservation={activeReservation}
          cancelled={cancelled}
          deadlineMissed={deadlineMissed}
          approvalWaiting={approvalWaiting}
          documentSubmission={documentSubmission}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Users" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <AdminUserSummary users={users} />
      </div>
    </div>
  );
}
