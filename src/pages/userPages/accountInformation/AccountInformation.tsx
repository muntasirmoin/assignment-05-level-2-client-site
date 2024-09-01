import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} from "../../../redux/features/auth/authApi";

const AccountInformation = () => {
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  console.log("userID", user?.userId);

  const userId = user?.userId;

  const { data, error, isLoading } = useGetUserByIdQuery(user?.userId);
  const [updateUserById] = useUpdateUserByIdMutation();

  const [profile, setProfile] = useState({
    name: "",
    email: "",

    phone: "",
    role: "",
    address: "",
  });
  console.log("profile", data?.data);
  useEffect(() => {
    if (data?.data) {
      // Update state with userProfile data
      const userProfile = data?.data;
      setProfile({
        name: userProfile.name || "",
        email: userProfile.email || "",

        phone: userProfile.phone || "",
        role: userProfile.role || "",
        address: userProfile.address || "",
      });
    }
  }, [data]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated profile:", profile);
    setIsEditing(false); // Disable editing mode after saving

    try {
      const updateData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        address: profile.address,
      };
      await updateUserById({ userId, updateData }).unwrap();
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled
          />
        </div>
        {/* <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!isEditing}
          />
        </div> */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={profile.role}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={profile.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            disabled={!isEditing}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            {isEditing && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountInformation;
