import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Logout from "../custom/auth/Logout";
import MenuItem from "./MenuItem";
import { getProfiles, getUserType } from "@/actions/profiles";
import { adminType, adminUsernavigation, normalUserNavMenu } from "@/constants";

export async function UserNav() {
  const userType = await getUserType();
  const userData = await getProfiles();
  const navOptions =
    userType === adminType ? adminUsernavigation : normalUserNavMenu;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full section-light-background-color">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="font-bold uppercase" >{userData?.user_name?.substring(0, 2) || 'NN'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="profile-user-overlay bg-white p-2 pr-4"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userData?.user_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData?.user_email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ul className="grid gap-1">
            {navOptions?.map((menu) => (
              <DropdownMenuItem className="hover:section-light-background-color rounded">
                <MenuItem menu={menu} key={menu.id} />
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="hover:section-light-background-color rounded">
              <Logout />
            </DropdownMenuItem>
          </ul>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
