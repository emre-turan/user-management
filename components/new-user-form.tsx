"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewUserForm: React.FC = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    planet: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async () => {
    console.log("Sending newUser:", newUser);
    try {
      await axios.post("/api/admin", newUser);
      router.refresh();
    } catch (error) {
      console.error("Failed to add new user", error);
    }
  };

  return (
    <div className="mb-4 rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-medium">Yeni Kullanıcı Ekle</h3>
      <form>
        <input
          type="text"
          name="name"
          placeholder="İsim"
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="Soyisim"
          onChange={handleChange}
        />
        <input
          type="text"
          name="planet"
          placeholder="Gezegen"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Ekle
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
