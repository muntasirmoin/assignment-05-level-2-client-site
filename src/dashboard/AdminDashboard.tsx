import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);

  const serviceExample = [
    {
      _id: "1",
      name: "House Cleaning",
      description: "Comprehensive house cleaning service",
      price: 25,
      duration: 120,
      isDeleted: false,
    },
    {
      _id: "2",
      name: "Gardening",
      description: "Professional gardening and landscaping service",
      price: 30,
      duration: 90,
      isDeleted: false,
    },
    {
      _id: "3",
      name: "House ",
      description: "Comprehensive house cleaning service",
      price: 28,
      duration: 180,
      isDeleted: false,
    },
    {
      _id: "4",
      name: "Gardening & Floor",
      description: "Professional gardening and landscaping service",
      price: 30,
      duration: 70,
      isDeleted: false,
    },
  ];

  // useEffect(() => {
  //   // Fetch services from API (mocked for now)
  //   const fetchServices = async () => {
  //     try {
  //       const response = await axios.get("/api/services"); // Replace with actual API endpoint
  //       setServices(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch services:", error);
  //     }
  //   };

  //   fetchServices();
  // }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              {/* <th className="py-3 px-4 text-center">Service ID</th> */}
              <th className="py-3 px-4 text-center">Service Name</th>
              <th className="py-3 px-4 text-center">Description</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Duration</th>
              {/* <th className="py-3 px-4 text-center">Update</th>
              <th className="py-3 px-4 text-center">Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {serviceExample.map((service) => (
              <tr key={service._id} className="border-b">
                {/* <td className="py-2 px-4">{service._id}</td> */}
                <td className="py-2 px-4 text-center">{service.name}</td>
                <td className="py-2 px-4 text-center">{service.description}</td>
                <td className="py-2 px-4 text-center">${service.price}</td>
                <td className="py-2 px-4 text-center">{service.duration}</td>
                {/* <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleUpdate(service._id)}
                    className="btn btn-warning ml-1  text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="btn btn-error ml-1  text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Placeholder for the handleUpdate and handleDelete functions
const handleUpdate = (id) => {
  console.log("Update service with ID:", id);
};

const handleDelete = (id) => {
  console.log("Delete service with ID:", id);
};

export default AdminDashboard;
