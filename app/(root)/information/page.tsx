import PageTitle from "@/components/shared/PageTitle";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  accountInfromation,
  propertiesInfromation,
  reservationInfromation,
} from "@/constants";

const InfoPage = () => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Information" />
        </div>
        <div className="col-span-2">
          <ul className="list-disc pl-5 space-y-4">
            <li className="text-lg font-medium py-2" key="account">
              Account
              {accountInfromation.map((account) => {
                return (
                  <Accordion type="single" collapsible key={account.id}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        {account.question}
                      </AccordionTrigger>
                      <AccordionContent>{account.answer}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </li>
            <li className="text-lg font-medium py-2" key="property">
              Property
              {propertiesInfromation.map((property) => {
                return (
                  <Accordion type="single" collapsible key={property.id}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        {property.question}
                      </AccordionTrigger>
                      <AccordionContent>{property.answer}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </li>
            <li className="text-lg font-medium py-2" key="reservation">
              Reservation
              {reservationInfromation.map((res) => {
                return (
                  <Accordion type="single" collapsible key={res.id}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        {res.question}
                      </AccordionTrigger>
                      <AccordionContent>{res.answer}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </li>
            <li className="text-lg font-medium py-2" key="after">
              After Rented
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto py-5"></div>
    </div>
  );
};

export default InfoPage;
