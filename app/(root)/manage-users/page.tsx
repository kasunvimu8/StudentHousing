import AdminFilterSection from "@/components/custom/user/AdminFilterSection";
import ManageUsersTable from "@/components/custom/user/ManageUsersTable";
import PageTitle from "@/components/shared/PageTitle";
import { FilterParamTypes } from "@/types";
import React from "react";

const Page = async ({ searchParams }: { searchParams: FilterParamTypes }) => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Manage Users" />
        </div>
      </div>
      <AdminFilterSection />
      <div className="mx-auto py-5">
          <ManageUsersTable searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Page;
