"use client";

import React, { ReactNode, useState } from "react";
import ClonePropertyInput from "./ClonePropertyInput";
import { ComboContentType, Property, PropertyDeafultType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { propertyFormSchema } from "@/lib/validators";
import { ZodError } from "zod";
import DetailsSection from "../property-update/DetailsSection";
import ImageSectioon from "../property-update/ImageSection";
import LocationSection from "../property-update/LocationSection";
import CostSection from "../property-update/CostSection";
import EquipmentSection from "../property-update/EquipmentSection";
import ContractDocumentSection from "../property-update/ContractDocumentSection";
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";
import { Button } from "@/components/ui/button";
import { createPropertyAction, getProperty } from "@/actions/properties";
import { useRouter } from "next/navigation";
import AdditionalInformation from "../property-update/AdditionalInformation";

const initialState: PropertyDeafultType = {
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
  longitude: 48.1739110839256,
  latitude: 12.829061318898692,
  created_at: undefined,
  updated_at: undefined,
  created_by: "",
  updated_by: "",
  equipments: [],
  documents: [],
  images: [],
  status: "available",
  city: "",
  notice_period: 3,
  rooms: 1,
  property_type: "",
  floor: 1,
  additional_information: "",
  property_id: "",
  room_id: "",
};

const PropertyCreate = ({
  clonePropertyDataOptions,
  children,
}: {
  clonePropertyDataOptions: ComboContentType[];
  children: ReactNode;
}) => {
  const [propertyState, setPropertyState] = useState(initialState);
  const { toast } = useToast();
  const router = useRouter();

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

  const createProperty = async () => {
    const res: { msg: string; type: string } = await createPropertyAction(
      propertyState
    );
    if (res) {
      toast({
        title: `Property ${propertyState.property_id} : Create ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
        variant: res.type === "ok" ? "ok" : "error",
      });

      if (res.type === "ok") {
        router.push("/manage-properties");
      }
    }
  };

  const disabled = !validatePropertyState();

  const handleClone = async (propertyId: string) => {
    try {
      const cloneProperty = await getProperty(propertyId);
      const {
        _id,
        created_by,
        updated_by,
        created_at,
        updated_at,
        ...extractData
      } = cloneProperty;
      if (cloneProperty) {
        setPropertyState({ ...propertyState, ...extractData });
      }
    } catch (e) {
      console.log("Error occured during cloning the property", e);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {children}
        <div className="col-span-2 md:col-span-1 self-end justify-end flex">
          <ClonePropertyInput
            options={clonePropertyDataOptions}
            handleClone={handleClone}
          />
        </div>
      </div>
      <div className="mx-auto py-5">
        <DetailsSection
          propertyState={propertyState}
          updateLocalState={updateLocalState}
          isCreate={true}
        />
        <ImageSectioon
          propertyState={propertyState}
          updateLocalState={updateLocalState}
          isCreate={true}
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
          isCreate={true}
        />
        <AdditionalInformation
          value={propertyState?.additional_information || ""}
          updateLocalState={updateLocalState}
        />
        <div className="flex justify-end py-1">
          <ConfirmationComponent
            title={`Create Property ${propertyState?.property_id} - Are you absolutely sure ?`}
            description={""}
            confirmedCallback={() => createProperty()}
          >
            <Button
              className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
              disabled={disabled}
              size="lg"
            >
              Create Property
            </Button>
          </ConfirmationComponent>
        </div>
        {disabled && (
          <div className="flex justify-end">
            <div className="text-xs primary-light-font-color">
              * Mandotory inputs cannot be empty
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCreate;
