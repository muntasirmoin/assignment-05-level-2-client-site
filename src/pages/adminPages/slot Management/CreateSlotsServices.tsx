import React, { useState, useEffect } from "react";
import {
  TSlotData,
  useCreateSlotMutation,
  useGetAllSlotsDataQuery,
  useMarkSlotAsAvailableCanceledMutation,
} from "../../../redux/features/publicPages/slots.api";
import { useGetAllServicesQuery } from "../../../redux/features/publicPages/services.api";
import Swal from "sweetalert2";
// import axios from "axios";

const CreateSlotsServices = () => {
  const { data: slotsData, error, isLoading } = useGetAllSlotsDataQuery();
  const slotsAllData = slotsData?.data || [];
  console.log("slotsAllData", slotsAllData);

  const { data: servicesData } = useGetAllServicesQuery(undefined);
  const serviceAllData = servicesData?.data || [];
  console.log("serviceAllData", serviceAllData);

  const [
    createSlot, // { isLoading, isError, isSuccess }
  ] = useCreateSlotMutation();

  const [markSlotAsAvailableCanceled] =
    useMarkSlotAsAvailableCanceledMutation();

  const [slots, setSlots] = useState<TSlotData>({
    date: "",
    startTime: "",
    endTime: "",
    service: "",
    isBooked: "available",
  });
  const [newSlot, setNewSlot] = useState<TSlotData>({
    service: "",
    date: "",
    startTime: "",
    endTime: "",
    isBooked: "available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({ ...newSlot, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSlots({ ...slots });
    console.log("submitData", newSlot);
    try {
      await createSlot(newSlot).unwrap();
      // Handle success (e.g., show a success message)

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Slot created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Slot created successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)
      Swal.fire({
        title: "Slot Create Failed!",
        text: `There was an issue with create slot: ${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Failed to create slot:", error);
    }

    // here is the from data come
    console.log("slots:New:", newSlot);
    setNewSlot({
      service: "",
      date: "",
      startTime: "",
      endTime: "",
      isBooked: "available",
    });
    // axios.post("/api/slots", newSlot).then((response) => {
    //   setSlots([...slots, response.data]);
    //   setNewSlot({
    //     service: "",
    //     date: "",
    //     startTime: "",
    //     endTime: "",
    //     isBooked: "available",
    //   });
    // });
  };

  //
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [selectedSlot, setSelectedSlot] = useState({
    service: "",
    date: "",
    startTime: "",
    endTime: "",
    isBooked: "",
  }); // Slot being edited

  //
  const handleUpdate = (id) => {
    // console.log("Update", id);

    const slotToUpdate = slotsAllData.find((slot) => slot._id === id);
    if (slotToUpdate) {
      setSelectedSlot(slotToUpdate);
      setIsModalOpen(true); // Open the modal
    }
    // Handle slot update logic
  };

  //

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedSlot({ ...selectedSlot, [name]: value });
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    setSelectedSlot({ ...selectedSlot });
    console.log("update:data", selectedSlot);
    // axios
    //   .patch(`/api/slots/${selectedSlot._id}`, selectedSlot)
    //   .then((response) => {
    //     setSlots(
    //       slots.map((slot) =>
    //         slot._id === selectedSlot._id ? response.data : slot
    //       )
    //     );
    setIsModalOpen(false);
    setSelectedSlot({
      service: "",
      date: "",
      startTime: "",
      endTime: "",
      isBooked: "",
    });
    //   });
  };

  //

  const handleToggleStatus = async (slotId, currentStatus) => {
    const newStatus = currentStatus === "available" ? "cancelled" : "available";

    console.log("handleToggleStatus", slotId, newStatus);
    try {
      await markSlotAsAvailableCanceled({ slotId, currentStatus }).unwrap();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Slot Status ${newStatus}`,
        showConfirmButton: false,
        timer: 1500,
      });
      // Handle success (e.g., show a success message or update UI)
      console.log("Slot status updated successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)
      Swal.fire({
        title: "Issue with update slot Failed!",
        text: `There was an issue with update slot: ${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Failed to update slot status:", error);
    }
    // axios
    //   .patch(`/api/slots/${id}`, { isBooked: newStatus })
    //   .then((response) => {
    //     setSlots(
    //       slots.map((slot) =>
    //         slot._id === id ? { ...slot, isBooked: newStatus } : slot
    //       )
    //     );
    //   });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Slots</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="service"
          value={newSlot.service}
          onChange={handleChange}
          className="border ml-1 p-2 rounded"
        >
          <option value="">Select Service</option>
          {serviceAllData.map((singleService) => (
            <option key={singleService._id} value={singleService._id}>
              {singleService.name}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          name="service"
          value={newSlot.service}
          onChange={handleChange}
          placeholder="Service ID"
          className="border p-2 rounded"
        /> */}
        <input
          type="date"
          name="date"
          value={newSlot.date}
          onChange={handleChange}
          className="border ml-1  p-2 rounded"
        />
        <input
          type="time"
          name="startTime"
          value={newSlot.startTime}
          onChange={handleChange}
          className="border ml-1  p-2 rounded"
        />
        <input
          type="time"
          name="endTime"
          value={newSlot.endTime}
          onChange={handleChange}
          className="border ml-1  p-2 rounded"
        />
        <select
          name="isBooked"
          value={newSlot.isBooked}
          onChange={handleChange}
          className="border ml-1  p-2 rounded"
        >
          <option value="available">Available</option>
          <option value="booked">Booked</option>
        </select>
        <button
          type="submit"
          className="btn btn-success ml-2  text-white px-4 py-2 rounded"
        >
          Add Slot
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mt-4">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-center">Service</th>
            <th className="py-2 px-4 text-center">Date</th>
            <th className="py-2 px-4 text-center">Start Time</th>
            <th className="py-2 px-4 text-center">End Time</th>
            <th className="py-2 px-4 text-center">Status</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slotsAllData.map((slot) => (
            <tr key={slot._id}>
              <td className="py-2 px-4 text-center">{slot?.service?.name}</td>
              <td className="py-2 px-4 text-center">{slot.date}</td>
              <td className="py-2 px-4 text-center">{slot.startTime}</td>
              <td className="py-2 px-4 text-center">{slot.endTime}</td>
              <td className="py-2 px-4 text-center">
                {slot.isBooked === "available"
                  ? "Available"
                  : slot.isBooked === "booked"
                  ? "Booked"
                  : "Canceled"}
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleToggleStatus(slot._id, slot.isBooked)}
                  className="btn btn-error ml-1  text-white px-4 py-2 rounded"
                  disabled={slot.isBooked === "booked"}
                >
                  {/* {slot.isBooked === "available" ? "Cancel" : "Available"} */}
                  {slot.isBooked === "booked"
                    ? "Booked"
                    : slot.isBooked === "canceled"
                    ? "Available"
                    : "Canceled"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* model start */}
      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Update Slot</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <select
                name="service"
                value={selectedSlot.service}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              >
                <option value="">{selectedSlot.service}</option>
                {slotsAllData.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.service}
                  </option>
                ))}
              </select>

              {/* <input
                type="text"
                name="date"
                value={selectedSlot.service}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              /> */}
              {/*  */}
              <input
                type="date"
                name="date"
                value={selectedSlot.date}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              />
              <input
                type="time"
                name="startTime"
                value={selectedSlot.startTime}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              />
              <input
                type="time"
                name="endTime"
                value={selectedSlot.endTime}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              />

              {/*  */}

              {/* <input
                type="text"
                name="isBooked"
                value={selectedSlot.isBooked}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              /> */}
              <select
                name="isBooked"
                value={selectedSlot.isBooked}
                onChange={handleUpdateChange}
                className="border p-2 rounded"
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
              </select>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* model end */}
    </div>
  );
};

export default CreateSlotsServices;
