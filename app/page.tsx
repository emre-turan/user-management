import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const baseUrl = process.env.NEXTAUTH_URL;
  const res = await fetch(`${baseUrl}/api/users`);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  const users = await res.json();

  return (
    <main className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
      <h1 className="pt-4 text-2xl font-semibold">
        Welcome to User Management App
      </h1>
      <h2 className="mb-4 pt-4 text-lg text-muted-foreground">
        You can see the all users listed in here
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {users.map(
          (user: {
            id: string;
            name: string;
            surname: string;
            planet: string;
            email: string;
          }) => (
            <Card
              key={user.id}
              className="rounded-lg p-4 transition duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="mx-5">
                  {user.name} {user.surname}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Planet: {user.planet}</p>
              </CardContent>
              <CardContent>
                <p className="text-sm text-gray-600">Mail: {user.email}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </main>
  );
}
