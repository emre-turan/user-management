"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleSave = async (fieldName: string) => {
    try {
      await axios.patch(`/api/users/${user.id}`, { [fieldName]: editedValue });
      router.refresh();
    } catch (error) {
      console.error("Failed to update user", error);
    }
    setIsEditing({ ...isEditing, [fieldName]: false });
  };

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    try {
      await axios.patch(`/api/users/${user.id}`, { role: newRole });
      router.refresh();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  const renderField = (fieldName: string, fieldValue: string) => (
    <div className="">
      {isEditing[fieldName] ? (
        <>
          <input
            defaultValue={fieldValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <button onClick={() => handleSave(fieldName)}>Confirm</button>
          <button onClick={() => handleCancel(fieldName)}>Cancel</button>
        </>
      ) : (
        <>
          {fieldValue}
          <button onClick={() => handleEdit(fieldName, fieldValue)}>
            Edit
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex space-x-2">
        <div className="font-medium">Name:</div>
        <div>{renderField("name", user.name)}</div>
      </div>

      <div className="text-lg font-medium">Surname:</div>
      {renderField("surname", user.surname)}
      <div className="text-lg font-medium">Planet:</div>
      {renderField("planet", user.planet)}
      <div className="text-lg font-medium">Email:</div>
      {user.email}
      {isAdmin && (
        <>
          <div className="text-lg font-medium">Role:</div>
          <select value={user.role} onChange={handleRoleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </>
      )}
      {isAdmin && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default UserProfileClient;
