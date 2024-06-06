import { Label } from "@/components/ui/label";
import DialogComponent from "@/components/shared/DialogComponent";

export function RentalDialog() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
      </div>
      <DialogComponent
        buttonTitle="Reserve"
        dialogTitle={`Are you absolutely sure ?`}
        dialogDescription="."
        submitTitleMain="Reserve"
        submitMainButtonDisable={false}
        cls="py-5 px-7 text-bold primary-background-color secondary-font-color"
        clickSubmit={() => {
          // handleReservation();
        }}
      >
        hi
      </DialogComponent>
    </div>
  );
}
