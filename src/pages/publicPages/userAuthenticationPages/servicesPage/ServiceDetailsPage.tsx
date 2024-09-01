import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns"; // For date formatting
import { useGetServiceByIdQuery } from "../../../../redux/features/publicPages/services.api";
import { useGetAllSlotsQuery } from "../../../../redux/features/publicPages/slots.api";
import { setBookingInfo } from "../../../../redux/features/publicPages/booking/bookingSlice";
import { useDispatch } from "react-redux";

export interface TSlot {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: "available" | "booked" | "canceled";
}

const ServiceDetailsPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [availableSlots, setAvailableSlots] = useState<TSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: serviceData,
    error,
    isLoading,
  } = useGetServiceByIdQuery(serviceId);
  const service = serviceData?.data;

  const date = format(selectedDate, "yyyy-MM-dd");
  const { data: slots, error: slotsError } = useGetAllSlotsQuery({
    date,
    serviceId,
  });

  useEffect(() => {
    if (slotsError) {
      // If there's an error (e.g., 404 Not Found), clear the slots
      setAvailableSlots([]);
    } else if (slots?.data && slots.data.length > 0) {
      // If slots data is found, update the state
      setAvailableSlots(slots.data);
    } else {
      // If no slots found for the selected date, clear previous slots
      setAvailableSlots([]);
    }
  }, [serviceId, selectedDate, slots, slotsError]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleSlotClick = (slot: TSlot) => {
    setSelectedSlot(slot);
  };

  const handleBookService = async () => {
    console.log("selectedSlot:", selectedSlot);
    if (selectedSlot) {
      // Dispatch booking information to Redux
      dispatch(
        setBookingInfo({
          serviceName: service.name,
          selectedSlot: selectedSlot || null,
        })
      );
      navigate("/bookingPageFeatures");
    }
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    // try {
    //   const response = await fetch(`/api/services/${serviceId}/book`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ slot: selectedSlot }),
    //   });
    //   if (response.ok) {
    //     alert("Service booked successfully!");
    //   } else {
    //     console.error("Failed to book service");
    //   }
    // } catch (error) {
    //   console.error("Error booking service:", error);
    // }
  };

  return (
    <div className="py-16">
      <div className="p-4 max-w-4xl mx-auto">
        {service ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Service Header */}
            <div className="relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white">
                  {service.name}
                </h1>
              </div>
            </div>

            {/* Service Details */}
            <div className="p-6">
              <p className="text-gray-700 mb-4">{service.description}</p>
              <p className="text-lg font-semibold mb-4">
                BDT {service?.price?.toFixed(2)}
              </p>

              {/* Date Picker */}
              <div className="mb-6">
                <label
                  htmlFor="date"
                  className="block text-lg font-bold text-gray-700"
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
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Available Time Slots
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot._id}
                        className={`btn ${
                          slot === selectedSlot
                            ? "btn-primary"
                            : "btn-secondary"
                        } ${
                          slot.isBooked === "booked"
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        disabled={slot.isBooked === "booked"}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot.startTime}
                      </button>
                    ))
                  ) : (
                    <p>No available slots for this date.</p>
                  )}
                </div>
              </div>

              {/* Book Button */}
              <div>
                <button
                  className="btn btn-success w-full"
                  onClick={handleBookService}
                  disabled={!selectedSlot}
                >
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading service details...</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
