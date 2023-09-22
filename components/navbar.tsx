"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  return (
    <header className="flex h-full items-center border-b p-4">
      <div className="flex w-full justify-end space-x-4 ">
        {!user && (
          <>
            <Link href="/sign-in" className="hover:underline">
              Login
            </Link>
            <Link href="/sign-up" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

export default Navbar;
