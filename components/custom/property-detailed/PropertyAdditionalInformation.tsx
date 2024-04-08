import SectionTitle from "@/components/shared/SectionTitle";
import React from "react";

const PropertyAdditionalInformation = ({
  additional_information,
}: {
  additional_information: string;
}) => {
  return (
    <div className="pt-4">
      <SectionTitle title="Additional Information" />
      <div className="text-sm md:gap-5 py-5">
        {additional_information}
      </div>
    </div>
  );
};

export default PropertyAdditionalInformation;
