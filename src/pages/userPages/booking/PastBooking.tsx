import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useGetPastBookingsByUserIdQuery,
  useGetUpcomingBookingsByUserIdQuery,
} from "../../../redux/features/publicPages/booking.api";

interface Slot {
  date: string;
  // Add other fields if necessary
}

interface Booking {
  _id: string;
  slotId: Slot;
  // Add other fields if necessary
}

// const pastBookings = [
//   {
//     customer: "666be46037bc0921202187a3",
//     serviceId: "666c0a0d490282e10ea489fa",
//     slotId: "666c2be822d0218d942c850f",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   {
//     customer: "666be46037bc0921202187a3",
//     serviceId: "666c0a0d490282e10ea489fa",
//     slotId: "666c2be822d0218d942c850f",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   {
//     customer: "666be46037bc0921202187a3",
//     serviceId: "666c0a0d490282e10ea489fa",
//     slotId: "666c2be822d0218d942c850f",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   // Add more booking objects as needed
// ];

const PastBooking = () => {
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  console.log("userID", user?.userId);

  const { data: pastBookings } = useGetPastBookingsByUserIdQuery(user?.userId);
  console.log("PastBookings", pastBookings?.data);

  //start

  //end

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Past Bookings</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b text-center">
            <th className="py-3 px-4 ">Service </th>
            <th className="py-3 px-4 ">Price</th>
            <th className="py-3 px-4 ">Date</th>
            <th className="py-3 px-4 ">Duration</th>
            <th className="py-3 px-4 ">Vehicle Type</th>

            <th className="py-3 px-4 ">Registration Plate</th>
          </tr>
        </thead>
        <tbody>
          {pastBookings?.data.map((booking, index) => (
            <tr key={index} className="border-b text-center">
              <td className="py-2 px-4">{booking?.serviceId?.name}</td>
              <td className="py-2 px-4">{booking?.serviceId?.price}</td>
              <td className="py-2 px-4">{booking?.slotId?.date}</td>
              <td className="py-2 px-4">{booking?.serviceId?.duration}</td>

              <td className="py-2 px-4 uppercase">{booking?.vehicleType}</td>

              <td className="py-2 px-4">{booking?.registrationPlate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastBooking;
