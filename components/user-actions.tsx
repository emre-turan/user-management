"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Role } from "@/types/role";

type UserActionsProps = {
  role: Role;
};

const UserActions = ({ role }: UserActionsProps) => {
  console.log("Role in UserActions:", role);
  return (
    <>
      {role === "ADMIN" && (
        <Link href="/admin">
          <Button>Admin Panel</Button>
        </Link>
      )}
      {role === "USER" && (
        <Link href="/profile">
          <Button>Profile</Button>
        </Link>
      )}
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`,
          })
        }
        variant="destructive"
      >
        Sign Out
      </Button>
    </>
  );
};

export default UserActions;
