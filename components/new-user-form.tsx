"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type UserFields = {
  name: string;
  surname: string;
  planet: string;
  email: string;
};

const NewUserForm: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [newUser, setNewUser] = useState<UserFields>({
    name: "",
    surname: "",
    planet: "",
    email: "",
  });

  const inputFields = [
    { name: "name", placeholder: "Name", type: "text" },
    { name: "surname", placeholder: "Surname", type: "text" },
    { name: "planet", placeholder: "Planet", type: "text" },
    { name: "email", placeholder: "E-mail", type: "email" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Sending newUser:", newUser);
    try {
      await axios.post("/api/admin", newUser);
      router.refresh();
      toast({
        title: "Success",
        description: "New user added successfully.",
      });
      setNewUser({
        name: "",
        surname: "",
        planet: "",
        email: "",
      });
    } catch (error) {
      console.error("Failed to add new user", error);
      toast({
        title: "Error",
        description: "Failed to add new user.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-4 rounded-lg border p-4">
      <div className="flex justify-center">
        <form className="flex max-w-md flex-wrap justify-center space-y-2">
          <h3 className="mb-2 text-lg font-medium">Add New User</h3>
          {inputFields.map((field) => (
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={newUser[field.name as keyof UserFields]}
              onChange={handleChange}
            />
          ))}
          <Button type="button" onClick={handleSubmit} className="w-full">
            Add User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
