"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Role } from "@/types/role";
import { Loader, Lock, LogOut, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserActionsProps = {
  role: Role;
};

const UserActions = ({ role }: UserActionsProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            <Loader className="animate-spin" size={16} />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-x-4 ">
          {role === "ADMIN" && (
            <Link href="/admin">
              <Button variant="link">
                Admin Dashboard <Lock className="ml-1" size={16} />
              </Button>
            </Link>
          )}
          {role === "USER" && (
            <Link href="/profile">
              <Button variant="link">
                User Profile <User className="ml-1" size={16} />
              </Button>
            </Link>
          )}
          <Button
            className="flex justify-start px-0 "
            variant="link"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/`,
              })
            }
          >
            Sign Out
            <LogOut className="ml-1 hover:animate-pulse" size={16} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserActions;
