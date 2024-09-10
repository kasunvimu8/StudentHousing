"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import WaitingListComponent from "./WaitingListComponent";
import WaitingProperties from "./WaitingProperties";
import { Property, WaitinRecordType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import DialogComponent from "@/components/shared/DialogComponent";
import { matchPropertyAndWaitingList } from "@/actions/waiting-list";

const defaultLayout = [20, 32, 48];
export function WaitingListMatcher({
  waitingList,
  properties,
}: {
  waitingList: WaitinRecordType[];
  properties: Property[];
}) {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);
  const [selectedWaitingListItem, setSelectedWaitingListItem] = useState(
    waitingList[0]
  );
  const { toast } = useToast();

  const onMatch = async () => {
    // TODO: Do the matching here
    if (selectedProperty && selectedWaitingListItem) {
      try {
        const { msg, type } = await matchPropertyAndWaitingList(
          selectedProperty,
          selectedWaitingListItem
        );

        toast({
          title: `Waiting list and property match  : ${
            type === "ok" ? "Success" : "Failed"
          } `,
          description: msg,
          variant: type,
        });
      } catch (error) {}
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
        style={{ height: "calc(100vh - 280px)" }}
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="w-full h-full border-2  border-gray-100">
            <div className="font-semibold text-lg p-2">Waiting List</div>
            <ScrollArea className="h-full">
              <WaitingListComponent
                waitingList={waitingList}
                selectedWaitingListItem={selectedWaitingListItem}
                setSelectedWaitingListItem={setSelectedWaitingListItem}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="w-full h-full border-2  border-gray-100">
            <div className="font-semibold text-lg p-2">
              All available and idle properties
            </div>
            <ScrollArea className="h-full">
              <WaitingProperties
                properties={properties}
                selectedProperty={selectedProperty}
                setSelectedProperty={setSelectedProperty}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="flex justify-center py-2">
        <DialogComponent
          buttonTitle="Match"
          dialogTitle={`Waiting list record and property match - Are you absolutely sure ?`}
          dialogDescription="Upon confirmation, the property will be temporarily reserved for the user. After that the waiting list record will be deleted and the tenant should complete the regular reservation process."
          submitTitleMain="Match"
          cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
          clickSubmit={() => {
            onMatch();
          }}
        >
          <div className="text-sm font-normal">
            Please click Match to continue
          </div>
        </DialogComponent>
      </div>
    </TooltipProvider>
  );
}
