import { getSummaryData } from "@/actions/dashboard";
import AdminActionSummary from "@/components/custom/summary/AdminActionSummary";
import AdminPropertySummary from "@/components/custom/summary/AdminPropertySummary";
import AdminReservationSummary from "@/components/custom/summary/AdminReservationSummary";
import AdminUserSummary from "@/components/custom/summary/AdminUserSummary";
import PageTitle from "@/components/shared/PageTitle";
import React from "react";

export default async function Page() {
  const {
    totalProperties,
    availableProperties,
    reservedProperties,
    totalReservations,
    rentedReservation,
    cancelled,
    deadlineMissed,
    approvalWaiting,
    documentSubmission,
    users,
    tenantNotConfirmed,
    propertyNotDispatched,
    idleProperties,
  } = await getSummaryData();
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Admin Actions" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <AdminActionSummary
          deadlineMissed={deadlineMissed}
          approvalWaiting={approvalWaiting}
          tenantNotConfirmed={tenantNotConfirmed}
          propertyNotDispatched={propertyNotDispatched}
          idleProperties={idleProperties}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Properties" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <AdminPropertySummary
          totalProperties={totalProperties}
          availableProperties={availableProperties}
          reservedProperties={reservedProperties}
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
          rentedReservation={rentedReservation}
          cancelled={cancelled}
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
