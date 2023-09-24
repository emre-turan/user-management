import User from "@/components/user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/users`);
  const users = await res.json();

  return (
    <main>
      Hello from root page!
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map(
          (user: {
            id: string;
            name: string;
            surname: string;
            planet: string;
            mail: string;
          }) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>
                  {user.name} {user.surname}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Planet: {user.planet}</p>
              </CardContent>
              <CardContent>
                <p>Mail: {user.mail}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </main>
  );
}
