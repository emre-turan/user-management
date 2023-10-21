import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <CardTitle className="mx-5">
            {name} {surname}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Planet: {planet}</p>
        </CardContent>
        <CardContent>
          <p className="text-sm text-gray-600">Mail: {email}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
