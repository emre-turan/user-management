import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UpdateUser from "@/components/update-user";

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
    <div className="mx-auto mt-24 max-w-7xl sm:px-6 lg:px-8">
      <div className="container mx-auto mt-10 max-w-xl rounded-lg p-5 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">
          Profile Page - Welcome Back, {session?.user?.name}
        </h1>
        <UpdateUser user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
