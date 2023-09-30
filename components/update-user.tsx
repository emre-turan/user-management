"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AlertModal from "./alert-modal";

interface UserProfileClientProps {
  user: any;
  isAdmin?: boolean;
}

const UserProfileClient: React.FC<UserProfileClientProps> = ({
  user,
  isAdmin,
}) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [editedValue, setEditedValue] = useState<string>("");
  const router = useRouter();

  const { toast } = useToast();

  const handleEdit = (fieldName: string, value: string) => {
    setIsEditing({ ...isEditing, [fieldName]: true });
    setEditedValue(value);
  };

  const handleCancel = (fieldName: string) => {
    setIsEditing({ ...isEditing, [fieldName]: false });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/${user.id}`);
      router.refresh();
      toast({
        title: "Deleted",
        description: "User deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete user", error);
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (fieldName: string) => {
    try {
      await axios.patch(`/api/users/${user.id}`, { [fieldName]: editedValue });
      router.refresh();
      toast({
        title: "Success",
        description: "User updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update user", error);
      toast({
        title: "Error",
        description: "Failed to update user.",
        variant: "destructive",
      });
    }
    setIsEditing({ ...isEditing, [fieldName]: false });
  };

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    try {
      await axios.patch(`/api/users/${user.id}`, { role: newRole });
      router.refresh();
      toast({
        title: "Role Updated",
        description: "User role updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update user role", error);
      toast({
        description: "Failed to update user role.",
        variant: "destructive",
      });
    }
  };

  const fields = [
    { name: "name", label: "Name" },
    { name: "surname", label: "Surname" },
    { name: "planet", label: "Planet" },
    { name: "email", label: "E-mail" },
  ];

  const renderField = (fieldName: string, fieldValue: string) => (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">
          {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
        </Label>
        {isEditing[fieldName] ? (
          <Input
            className="w-32"
            defaultValue={fieldValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
        ) : (
          <span className="text-sm">{fieldValue}</span>
        )}
      </div>
      <div className="ml-auto">
        {isEditing[fieldName] ? (
          <div className="flex space-x-2">
            <Button variant="link" onClick={() => handleSave(fieldName)}>
              Confirm
            </Button>
            <Button variant="link" onClick={() => handleCancel(fieldName)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="link"
            onClick={() => handleEdit(fieldName, fieldValue)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );

  const renderRoleField = () => (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">Role:</Label>
        <select
          value={user.role}
          onChange={handleRoleChange}
          className="w-32 rounded border"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      {fields.map((field) => (
        <>{renderField(field.name, user[field.name])}</>
      ))}
      {isAdmin && renderRoleField()}
      {isAdmin && <AlertModal onClick={handleDelete} />}
    </div>
  );
};

export default UserProfileClient;
