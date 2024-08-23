import { getUserType, getProfile } from "@/actions/profiles";
import UpdatePropertyDetail from "@/components/custom/user/UserProfileUpdate";
import PageTitle from "@/components/shared/PageTitle";
import { adminType } from "@/constants";
import React from "react";

export default async function Page() {
  const userType = await getUserType();
  const userData = await getProfile();
  const isAdmin = userType === adminType;
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="My Profile" />
        </div>
      </div>
      <div className="mx-auto py-5">
        <UpdatePropertyDetail userData={userData} isAdmin={isAdmin} />
      </div>
    </div>
  );
}
