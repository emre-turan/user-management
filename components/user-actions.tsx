"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Role } from "@/types/role";
import { LogOut } from "lucide-react";

type UserActionsProps = {
  role: Role;
};

const UserActions = ({ role }: UserActionsProps) => {
  return (
    <div className="flex space-x-4">
      {role === "ADMIN" && (
        <Link href="/admin">
          <Button variant="link">Admin Dashboard</Button>
        </Link>
      )}
      {role === "USER" && (
        <Link href="/profile">
          <Button variant="link">User Profile</Button>
        </Link>
      )}
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`,
          })
        }
      >
        Sign Out
        <LogOut className="ml-2 hover:animate-pulse" size={16} />
      </Button>
    </div>
  );
};

export default UserActions;
