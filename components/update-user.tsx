"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import AlertModal from "./alert-modal";
import { Check, Edit, X } from "lucide-react";

interface UpdateUserProps {
  user: any;
  isAdmin?: boolean;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, isAdmin }) => {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [editedValue, setEditedValue] = useState<string>("");

  const router = useRouter();
  const { toast } = useToast();

  function handleEdit(fieldName: string, value: string) {
    setIsEditing({ ...isEditing, [fieldName]: true });
    setEditedValue(value);
  }

  function handleCancel(fieldName: string) {
    setIsEditing({ ...isEditing, [fieldName]: false });
  }

  async function handleDelete() {
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
  }

  async function handleSave(fieldName: string) {
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
  }

  async function handleRoleChange(newRole: string) {
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
  }

  const fields = [
    { name: "name", label: "Name" },
    { name: "surname", label: "Surname" },
    { name: "planet", label: "Planet" },
    { name: "email", label: "E-mail" },
  ];

  const renderField = (fieldName: string, fieldValue: string) => (
    <div className="flex items-center space-y-2">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium" htmlFor={fieldName}>
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
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSave(fieldName)}
            >
              <Check size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCancel(fieldName)}
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => handleEdit(fieldName, fieldValue)}
          >
            <Edit className="ml-2" size={16} />
          </Button>
        )}
      </div>
    </div>
  );

  const renderRoleField = () => (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Label className="text-sm font-medium">Role:</Label>
        <Select value={user.role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
      </div>
    </div>
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {user.name} {user.surname}
        </AccordionTrigger>
        <AccordionContent>
          {fields.map((field) => (
            <>{renderField(field.name, user[field.name])}</>
          ))}
          {isAdmin && <Separator />}
          <div className="mt-4 flex justify-between">
            {isAdmin && renderRoleField()}
            {isAdmin && <AlertModal onClick={handleDelete} />}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default UpdateUser;
