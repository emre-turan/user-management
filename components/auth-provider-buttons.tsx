import { signIn } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

interface AuthProviderButtonsProps {
  provider: "google" | "github";
  children: ReactNode;
}

const AuthProviderButton: FC<AuthProviderButtonsProps> = ({
  provider,
  children,
}) => {
  const authenticateWithProvider = () =>
    signIn(provider, { callbackUrl: "http://localhost:3000/" });

  const getProviderIcon = () => {
    switch (provider) {
      case "google":
        return <Icons.google className="mr-2 h-4 w-4" />;
      case "github":
        return <Icons.gitHub className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Button onClick={authenticateWithProvider} className="w-full">
      {getProviderIcon()}
      {children}
    </Button>
  );
};

export default AuthProviderButton;
