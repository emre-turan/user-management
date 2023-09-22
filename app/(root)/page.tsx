import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <p>Hello from Root Page! (unprotected!)</p>
    </main>
  );
}
