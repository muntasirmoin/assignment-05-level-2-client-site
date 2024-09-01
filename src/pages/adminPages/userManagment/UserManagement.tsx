import React, { useState } from "react";
import {
  useChangeUserRoleMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/auth/authApi";

// Sample data (replace with actual data from your API)
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "user" },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "admin",
  },
];

const UserManagementTable = () => {
  const [userList, setUserList] = useState(users);
  const [editingUserId, setEditingUserId] = useState(null);

  const { data, error, isLoading } = useGetAllUsersQuery(undefined);

  const [
    changeUserRole, // { isLoading, isError, isSuccess }
  ] = useChangeUserRoleMutation();

  const userData = data?.data || [];
  console.log(userData);
  const handleRoleChange = (e, userId) => {
    const newRole = e.target.value;

    console.log(newRole);

    setUserList(
      userList.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const startEditing = (userId) => {
    setEditingUserId(userId);
  };

  const saveRole = () => {
    setEditingUserId(null);
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "user" ? "admin" : "user";

    // console.log("handleToggleStatus", slotId, newStatus);
    try {
      console.log("handleToggleStatus", userId, newStatus);
      await changeUserRole({ userId, currentRole: newStatus }).unwrap();
      // Handle success (e.g., show a success message or update UI)
      console.log("User role status updated successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Failed to update user role status:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-center text-gray-600">Name</th>
            <th className="py-2 px-4 text-center text-gray-600">Email</th>
            <th className="py-2 px-4 text-center text-gray-600">Role</th>
            <th className="py-2 px-4 text-center text-gray-600">Change Role</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {userData?.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4  text-gray-800">{user.name}</td>
              <td className="py-2 px-4 text-gray-800">{user.email}</td>
              <td className="py-2 px-4 text-gray-800">
                <span className="uppercase">{user.role}</span>
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleToggleStatus(user._id, user.role)}
                  className="btn btn-error ml-1 text-white px-4 py-2 rounded"
                >
                  <span className="uppercase">
                    {user.role === "user" ? "admin" : "user"}
                  </span>
                </button>
              </td>
              {/* <td className="py-2 px-4 text-gray-800">
                {editingUserId === user._id ? (
                  <button
                    onClick={saveRole}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(user._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;
