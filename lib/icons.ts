import {
  LuHome,
  LuShowerHead,
  LuWalletCards,
  LuParkingCircle,
  LuDog,
} from "react-icons/lu";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { GiHomeGarage } from "react-icons/gi";
import {
  MdOutlineSmokingRooms,
  MdMiscellaneousServices,
  MdBalcony,
  MdOutlineFreeBreakfast,
} from "react-icons/md";
import { PiToilet, PiPark, PiElevator, PiBicycle } from "react-icons/pi";
import { TbToolsKitchen2, TbHomeEco, TbDisabled } from "react-icons/tb";
import { IconType } from "react-icons";

export const equipmentIcons = {
  LuHome: LuHome,
  LuShowerHead: LuShowerHead,
  LuWalletCards: LuWalletCards,
  LuParkingCircle: LuParkingCircle,
  LuDog: LuDog,
  CgSmartHomeWashMachine: CgSmartHomeWashMachine,
  GiHomeGarage: GiHomeGarage,
  MdOutlineSmokingRooms: MdOutlineSmokingRooms,
  PiToilet: PiToilet,
  PiPark: PiPark,
  PiElevator: PiElevator,
  PiBicycle: PiBicycle,
  TbToolsKitchen2: TbToolsKitchen2,
  TbHomeEco: TbHomeEco,
  TbDisabled: TbDisabled,
  MdBalcony: MdBalcony,
  MdMiscellaneousServices: MdMiscellaneousServices,
  MdOutlineFreeBreakfast: MdOutlineFreeBreakfast,
};

export const getIconFromKey = (id: string): IconType => {
  return (
    equipmentIcons[id as keyof typeof equipmentIcons] || MdMiscellaneousServices
  );
};
