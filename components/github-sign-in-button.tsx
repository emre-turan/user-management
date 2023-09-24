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
    <Button onClick={loginWithGithub} className="mt-2 w-full">
      {children}
    </Button>
  );
};

export default GithubSignInButton;
