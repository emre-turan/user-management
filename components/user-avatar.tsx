import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name?: string;
  surname?: string;
}

const UserAvatar = ({ name, surname }: UserAvatarProps) => {
  const initials = `${name?.charAt(0) || "E"}${
    surname?.charAt(0) || "T"
  }`.toUpperCase();
  return (
    <Avatar>
      <AvatarFallback className="bg-primary text-muted">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
