import React from "react";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { initialVisibilityManageUsers } from "@/constants";
import { FilterParamTypes, SortOption } from "@/types";
import { getAllProfiles } from "@/actions/profiles";
import { columns } from "@/components/custom/user/ManageUsersColumns";

const ManageUsersTable = async ({
  searchParams,
}: {
  searchParams: FilterParamTypes;
}) => {
  const sort = searchParams.sort;
  const sortOption: SortOption =
    sort === "recent-update" ? { updated_at: -1 } : { created_at: -1 };

  const data = await getAllProfiles(sortOption, searchParams);
  console.log(data);
  return (
    <DataTable
      columns={columns}
      data={data}
      initialVisibility={initialVisibilityManageUsers}
    />
  );
};

export default ManageUsersTable;
