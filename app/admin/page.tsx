import NewUserForm from "@/components/new-user-form";
import UserProfileClient from "@/components/update-user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface User {
  id: string;
  name: string;
  surname: string;
  planet: string;
  mail: string;
}

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>You are not authorized </div>;
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/users`);
  const users = await res.json();

  return (
    <main className="mx-auto mt-24 max-w-7xl pb-10 sm:px-6 lg:px-8">
      <h2 className="my-4 text-2xl font-semibold">
        Admin Dashboard - Welcome Back, {session?.user.username}
      </h2>
      <NewUserForm />
      <div className="grid grid-cols-2 gap-4">
        {users.map((user: User) => (
          <div
            key={user.id}
            className="rounded-lg border p-4 shadow-md transition hover:shadow-lg"
          >
            <h3 className="mb-4 text-xl font-medium">
              {user.name} {user.surname}
            </h3>
            <UserProfileClient user={user} isAdmin={true} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminPage;
