"use client";

import React, { useState } from "react";
import { userProfileType } from "@/types";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { profileUpdateSchema } from "@/lib/validators";
import { useToast } from "@/components/ui/use-toast";
import DetailsSection from "@/components/custom/user/UserProfile";
import { updateUserAction } from "@/actions/profiles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const initialState: userProfileType = {
  user_email: "",
  user_id: "",
  last_name: "",
  first_name: "",
  created_at: "",
  total_quota: 0,
  used_quota: 0,
  address: "",
  country: "",
  passport: "",
  phone: {
    countryCode: "",
    number: "",
  },
  gender: "",
  dob: undefined,
};

const UpdatePropertyDetail = ({
  userData,
  isAdmin,
}: {
  userData: userProfileType;
  isAdmin: boolean;
}) => {
  const defaultState = userData
    ? {
        ...initialState,
        ...userData,
        dob: userData.dob ? new Date(userData.dob) : undefined,
      }
    : initialState;
  const [userState, setUserState] = useState(defaultState);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    last_name: "",
    first_name: "",
    dob: "",
    gender: "",
    country: "",
    phone: "",
  });
  const { toast } = useToast();

  const updateLocalState = (key: any, value: any) => {
    setUserState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateData = () => {
    try {
      profileUpdateSchema.parse(userState);
      setOpen(true);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors = e.flatten().fieldErrors;
        setErrors({
          ...errors,
          last_name: newErrors.last_name?.[0] || "",
          first_name: newErrors.first_name?.[0] || "",
          dob: newErrors.dob?.[0] || "",
          gender: newErrors.gender?.[0] || "",
          country: newErrors.country?.[0] || "",
          phone: newErrors.phone?.[0] || "",
        });
      }
    }
  };

  const updateUser = async (userState: userProfileType) => {
    try {
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
    } catch (e) {
      console.log(e);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <DetailsSection
        userState={userState}
        errors={errors}
        setErrors={setErrors}
        updateLocalState={updateLocalState}
        isAdmin={isAdmin}
      />
      <div className="flex justify-end py-1">
        <AlertDialog open={open}>
          <AlertDialogTrigger asChild>
            <Button
              className="primary-background-color secondary-font-color self-end disabled:bg-white disabled:primary-font-color"
              size="lg"
              onClick={validateData}
            >
              Update
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Update Profile - Are you absolutely sure ?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-3">
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="primary-background-color secondary-font-color"
                onClick={() => updateUser(userState)}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UpdatePropertyDetail;
