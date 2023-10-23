import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UpdateUser from "@/components/update-user";
import Container from "@/components/container";

const UserProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please sign in to view this page.
      </div>
    );
  }

  const baseUrl = process.env.NEXTAUTH_URL;
  const res = await fetch(`${baseUrl}/api/users/${session.user.id}`);
  const user = await res.json();

  return (
    <Container>
      <div className="mt-28">
        <div className="p-2">
          <h1 className="mb-2 text-2xl font-semibold">Profile Page</h1>
          <h2 className="mb-4 text-muted-foreground">
            Welcome Back, {session?.user?.name}
          </h2>
        </div>
        <div className="rounded-lg border p-4 shadow-md transition hover:shadow-lg">
          <UpdateUser user={user} />
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
