import Logo from "../public/SF Pro Bold Light - v2.svg";

import Image from "next/image";
import Link from "next/link";

export const AppLogo = () => {
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
