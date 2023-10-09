import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import Logo from "../public/SF Pro Bold Light - v2.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserActions from "./user-actions";
import { Role } from "@/types/role";

const AppLogo = () => {
  return (
    <div className="absolute">
      <div className="relative h-28 w-28">
        <Link href="/">
          <Image alt="application logo" src={Logo} />
        </Link>
      </div>
    </div>
  );
};

const SignInOrSignUpButtons = () => {
  return (
    <div className="flex space-x-4">
      <Link className={buttonVariants({ variant: "link" })} href="/sign-in">
        Sign in
      </Link>
      <Link className={buttonVariants()} href="/sign-up">
        Sign up
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
            <UserActions role={userRole} />
          ) : (
            <SignInOrSignUpButtons />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
