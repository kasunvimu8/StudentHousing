import React from "react";
import { Label } from "../../ui/label";
import { adminUserSortOptions, userRoles } from "@/constants";
import { DropdownComponent } from "../../ui/dropdown/URLSyncDropdown";
import PropertyFilterReset from "../../shared/FilterReset";
import { InputComponent } from "@/components/ui/input/URLSyncInput";
import URLSyncInputSuspense from "@/components/shared/URLSyncInputSuspense";

const AdminFilterSection = () => {
  return (
    <div className="my-5 rounded-lg section-background-color">
      <div className="grid grid-cols-6 gap-4 p-5">
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>NIC/passport</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="user_id" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Name</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="user_name" />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Email</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="user_email" />
            </URLSyncInputSuspense>
          </div>
        </div>
        {/* <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Enrollment Id</Label>
            <URLSyncInputSuspense>
              <InputComponent inputKey="enrollment_id" />
            </URLSyncInputSuspense>
          </div>
        </div> */}
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Role</Label>
            <URLSyncInputSuspense>
              <DropdownComponent
                options={userRoles}
                optionsLabel="Select User Role"
                showAllItem={true}
                inputKey="role"
              />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label>Sort By</Label>
            <URLSyncInputSuspense>
              <DropdownComponent
                options={adminUserSortOptions}
                optionsLabel="Select Sort Option"
                showAllItem={false}
                inputKey="sort"
              />
            </URLSyncInputSuspense>
          </div>
        </div>
        <div className="col-span-6 md:col-start-5 md:col-end-7 flex justify-end">
          <PropertyFilterReset newPath="/manage-reservations" />
        </div>
      </div>
    </div>
  );
};

export default AdminFilterSection;
