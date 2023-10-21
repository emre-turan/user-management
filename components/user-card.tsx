import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Orbit, User } from "lucide-react";

interface UserProps {
  name: string;
  surname: string;
  planet: string;
  email: string;
}

const UserCard: React.FC<UserProps> = ({ name, surname, planet, email }) => {
  return (
    <>
      <Card className="rounded-lg p-4 transition duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="mx-5 flex gap-1 text-lg">
            <User />
            {name} {surname}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-start space-x-2">
          <p className="flex gap-2 text-sm text-muted-foreground">
            <Orbit className="h-5 w-4" />
            Planet:
          </p>
          <p className="text-sm">{planet}</p>
        </CardContent>
        <CardContent className="flex justify-start space-x-2">
          <p className="flex gap-2 text-sm text-muted-foreground">
            <Mail className="h-5 w-4" />
            Email:
          </p>
          <p className="text-sm">{email}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
