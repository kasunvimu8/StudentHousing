"use client";

import * as React from "react";
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

const defaultLayout = [20, 32, 48];
export function WaitingListMatcher({
  waitingList,
  properties,
}: {
  waitingList: WaitinRecordType[];
  properties: Property[];
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full items-stretch"
        style={{ height: "calc(100vh - 400px)" }}
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="w-full h-full border-2  border-gray-100">
            <div className="font-semibold text-lg p-2">Waiting List</div>
            <ScrollArea className="h-full">
              <WaitingListComponent waitingList={waitingList} />
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
              <WaitingProperties properties={properties} />
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
