import { ObjectId } from "mongoose";
import React from "react";

interface UpdateServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedService: {
    _id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    duration: number;
    isDeleted: boolean;
  };
  serviceExample: Array<{
    name: string;
    description: string;
    price: number;
    duration: number;
    isDeleted: boolean;
  }>;
  handleUpdateChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleUpdateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedService,
  serviceExample,
  handleUpdateChange,
  handleUpdateSubmit,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Update Slot</h2>
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          {/* <select
            name="service"
            value={selectedService.name}
            onChange={handleUpdateChange}
            className="border p-2 rounded"
          >
            <option value="">{selectedService.service}</option>
            {slotsExample.map((service) => (
              <option key={service._id} value={service._id}>
                {service.service}
              </option>
            ))}
          </select> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={selectedService.name}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={selectedService.price}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="number"
              id="duration" // ID to associate with the label
              name="duration"
              value={selectedService.duration}
              onChange={handleUpdateChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={selectedService.description}
              onChange={handleUpdateChange}
              className="border p-2 rounded w-2/3"
            />
          </div>
          <div>
            {/* image */}
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image 'Set link Here'
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={selectedService.image}
              onChange={handleUpdateChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* <select
            name="isBooked"
            value={selectedService.isBooked}
            onChange={handleUpdateChange}
            className="border p-2 rounded"
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
          </select> */}
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
  );
};

export default UpdateServiceModal;
