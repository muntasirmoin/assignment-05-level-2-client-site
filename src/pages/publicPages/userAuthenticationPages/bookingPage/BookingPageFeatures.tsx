import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../../../redux/features/auth/authSlice";
import { useMarkSlotAsBookedMutation } from "../../../../redux/features/publicPages/slots.api";
import { useCreateBookingMutation } from "../../../../redux/features/publicPages/booking.api";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import ScrollToTopButton from "../../../../components/shared/ScrollToTopButton";

interface TService {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

const BookingPageFeatures = () => {
  // const [service, setService] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [markSlotAsBooked, { isLoading, isSuccess, isError, error }] =
    useMarkSlotAsBookedMutation();

  const [createBooking] = useCreateBookingMutation();
  const token = useSelector(useCurrentToken);
  console.log("tokenBooking", token);

  const booking = useSelector((state: RootState) => state.booking);
  const user = useSelector(selectCurrentUser);

  console.log("BookUser:", user);

  console.log("booking.selectedSlot", booking.selectedSlot);

  const selectedSlotStartTime = booking.selectedSlot?.startTime;
  const selectedSlotDate = booking.selectedSlot?.date;

  const service = booking.selectedSlot?.service as unknown as TService;
  // const { _id, name, description, price, duration, image } = service;
  const customerID = user?.userId;
  const serviceID = service?._id;
  const slotId = booking.selectedSlot?._id;

  const [vehicleType, setVehicleType] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVehicleType(event.target.value);
  };

  const [vehicleBrand, setVehicleBrand] = useState("");
  const [registrationPlate, setRegistrationPlate] = useState("");

  // vehicleBrand

  useEffect(() => {
    // Simulate fetching available slots for the selected date
    const fetchAvailableSlots = async (date: Date) => {
      // Replace with actual fetch later
      const formattedDate = format(date, "yyyy-MM-dd");
    };

    fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };
  const slotID = booking.selectedSlot?._id;

  const handleBookService = async () => {
    if (slotID) {
      try {
        await markSlotAsBooked({ slotId: slotID }).unwrap();
        // alert("Slot booked successfully!");
      } catch (error) {
        console.error("Error booking slot:", error);
        alert(
          `Failed to book slot. ${error.data?.message || "Please try again."}`
        );
      }
    } else {
      alert("No slot selected or slot ID is missing.");
    }

    // booking

    try {
      const bookingData = {
        customer: customerID, // Replace with the actual customer ID
        serviceId: serviceID, // Replace with the actual service ID
        slotId: slotId, // Replace with the actual slot ID
        vehicleType: vehicleType,
        vehicleBrand: "----",
        vehicleModel: "----",
        manufacturingYear: 2024,
        registrationPlate: registrationPlate,
        // Add any other necessary booking data here
      };

      const response = await createBooking({
        bookingData,
        token, // Pass the token here as part of the mutation args
      }).unwrap();

      Swal.fire({
        title: "Booking Successful!",
        text: "Your booking was completed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      window.location.href = response.data.payment_url;
      console.log("Booking Response:", response);
    } catch (error) {
      console.error("Error booking slot:", error);
      Swal.fire({
        title: "Booking Failed!",
        text: `There was an issue with your booking. Please try again. ${error}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    //
  };

  return (
    <>
      <Helmet>
        <title>Booking| Wheels</title>
      </Helmet>
      <ScrollToTopButton></ScrollToTopButton>
      <div className="p-20">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Service Information */}
          <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg">
            {service ? (
              <div className="flex justify-center p-4">
                <div className="card bg-base-100 w-96 shadow-xl">
                  <figure>
                    <img
                      src={service.image} // Dynamically setting the image URL
                      alt={service.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title flex justify-between items-center">
                      {service.name}
                      <div className="badge badge-secondary">
                        {service.duration} Minutes
                      </div>{" "}
                      {/* Optional badge */}
                    </h2>
                    <p className="text-gray-700 mb-2">{service.description}</p>
                    <p className="text-lg font-semibold mb-2">
                      BDT {service.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p>You are not book any service...</p>
            )}
          </div>

          {/* Right Side: User Information and Payment */}
          <div className="w-full md:w-1/3 p-4 bg-gray-50 shadow-lg rounded-lg ml-0 md:ml-4">
            <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleBookService();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={user?.name}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={user?.email}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="slotDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={selectedSlotDate}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="timeSlot"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selected Time Slot
                </label>
                <input
                  type="text"
                  id="timeSlot"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={selectedSlotStartTime || ""}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="timeSlot"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vehicle Name
                </label>
                <select
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select a vehicle</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                  <option value="SUV">SUV</option>
                  <option value="van">Van</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bus">Bus</option>
                  <option value="electricVehicle">Electric Vehicle</option>
                  <option value="hybridVehicle">Hybrid Vehicle</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="tractor">Tractor</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="timeSlot"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration Plate
                </label>
                <input
                  type="text"
                  id="registrationPlate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  onChange={(e) => setRegistrationPlate(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-full"
                disabled={!booking.selectedSlot}
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPageFeatures;
