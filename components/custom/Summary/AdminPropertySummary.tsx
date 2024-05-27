import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuHome } from "react-icons/lu";
import { TbHomeCheck, TbHomePlus } from "react-icons/tb";
import Link from "next/link";

const AdminPropertySummary = ({
  totalProperties,
  availableProperties,
  reservedProperties,
}: {
  totalProperties: number;
  availableProperties: number;
  reservedProperties: number;
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/manage-properties">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <LuHome />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProperties}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-properties?status=reserved">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <TbHomeCheck />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableProperties}</div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/manage-properties?status=available">
        <Card className="section-background-color">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <TbHomePlus />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reservedProperties}</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default AdminPropertySummary;
