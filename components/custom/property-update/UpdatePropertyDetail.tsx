"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import DetailsSection from "@/components/custom/property-update/DetailsSection";
import ImageSectioon from "./ImageSectioon";

const initialState: Property = {
  _id: "",
  title: "",
  address: "",
  from: undefined,
  to: undefined,
  beds: 1,
  size: 10,
  type: "",
  cold_rent: undefined,
  incidential_cost: undefined,
  one_time_cost: undefined,
  warm_rent: undefined,
  deposit: undefined,
  longitude: 48.17237,
  latitude: 12.83196,
  created_at: undefined,
  updated_at: undefined,
  created_by: "",
  updated_by: "",
  equipments: [],
  documents: [],
  images: [],
  status: "",
  city: "",
  rooms: undefined,
  property_type: "",
  floor: undefined,
  additional_information: "",
  property_id: "",
  room_id: "",
};

const UpdatePropertyDetail = ({ property }: { property: Property }) => {
  const defaultState = property ? property : initialState;
  const [propertyState, setPropertyState] = useState(defaultState);

  const updateLocalState = (key: string, value: any) => {
    setPropertyState({
      ...propertyState,
      [key]: value,
    });
  };

  return (
    <div className="w-full">
      <DetailsSection
        propertyState={propertyState}
        updateLocalState={updateLocalState}
      />
      <ImageSectioon
        propertyState={propertyState}
        updateLocalState={updateLocalState}
      />
    </div>
  );
};

export default UpdatePropertyDetail;
