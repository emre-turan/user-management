"use client";

import { useState } from "react";

interface UpdateFieldProps {
  initialValue: string;
  fieldName: string;
  onUpdate: (fieldName: string, newValue: string) => void;
}

const UpdateField: React.FC<UpdateFieldProps> = ({
  initialValue,
  fieldName,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = () => {
    setIsEditing(false);
    onUpdate(fieldName, value);
  };

  return (
    <div className="flex items-center">
      {isEditing ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleConfirmClick}>Onayla</button>
        </>
      ) : (
        <>
          <span>{value}</span>
          <button onClick={handleEditClick}>Düzenle</button>
        </>
      )}
    </div>
  );
};

export default UpdateField;
