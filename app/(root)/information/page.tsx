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

const Page = () => {
  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Information" />
        </div>
        <div className="col-span-2">
          <ul className="list-disc pl-5 space-y-4">
            <li className="text-lg font-medium py-2">
              Account
              <ol className="pl-4 space-y-2 pt-2">
                <li className="font-normal text-sm">
                  {accountInfromation.map((account) => {
                    return (
                      <Accordion type="single" collapsible id={account.id}>
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
              </ol>
            </li>
            <li className="text-lg font-medium py-2">
              Property
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                {propertiesInfromation.map((property) => {
                  return (
                    <Accordion type="single" collapsible id={property.id}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">
                          {property.question}
                        </AccordionTrigger>
                        <AccordionContent>{property.answer}</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </ol>
            </li>
            <li className="text-lg font-medium py-2">
              Reservation
              <ol className="list-decimal pl-4 space-y-2 pt-2">
                {reservationInfromation.map((res) => {
                  return (
                    <Accordion type="single" collapsible id={res.id}>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">
                          {res.question}
                        </AccordionTrigger>
                        <AccordionContent>{res.answer}</AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </ol>
            </li>
            <li className="text-lg font-medium py-2">
              After Rented
              <ol className="list-decimal pl-4 space-y-2 pt-2">
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
