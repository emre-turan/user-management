import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserCard from "@/components/user-card";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXTAUTH_URL;
  const res = await fetch(`${baseUrl}/api/users`);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  const users = await res.json();

  return (
    <main className="container mx-auto mt-24 max-w-7xl px-6 lg:px-8">
      <div className="p-2">
        <h1 className="mb-2 text-2xl font-semibold">
          Welcome to User Management App
        </h1>
        <h2 className="mb-4 text-sm text-muted-foreground">
          You can see the all users listed in here
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {users.map(
          (user: {
            id: string;
            name: string;
            surname: string;
            planet: string;
            email: string;
          }) => (
            <UserCard key={user.id} {...user} />
          ),
        )}
      </div>
    </main>
  );
}
