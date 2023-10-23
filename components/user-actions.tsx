"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Role } from "@/types/role";
import { Lock, LogOut, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type UserActionsProps = {
  role: Role;
  name?: string;
  surname?: string;
};

const UserActions = ({ role, name, surname }: UserActionsProps) => {
  const initials = `${name?.charAt(0) || "E"}${
    surname?.charAt(0) || "T"
  }`.toUpperCase();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback className="bg-black text-muted">
            {initials}
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
