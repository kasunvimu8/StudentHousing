import {
  LuHome,
  LuShowerHead,
  LuWalletCards,
  LuParkingCircle,
  LuDog,
  LuWifi,
  LuLogOut,
  LuUser2,
  LuUserCog2,
} from "react-icons/lu";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { GiHomeGarage } from "react-icons/gi";
import { RiHomeSmileLine } from "react-icons/ri";
import { BsHouseGear } from "react-icons/bs";
import {
  MdOutlineSmokingRooms,
  MdMiscellaneousServices,
  MdBalcony,
  MdOutlineFreeBreakfast,
  MdOutlineBathtub,
} from "react-icons/md";
import { PiToilet, PiPark, PiElevator, PiBicycle } from "react-icons/pi";
import {
  TbToolsKitchen2,
  TbHomeEco,
  TbDisabled,
  TbWashDry3,
  TbHomeShield,
} from "react-icons/tb";
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
  MdOutlineBathtub: MdOutlineBathtub,
  RiHomeSmileLine: RiHomeSmileLine,
  LuWifi: LuWifi,
  TbWashDry3: TbWashDry3,
  TbHomeShield: TbHomeShield,
  BsHouseGear: BsHouseGear,
  LuLogOut: LuLogOut,
  LuUser2: LuUser2,
  LuUserCog2: LuUserCog2,
};

export const getIconFromKey = (id: string): IconType => {
  return (
    equipmentIcons[id as keyof typeof equipmentIcons] || MdMiscellaneousServices
  );
};
