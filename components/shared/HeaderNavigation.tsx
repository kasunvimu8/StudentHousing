import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HeaderNav } from "@/types";
import headerConfigs from "@/configs";
import Link from "next/link";
import { adminType } from "@/constants";
import { getUserType } from "@/actions/profiles";

const HeaderNavigation = async () => {
  const userType = await getUserType();
  const userHeaderNavLinks =
    userType === adminType ? headerConfigs.admin : headerConfigs.user;

  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>
        {userHeaderNavLinks.map((userHeaderLink: HeaderNav) => {
          return (
            <NavigationMenuItem key={userHeaderLink.id}>
              <NavigationMenuTrigger>
                <span className="text-lg font-normal">
                  {userHeaderLink.label}
                </span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-full">
                <ul
                  className={cn(
                    "grid w-[400px] gap-3 p-4 md:w-[500px] grid-cols-2 lg:w-[600px] bg-white",
                    {
                      "grid-cols-1": userHeaderLink.components.length === 1,
                    }
                  )}
                >
                  {userHeaderLink.components.map((component) => {
                    return (
                      <Link href={component.route} key={component.id}>
                        <ListItem title={component.title}>
                          {component.description}
                        </ListItem>
                      </Link>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <span
          ref={ref}
          className={cn(
            "block bg-gray-50 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none ">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </span>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default HeaderNavigation;
