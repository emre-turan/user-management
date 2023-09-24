import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UpdateUser from "@/components/update-user";

const UserProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div>You are not authorized </div>;
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/users/${session.user.id}`);
  const user = await res.json();

  return (
    <div className="container mx-auto mt-10 rounded-lg bg-white p-5 shadow-md">
      <h1 className="mb-4 text-2xl font-semibold">
        Profile Page - Welcome Back, {user?.name}
      </h1>
      <UpdateUser user={user} />
    </div>
  );
};

export default UserProfile;
