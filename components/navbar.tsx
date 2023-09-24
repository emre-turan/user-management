import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import Logo from "../public/logo.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "./user-account-nav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" fixed top-0 z-10 w-full border-b border-s-zinc-200 bg-zinc-100 py-2">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image alt="" src={Logo} />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
