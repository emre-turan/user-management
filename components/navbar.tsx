import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserActions from "./user-actions";
import { Role } from "@/types/role";
import { LogIn } from "lucide-react";
import { AppLogo } from "./app-logo";

const SignInOrSignUpButtons = () => {
  return (
    <div className="flex space-x-4">
      <Link className={buttonVariants({ variant: "link" })} href="/sign-in">
        Sign In
      </Link>
      <Link className={buttonVariants()} href="/sign-up">
        Sign Up
        <LogIn className="ml-2 animate-pulse" size={16} />
      </Link>
    </div>
  );
};

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const userRole: Role = (session?.user?.role as Role) || "guest";
  return (
    <div className="fixed top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-6">
      <div className="container flex items-center justify-between">
        <AppLogo />
        <div className="ml-auto">
          {session?.user ? (
            <UserActions
              role={userRole}
              name={session?.user?.name}
              surname={session?.user?.surname}
            />
          ) : (
            <SignInOrSignUpButtons />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
