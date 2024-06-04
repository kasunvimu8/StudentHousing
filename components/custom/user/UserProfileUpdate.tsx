"use client";

import React, { useState } from "react";
import { userProfileType } from "@/types";
import { Button } from "@/components/ui/button";
import { ZodError } from "zod";
import { nameSchema } from "@/lib/validators";
import { useToast } from "@/components/ui/use-toast";
import ConfirmationComponent from "@/components/shared/ConfirmationComponent";
import DetailsSection from "@/components/custom/user/UserProfile";
import { updateUserAction } from "@/actions/profiles";

const initialState: userProfileType = {
  user_email: "",
  user_id: "",
  user_name: "",
  // enrollment_id: "",
  created_at: "",
  total_quota: 0,
  used_quota: 0,
};

const UpdatePropertyDetail = ({
  userData,
  isAdmin
}: {
  userData: userProfileType;
  isAdmin: boolean
}) => {
  const defaultState = userData ? userData : initialState;
  const [userState, setUserState] = useState(defaultState);
  const { toast } = useToast();

  const updateLocalState = (key: string, value: any) => {
    setUserState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateUserState = () => {
    try {
      nameSchema.parse(userState);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        return false;
      }
      return false;
    }
  };

  const updateUser = async () => {
    const res: { msg: string; type: string } = await updateUserAction(
      userState
    );
    if (res) {
      toast({
        title: `Profile Data Update : ${
          res.type === "ok" ? "Success" : "Failed"
        }`,
        description: res.msg,
        variant: res.type === "ok" ? "ok" : "error",
      });
    }
  };

  const disabled = !validateUserState();
  return (
    <div className="w-full">
      <DetailsSection
        userState={userState}
        updateLocalState={updateLocalState}
        isAdmin={isAdmin}
      />
      <div className="flex justify-end py-1">
        <ConfirmationComponent
          title={`Update Profile - Are you absolutely sure ?`}
          description={""}
          confirmedCallback={() => updateUser()}
        >
          <Button
            className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
            disabled={disabled}
            size="lg"
          >
            Update
          </Button>
        </ConfirmationComponent>
      </div>
    </div>
  );
};

export default UpdatePropertyDetail;
