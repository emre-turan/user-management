import User from "@/components/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      Hello from root page!
      <div>
        <h2>Client Session</h2>
        <User />
        <h2>Server Session</h2>
        {JSON.stringify(session)}
      </div>
    </main>
  );
}
