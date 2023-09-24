"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserAccountNav = () => {
  return (
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
  );
};

export default UserAccountNav;
