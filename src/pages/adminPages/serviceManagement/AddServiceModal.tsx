import React, { useState } from "react";

interface AddServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onAddService: (service: any) => void; // Replace `any` with your service type
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onAddService,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService = {
      name,
      description,
      price,
      duration,
      isDeleted,
      image,
    };
    console.log("add Service:", newService);
    onAddService(newService);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
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
            value={image!}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          {/*  */}
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price!}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 rounded w-full"
            required
          />

          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration!}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border p-2 rounded w-full"
            required
          />

          {/* <label
            htmlFor="isDeleted"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Is Deleted
          </label>
          <input
            type="checkbox"
            id="isDeleted"
            checked={isDeleted}
            onChange={(e) => setIsDeleted(e.target.checked)}
            className="mr-2"
          /> */}
          {/* <span>Deleted</span> */}

          <div className="flex justify-end mt-4">
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
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
