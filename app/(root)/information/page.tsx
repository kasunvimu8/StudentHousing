import PageTitle from "@/components/shared/PageTitle";
import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Information" />
        </div>
        <div className="col-span-2">
          <ul className="list-disc pl-5 space-y-4">
            <li className="text-lg font-medium py-2">Creating an Account
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                <li className="font-normal text-sm">Visit the registration page and fill in your personal details.</li>
                <li className="font-normal text-sm">Verify your email address by clicking on the link sent to your inbox.</li>
                <li className="font-normal text-sm">Login to access your new user dashboard.</li>
                <li className="font-normal text-sm">Set up your profile by adding a profile picture and personal preferences.</li>
              </ol>
            </li>
            <li className="text-lg font-medium py-2">Property Information
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                <li className="font-normal text-sm">Browse available dorm listings by location or price.</li>
                <li className="font-normal text-sm">View detailed descriptions, photos, and amenities for each property.</li>
                <li className="font-normal text-sm">Check reviews from previous tenants if available.</li>
                <li className="font-normal text-sm">Use filters to narrow down search results according to your preferences.</li>
              </ol>
            </li>
            <li className="text-lg font-medium py-2">Make a Reservation
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                <li className="font-normal text-sm">Select your desired dorm and check availability for your dates.</li>
                <li className="font-normal text-sm">Complete the reservation form with all required details.</li>
                <li className="font-normal text-sm">Pay the reservation deposit to secure your booking via a secure payment gateway.</li>
                <li className="font-normal text-sm">Receive a confirmation email with your booking details and a receipt.</li>
              </ol>
            </li>
            <li className="text-lg font-medium py-2">Upload Documents
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                <li className="font-normal text-sm">Upload necessary identification documents and student verification.</li>
                <li className="font-normal text-sm">Submit any required proof of income or guarantor details.</li>
                <li className="font-normal text-sm">Ensure all documents are clear and legible to avoid processing delays.</li>
                <li className="font-normal text-sm">Wait for document verification before proceeding to the next steps.</li>
              </ol>
            </li>
            <li className="text-lg font-medium py-2">After Rented
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                <li className="font-normal text-sm">Sign and return your lease agreement digitally through the platform.</li>
                <li className="font-normal text-sm">Arrange a move-in date and time with the property manager.</li>
                <li className="font-normal text-sm">Access ongoing support for maintenance requests and other inquiries.</li>
                <li className="font-normal text-sm">Utilize the platform's community features to connect with other residents.</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto py-5"></div>
    </div>
  );
};

export default Page;
