import React, { useState, useEffect } from "react";
import {
  useGetAllBookingsQuery,
  useGetUpcomingBookingsByUserIdQuery,
} from "../redux/features/publicPages/booking.api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "../redux/features/auth/authApi";
import { useGetAllServiceQuery } from "../redux/features/user/service.api";
import { useGetAllSlotsDataQuery } from "../redux/features/publicPages/slots.api";
import { useGetAllReviewFeedbackQuery } from "../redux/features/reviews/reviewsFeedback.api";

const AdminDashboard = () => {
  const user = useSelector(selectCurrentUser);
  const { data: upcomingBookings } = useGetUpcomingBookingsByUserIdQuery(
    user?.userId
  );
  const { data: allUser } = useGetAllUsersQuery(undefined);
  const { data: allService } = useGetAllServiceQuery(undefined);
  const { data: allBooking } = useGetAllBookingsQuery(undefined);
  const { data: allSLot } = useGetAllSlotsDataQuery(undefined);
  const { data: allReviewFeedback } = useGetAllReviewFeedbackQuery(undefined);
  const upcomingBookingsLength = upcomingBookings?.data?.length;
  const totalUser = allUser?.data?.length | 0;
  const totalService = allService?.data?.length | 0;
  const totalBooking = allBooking?.data?.length | 0;
  const totalSlot = allSLot?.data?.length | 0;
  const totalReviews = allReviewFeedback?.length | 0;

  return (
    <div className="p-6">
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">User Dashboard</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total User</h2>
            <p className="text-2xl">{totalUser}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Service</h2>
            <p className="text-2xl">{totalService}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Slot</h2>
            <p className="text-2xl">{totalSlot} </p>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Booking</h2>
            <p className="text-2xl">{totalBooking} </p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total review</h2>
            <p className="text-2xl">{totalReviews}</p>
          </div>
        </div>
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
