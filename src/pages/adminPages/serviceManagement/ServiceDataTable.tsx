import React, { useState, useEffect } from "react";
import UpdateServiceModal from "./UpdateServiceModal";
import Swal from "sweetalert2";
import AddServiceModal from "./AddServiceModal";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "../../../redux/features/publicPages/services.api";

const ServiceDataTable = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({
    name: "",
    description: "",
    _id: "",
    image: "",
    price: 0,
    duration: 0,
    isDeleted: false,
  });

  const {
    data: servicesData,
    isLoading,
    error,
  } = useGetAllServicesQuery(undefined);

  const [createService] = useCreateServiceMutation();

  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  console.log(" servicesData", servicesData);

  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("update:", selectedService);
    setSelectedService({
      ...selectedService,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Modal data Update:", selectedService);
    // Handle submit logic here
    // setIsModalOpen(false);
    if (selectedService) {
      try {
        await updateService({
          id: selectedService._id,
          updatedService: selectedService,
        }).unwrap();
        Swal.fire("Success!", "Service has been updated.", "success");
        setIsModalOpen(false); // Close the modal after successful update
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to update the service.", "error");
      }
    }
  };

  const handleUpdate = (id: string) => {
    const slotToUpdate = servicesData?.data?.find((slot) => slot._id === id);
    console.log("slotToUpdate", slotToUpdate);
    if (slotToUpdate) {
      setSelectedService(slotToUpdate);
      setIsModalOpen(true); // Open the modal
    }
  };

  // modal

  //   add service start
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addService, setAddService] = useState<any[]>([]);

  // add
  const handleAddService = async (newService: any) => {
    // Optimistically update the UI
    console.log("add service data table Service:", newService);
    setAddService([...addService, newService]);

    try {
      // Send the new service to the server
      //   await addServiceToServer(newService); // Replace with your API call
      await createService(newService).unwrap();
      Swal.fire("Success!", "Service has been added.", "success");
    } catch (error) {
      // Rollback the optimistic update on failure
      setAddService(
        addService.filter((service) => service.name !== newService.name)
      );

      Swal.fire("Error!", "Failed to add the service.", "error");
    } finally {
      setIsAddModalOpen(false); // Close the modal
    }
  };

  // delete
  const handleDelete = async (id) => {
    console.log("Delete service with ID:", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Proceed with the deletion
      // For example, call an API to delete the data
      try {
        await deleteService(id); // Replace with your delete function
        Swal.fire("Deleted!", "The data has been deleted.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire(
          `Error! ${error}", "There was a problem deleting the data.`,
          "error"
        );
      }
    }
  };
  // end

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-6">Service Management</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-success text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              {/* <th className="py-3 px-4 text-center">Service ID</th> */}
              <th className="py-3 px-4 text-center">Service Name</th>
              <th className="py-3 px-4 text-center">Description</th>
              <th className="py-3 px-4 text-center">Price[BDT]</th>
              <th className="py-3 px-4 text-center">Duration[minutes]</th>
              <th className="py-3 px-4 text-center">Update</th>
              <th className="py-3 px-4 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {servicesData?.data?.map((service) => (
              <tr key={service._id} className="border-b">
                {/* <td className="py-2 px-4">{service._id}</td> */}
                <td className="py-2 px-4 text-center">{service.name}</td>
                <td className="py-2 px-4 text-center">{service.description}</td>
                <td className="py-2 px-4 text-center">{service.price}</td>
                <td className="py-2 px-4 text-center">{service.duration}</td>
                <td className="py-2 px-4 text-center">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* update modal */}
        <UpdateServiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedService={selectedService}
          serviceExample={servicesData?.data}
          handleUpdateChange={handleUpdateChange}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      </div>
      {/* add modal */}
      {isAddModalOpen && (
        <AddServiceModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          onAddService={handleAddService}
        />
      )}
    </div>
  );
};

// Placeholder for the handleUpdate and handleDelete functions
const handleUpdate = (id) => {
  console.log("Update service with ID:", id);
};

export default ServiceDataTable;
