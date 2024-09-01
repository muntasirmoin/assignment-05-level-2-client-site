import { baseApi } from "../../api/baseApi";

export interface TSlotData {
  date: string;
  startTime: string;
  endTime: string;
  service: string;
  isBooked: "available" | "booked" | "canceled"; // Adjust if there are other statuses
}

const slotsManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
      query: ({ date, serviceId }) => ({
        url: "/slots/availability",
        method: "GET",
        params: {
          date,
          serviceId,
        },
      }),
      providesTags: ["Slots"],
    }),
    //
    markSlotAsBooked: builder.mutation<void, { slotId: string }>({
      query: ({ slotId }) => ({
        url: `/slots/${slotId}/book`,
        method: "POST",
      }),
      invalidatesTags: ["Slots"], // Adjust the tag if needed
    }),

    //

    getAllSlotsData: builder.query<any, void>({
      query: () => ({
        url: "/slots/allSlot",
        method: "GET",
        credentials: "include", // Optional, if you need to include cookies or other credentials
      }),
      providesTags: ["Slots"], // Adjust the tag if needed for caching or invalidation
    }),
    //

    createSlot: builder.mutation<void, TSlotData>({
      query: (slotData) => ({
        url: "/services/slots",
        method: "POST",
        body: slotData,
      }),
      invalidatesTags: ["Slots"], // Adjust the tag if needed for caching or invalidation
    }),

    //

    markSlotAsAvailableCanceled: builder.mutation<
      void,
      { slotId: string; currentStatus: "available" | "booked" | "canceled" }
    >({
      query: ({ slotId, currentStatus }) => ({
        url: "/slots/availableCanceled",
        method: "POST",
        body: { slotId, currentStatus },
      }),
      invalidatesTags: ["Slots"], // Adjust the tag if needed
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useMarkSlotAsBookedMutation,
  useGetAllSlotsDataQuery,
  useCreateSlotMutation,
  useMarkSlotAsAvailableCanceledMutation,
} = slotsManagementApi;
