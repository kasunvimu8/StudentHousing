import React from "react";
import { Label } from "../../ui/label";
import { numberOfRooms, propertyTypes, sortOptions } from "@/constants";
import { DropdownComponent } from "../../ui/dropdown/URLSyncDropdown";
import { DatePickerComponent } from "../../ui/calendar/URLSyncDropdown";
import { Slider } from "../../ui/slider/URLSyncSlider";
import { City, ICity } from "country-state-city";
import { isCitiesWithinArea, removeSpaceAndCasesensitivity } from "@/lib/utils";
import { ComboContentType } from "@/types";
import URLSyncCombo from "../../ui/combo/URLSyncCombo";
import PropertyFilterReset from "./PropertyFilterReset";

const PropertyFilter = async () => {
  // get all the cities in Bavaria
  const cities: ICity[] = City.getCitiesOfState("DE", "BY");
  const formattedCity: ComboContentType[] = [];

  cities.forEach((city: ICity) => {
    const cityId = removeSpaceAndCasesensitivity(city.name);
    const langitude = city.latitude ? parseFloat(city.latitude) : 0;
    const longitude = city.longitude ? parseFloat(city.longitude) : 0;

    if (isCitiesWithinArea(langitude, longitude)) {
      formattedCity.push({ id: cityId, value: cityId, label: city.name });
    }
  });

  return (
    <div className="mb-5 rounded-lg section-background-color">
      <div className="grid grid-cols-6 gap-4 p-5">
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label >Location</Label>
            <URLSyncCombo
              notfoundLabel="No City found."
              placeholder="Search Cities"
              options={formattedCity}
              showAllItem={true}
              inputKey="city"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label >Property Type</Label>
            <DropdownComponent
              options={propertyTypes}
              optionsLabel="Select Property Types"
              showAllItem={true}
              inputKey="property_type"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label >Available From</Label>
            <div className="min-w-[300px]">
              <DatePickerComponent inputKey={"from"} />
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label >Number of Rooms</Label>
            <DropdownComponent
              options={numberOfRooms}
              optionsLabel="Select Number of Rooms"
              showAllItem={true}
              inputKey="rooms"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label >
              Space (m <sup>2</sup>)
            </Label>
            <Slider
              min={0}
              max={100}
              minStepsBetweenThumbs={1}
              step={1}
              inputKey="size"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1 ">
            <Label >Rent (€)</Label>
            <Slider
              min={0}
              max={3000}
              minStepsBetweenThumbs={1}
              step={50}
              inputKey="rent"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-2 p-1">
            <Label >Sort By</Label>
            <DropdownComponent
              options={sortOptions}
              optionsLabel="Select Sort Option"
              showAllItem={false}
              inputKey="sort"
            />
          </div>
        </div>
        <div className="col-span-6 md:col-start-5 md:col-end-7 flex justify-end">
          <PropertyFilterReset />
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
