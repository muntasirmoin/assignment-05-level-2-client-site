import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSlot } from "../../../../pages/publicPages/userAuthenticationPages/servicesPage/ServiceDetailsPage";

interface BookingState {
  serviceName: string | null;
  selectedSlot: TSlot | null;
}

const initialState: BookingState = {
  serviceName: null,
  selectedSlot: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingInfo: (state, action: PayloadAction<BookingState>) => {
      state.serviceName = action.payload.serviceName;
      state.selectedSlot = action.payload.selectedSlot;
    },
    clearBookingInfo: (state) => {
      state.serviceName = null;
      state.selectedSlot = null;
    },
  },
});

export const { setBookingInfo, clearBookingInfo } = bookingSlice.actions;

export default bookingSlice.reducer;
