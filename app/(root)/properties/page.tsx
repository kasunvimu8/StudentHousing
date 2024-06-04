import PropertyFilter from "@/components/custom/property-list/PropertyFilter";
import {
  MapLoading,
  PropertiesLoading,
} from "@/components/custom/property-list/PropertyItemLoading";
import PropertyList from "@/components/custom/property-list/PropertyList";
import PropertyMapParent from "@/components/custom/property-list/PropertyMapParent";
import Hero from "@/components/shared/Hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterParamTypes } from "@/types";
import { Suspense } from "react";
import { LuMap, LuList } from "react-icons/lu";

export default async function Home({
  searchParams,
}: {
  searchParams: FilterParamTypes;
}) {
  return (
    <div className="w-full h-full">
      <Hero />
      <PropertyFilter />
      <div className="mb-5">
        <Tabs defaultValue="list" className="w-full mb-5">
          {/* list and map tabs */}
          <TabsList className="grid grid-cols-2 gap-1 section-light-background-color mb-5">
            <TabsTrigger value="list">
              <LuList className="text-lg" />
              <span className="pl-2 text-base">List</span>
            </TabsTrigger>
            <TabsTrigger value="map">
              <LuMap className="text-lg" />
              <span className="pl-2 text-base">Map</span>
            </TabsTrigger>
          </TabsList>

          {/* property list */}
          <TabsContent value="list" className="h-full w-full">
            <Suspense fallback={<PropertiesLoading />}>
              <PropertyList searchParams={searchParams} />
            </Suspense>
          </TabsContent>

          {/* property map */}
          <TabsContent value="map" className="h-full w-full">
            <Suspense fallback={<MapLoading />}>
              <PropertyMapParent searchParams={searchParams} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
