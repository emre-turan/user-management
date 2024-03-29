import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserCard from "@/components/user-card";
import { FadeIn } from "@/components/fade-in";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXTAUTH_URL;
  const res = await fetch(`${baseUrl}/api/users`);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  const users = await res.json();

  return (
    <FadeIn>
      <main className="container mx-auto mt-28 max-w-7xl px-6 lg:px-8">
        <div className="p-2">
          <h1 className="mb-2 text-2xl font-semibold">
            Welcome to User Management App
          </h1>
          <h2 className="mb-4 text-sm text-muted-foreground">
            The application allows users to edit their own profiles, view other
            users&apos; profiles, and provides admin functionalities to manage
            all users. Developed with modern technologies and best practices,
            this project serves as a comprehensive example of a full-stack
            application to
            <strong> demonstrate my technical skills and experience.</strong>
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
    </FadeIn>
  );
}
