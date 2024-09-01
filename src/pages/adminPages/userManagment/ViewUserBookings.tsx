// ViewUserBookings.tsx
import React from "react";
import { useGetAllBookingsQuery } from "../../../redux/features/publicPages/booking.api";

const bookingss = [
  {
    userName: "John Doe",
    serviceName: "Massage Therapy",
    description: "Relaxing full-body massage",
    price: 80,
    duration: "1 hour",
  },
  {
    userName: "Jane Smith",
    serviceName: "Personal Training",
    description: "One-on-one fitness session",
    price: 60,
    duration: "45 minutes",
  },
  // Add more bookings as needed
];

const ViewUserBookings = () => {
  const { data: bookings, error, isLoading } = useGetAllBookingsQuery();

  const allBooking = bookings?.data || [];

  console.log("allBooking", allBooking);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Bookings</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="text-center">
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4  text-gray-600">User Name</th>
            <th className="py-2 px-4  text-gray-600">Service Name</th>
            <th className="py-2 px-4  text-gray-600">V Type</th>
            <th className="py-2 px-4  text-gray-600">Price</th>
            <th className="py-2 px-4  text-gray-600">Duration</th>
            <th className="py-2 px-4  text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allBooking.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-gray-800">
                {booking?.customer?.name}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {booking?.serviceId?.name}
              </td>
              <td className="py-2 px-4 text-gray-800 uppercase">
                {booking?.vehicleType}
              </td>
              <td className="py-2 px-4 text-gray-800">
                ${booking?.serviceId?.price}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {booking?.serviceId?.duration}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {booking?.slotId?.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUserBookings;
