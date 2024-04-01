import React from "react";
import { Label } from "../ui/label";
import { ComboboxDemo } from "../ui/combobox";
import { SelectDemo } from "../ui/dropdown";
import { DatePickerDemo } from "../ui/datepicker";
import { Slider } from "../ui/dualslider";
import { Button } from "../ui/button";

const PropertyFilter = () => {
  return (
    <div className="mb-5 rounded-lg section-backgsround-color">
      <div className="flex flex-wrap p-5">
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <ComboboxDemo />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <SelectDemo />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="from">Available From</Label>
            <div className="min-w-[300px]">
              <DatePickerDemo />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="rooms">Number of Rooms</Label>
            <SelectDemo />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="space">
              Space (m <sup>2</sup>)
            </Label>
            <Slider min={0} max={100} minStepsBetweenThumbs={1} step={1} />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="rent">Rent</Label>
            <Slider min={0} max={3000} minStepsBetweenThumbs={1} step={1} />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="rooms">Sort By</Label>
            <SelectDemo />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-auto p-3 flex flex-col justify-end items-end">
          <div className="flex gap-2 justify-end place-content-end">
            <Button className="py-5 px-7">Reset</Button>
            <Button className="py-5 px-7 primary-background-color secondary-font-color">
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
