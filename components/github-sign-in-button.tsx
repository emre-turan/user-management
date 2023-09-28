import { Icons } from "@/components/icons";
import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

interface GithubSignInButtonProps {
  children: ReactNode;
}
const GithubSignInButton: FC<GithubSignInButtonProps> = ({ children }) => {
  const loginWithGithub = () =>
    signIn("github", { callbackUrl: "http://localhost:3000/" });

  return (
    <Button onClick={loginWithGithub} className=" w-full">
      <Icons.gitHub className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};

export default GithubSignInButton;
