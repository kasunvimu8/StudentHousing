"use client";

import React, { useState } from "react";
import { Property } from "@/types";
import DetailsSection from "@/components/custom/property-update/DetailsSection";
import ImageSectioon from "./ImageSection";
import LocationSection from "./LocationSection";
import EquipmentSection from "./EquipmentSection";
import CostSection from "./CostSection";
import ContractDocumentSection from "./ContractDocumentSection";
import { Button } from "@/components/ui/button";
import { ZodError } from "zod";
import { propertyFormSchema } from "@/lib/validators";
import { useToast } from "@/components/ui/use-toast";

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

const UpdatePropertyDetail = ({
  property,
  updatePropertyAction,
}: {
  property: Property;
  updatePropertyAction: (
    property: Property
  ) => Promise<{ msg: string; type: string }>;
}) => {
  const defaultState = property ? property : initialState;
  const [propertyState, setPropertyState] = useState(defaultState);
  const { toast } = useToast();

  const updateLocalState = (key: string, value: any) => {
    setPropertyState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const updateLocalMapState = (location: {
    longitude: number;
    latitude: number;
  }) => {
    setPropertyState((prev) => ({
      ...prev,
      longitude: location.longitude,
      latitude: location.latitude,
    }));
  };

  const validatePropertyState = () => {
    try {
      propertyFormSchema.parse(propertyState);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        return false;
      }
      return false;
    }
  };

  const updateProperty = async () => {
    const res: { msg: string; type: string } = await updatePropertyAction(
      propertyState
    );
    if (res) {
      toast({
        title: `Property ${propertyState.property_id} : Update ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
      });
    }
  };

  const disabled = !validatePropertyState();
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

      <LocationSection
        propertyState={propertyState}
        updateLocalState={updateLocalState}
        updateLocalMapState={updateLocalMapState}
      />
      <CostSection
        propertyState={propertyState}
        updateLocalState={updateLocalState}
      />
      <EquipmentSection
        equipments={propertyState.equipments}
        updateLocalState={updateLocalState}
      />
      <ContractDocumentSection
        propertyState={propertyState}
        updateLocalState={updateLocalState}
      />
      <div className="flex justify-end py-1">
        <Button
          className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
          onClick={updateProperty}
          disabled={disabled}
          size="lg"
        >
          Update Property
        </Button>
      </div>
      {disabled && (
        <div className="flex justify-end">
          <div className="text-xs primary-light-font-color">
            * Mandotory inputs cannot be empty
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePropertyDetail;
