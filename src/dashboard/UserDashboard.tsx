import React from "react";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../redux/features/auth/authApi";
import {
  useGetPastBookingsByUserIdQuery,
  useGetUpcomingBookingsByUserIdQuery,
} from "../redux/features/publicPages/booking.api";

const UserDashboard = () => {
  const user = useSelector(selectCurrentUser);

  const {
    data: userInfo,
    error,
    isLoading,
  } = useGetUserByIdQuery(user?.userId);

  console.log("userInfo", userInfo);
  const { data: pastBookings } = useGetPastBookingsByUserIdQuery(user?.userId);

  const pastBookingsLength = pastBookings?.data?.length;

  const { data: upcomingBookings } = useGetUpcomingBookingsByUserIdQuery(
    user?.userId
  );

  const upcomingBookingsLength = upcomingBookings?.data?.length;

  console.log("Past Bookings Length:", pastBookingsLength);

  return (
    <div>
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">User Dashboard</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Account Email</h2>
            <p className="text-2xl">{user?.email}</p>
          </div> */}
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Past Booking</h2>
            <p className="text-2xl">{pastBookingsLength}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Upcoming Booking</h2>
            <p className="text-2xl">{upcomingBookingsLength} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
