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
        alert("Slot booked successfully!");
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

      alert("Booking successful!");
      console.log("Booking Response:", response);
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Failed to book the slot. Please try again.");
    }

    //
  };

  return (
    <div className="p-20">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Service Information */}
        <div className="w-full md:w-2/3 p-4 bg-white shadow-lg rounded-lg">
          {service ? (
            <div>
              {/* Service Header */}
              <div className="relative mb-6">
                <img
                  src={service?.image}
                  alt={service?.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h1 className="text-3xl font-bold text-white">
                    {service?.name}
                  </h1>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <p className="text-gray-700 mb-4">{service?.description}</p>
                <p className="text-lg font-semibold mb-4">
                  Price: ${service?.price.toFixed(2)}
                </p>

                {/* Date Picker */}
                <div className="mb-6">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    onChange={handleDateChange}
                    value={format(selectedDate, "yyyy-MM-dd")}
                  />
                </div>

                {/* Time Slots */}
                {/* <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Available Time Slots
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((slot) => (
                        <button
                          key={slot}
                          className={`btn ${
                            slot === selectedSlot
                              ? "btn-primary"
                              : "btn-secondary"
                          } ${false ? "cursor-not-allowed opacity-50" : ""}`}
                          disabled={false}
                          onClick={() => handleSlotClick(slot)}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <p>No available slots for this date.</p>
                    )}
                  </div>
                </div> */}
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
                Vehicle Brand
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
  );
};

export default BookingPageFeatures;
