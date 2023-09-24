"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserProfileClientProps {
  user: any;
}

const UserProfileClient: React.FC<UserProfileClientProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [editedValue, setEditedValue] = useState<string>("");
  const router = useRouter();

  const handleEdit = (fieldName: string, value: string) => {
    setIsEditing({ ...isEditing, [fieldName]: true });
    setEditedValue(value);
  };

  const handleSave = async (fieldName: string) => {
    try {
      await axios.patch(`/api/users/${user.id}`, { [fieldName]: editedValue });
      router.refresh(); // Refresh the page to reflect the changes
    } catch (error) {
      console.error("Failed to update user", error);
    }
    setIsEditing({ ...isEditing, [fieldName]: false });
  };

  const renderField = (fieldName: string, fieldValue: string) => (
    <div className="text-lg">
      {isEditing[fieldName] ? (
        <>
          <input
            defaultValue={fieldValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <button onClick={() => handleSave(fieldName)}>Confirm</button>
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
      <div className="text-lg font-medium">Name:</div>
      {renderField("name", user.name)}
      <div className="text-lg font-medium">Surname:</div>
      {renderField("surname", user.surname)}
      <div className="text-lg font-medium">Planet:</div>
      {renderField("planet", user.planet)}
    </div>
  );
};

export default UserProfileClient;
