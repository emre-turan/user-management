import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  if (session?.user) {
    return <h2>Admin Dashboard - Welcome Back, {session?.user.username}</h2>;
  }
  return <div>You are not authorized </div>;
};

export default AdminPage;
