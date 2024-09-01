import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useGetBookingByIdQuery,
  useGetUpcomingBookingsByUserIdQuery,
} from "../../../redux/features/publicPages/booking.api";

// Example upcoming bookings data
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
// const upcomingBookings = [
//   {
//     id: "1",
//     service: "Car Wash",
//     date: "2024-09-01",
//     startTime: "09:00",
//     endTime: "10:00",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   {
//     id: "1",
//     service: "Car Wash",
//     date: "2024-09-01",
//     startTime: "09:00",
//     endTime: "10:00",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   {
//     id: "1",
//     service: "Car Wash",
//     date: "2024-09-01",
//     startTime: "09:00",
//     endTime: "10:00",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   {
//     id: "1",
//     service: "Car Wash",
//     date: "2024-09-01",
//     startTime: "09:00",
//     endTime: "10:00",
//     vehicleType: "car",
//     vehicleBrand: "Toyota",
//     vehicleModel: "Axio",
//     manufacturingYear: 2024,
//     registrationPlate: "Dhaka-metro-ga-17-1220",
//   },
//   // Add more booking objects as needed
// ];

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = new Date(targetDate).getTime() - now.getTime();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-sm text-gray-600">
      {timeLeft.days !== undefined && (
        <div>
          {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes} Minutes{" "}
          {timeLeft.seconds} Seconds
        </div>
      )}
    </div>
  );
};

const UpcomingBookings = () => {
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  console.log("userID", user?.userId);
  const {
    data: bookings,
    error,
    isLoading,
  } = useGetBookingByIdQuery(user?.userId);
  console.log("bookings", bookings);

  const { data: UpcomingBookings } = useGetUpcomingBookingsByUserIdQuery(
    user?.userId
  );

  console.log("UpcomingBookings", UpcomingBookings);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Upcoming Bookings</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {UpcomingBookings?.data?.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
          >
            <h3 className="text-xl font-semibold mb-2">{booking.service}</h3>
            <p className="text-gray-600 mb-2">Date: {booking.slotId.date}</p>
            <p className="text-gray-600 mb-2">
              Time: {booking.slotId.startTime} - {booking.slotId.endTime}
            </p>
            <p className="text-gray-600 mb-2">Vehicle: {booking.vehicleType}</p>
            <p className="text-gray-600 mb-2">
              Registration: {booking.registrationPlate}
            </p>
            <CountdownTimer
              targetDate={`${booking.slotId.date}T${booking.slotId.startTime}:00`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
