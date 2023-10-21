import NewUserForm from "@/components/new-user-form";
import UpdateUser from "@/components/update-user";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";

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
    return (
      <div className="flex h-screen items-center justify-center">
        You are not authorized.
      </div>
    );
  }

  const baseUrl = process.env.NEXTAUTH_URL;
  const res = await fetch(`${baseUrl}/api/users`);
  const users = await res.json();

  return (
    <Container>
      <div className="mt-24 pb-6">
        <h1 className="mb-2 mt-4 text-2xl font-semibold">Admin Dashboard</h1>
        <h2 className="mb-4 text-muted-foreground">
          Welcome Back, {session?.user.name}
        </h2>
        <Tabs defaultValue="new-user" className="w-full">
          <TabsList>
            <TabsTrigger value="new-user">Add User</TabsTrigger>
            <TabsTrigger value="manage-users">Manage Users</TabsTrigger>
          </TabsList>
          <TabsContent value="new-user">
            <NewUserForm />
          </TabsContent>
          <TabsContent value="manage-users">
            <div className="grid gap-4 md:grid-cols-2">
              {users.map((user: User) => (
                <div
                  key={user.id}
                  className="rounded-lg border p-4 shadow-md transition hover:shadow-lg"
                >
                  <h3 className="mb-4 text-xl font-medium">
                    {user.name} {user.surname}
                  </h3>
                  <Separator />
                  <UpdateUser user={user} isAdmin={true} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default AdminPage;
