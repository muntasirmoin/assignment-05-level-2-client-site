import { baseApi } from "../../api/baseApi";
import { RootState } from "../../store";

const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ bookingData, token }) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags: ["Slots", "Booking"], // Adjust this based on your caching strategy
    }),

    //

    getAllBookings: builder.query<any, void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Booking"], // Adjust the tag if needed
    }),
    //
    getBookingById: builder.query({
      query: (customerId) => ({
        url: `/bookings/BookingsCustomerId`,
        method: "GET",
        params: { customerId }, // Attach customerId as query parameter
        credentials: "include", // Include credentials if needed
      }),
      providesTags: ["Booking"],
    }),

    //
    getUpcomingBookingsByUserId: builder.query({
      query: (customerId) => ({
        url: `bookings/upcoming/${customerId}`,
        method: "GET",
        credentials: "include", // Include credentials if your backend requires it
      }),
      providesTags: ["Booking", "UserRole"], // Invalidate or provide tags to keep the cache in sync
    }),

    //

    getPastBookingsByUserId: builder.query({
      query: (customerId) => ({
        url: `bookings/past/${customerId}`,
        method: "GET",
        credentials: "include", // Include credentials if your backend requires it
      }),
      providesTags: ["Booking"], // Invalidate or provide tags to keep the cache in sync
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useGetUpcomingBookingsByUserIdQuery,
  useGetPastBookingsByUserIdQuery,
} = bookingManagementApi;
