"use client";
import { FC } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/ui/Button";
import { UserCircle2, User, Settings, Gauge, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface DropdownItems {
  name: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

const ProfileDropdown: FC = ({}) => {
  const dropdownItems: DropdownItems[] = [
    {
      name: "My profile",
      icon: <User className="mr-2 h-4 w-4" />,
      path: "/profile",
    },
    {
      name: "Dashboard",
      icon: <Gauge className="mr-2 h-4 w-4" />,
      path: "/dashboard",
    },
    {
      name: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      path: "/settings",
    },
    {
      name: "Logout",
      icon: <LogOut className="mr-2 h-4 w-4" />,
      onClick: () => signOut(),
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <UserCircle2 />
          <span className="sr-only">Profile dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        {dropdownItems.map((item, index) => {
          return (
            <div key={index}>
              {item.path ? (
                <Link href={item.path}>
                  <DropdownMenuItem>
                    {item.icon}
                    <span>{item.name}</span>
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem onClick={item.onClick}>
                  {item.icon}
                  <span>{item.name}</span>
                </DropdownMenuItem>
              )}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
