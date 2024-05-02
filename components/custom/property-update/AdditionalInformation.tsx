import SectionTitle from "@/components/shared/SectionTitle";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const AdditionalInformation = ({
  value,
  updateLocalState,
}: {
  value: string;
  updateLocalState: (key: string, value: any) => void;
}) => {
  return (
    <div className="pt-3">
      <SectionTitle title="Additional Information" />
      <div className="w-full py-5">
        <Textarea
          placeholder="Type additional infomraiton here."
          value={value}
          rows={4}
          onChange={(e) => {
            updateLocalState("additional_information", e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default AdditionalInformation;
