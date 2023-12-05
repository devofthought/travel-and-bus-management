import apiSlice from "../api/apiSlice";

const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    insertBooking: builder.mutation({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
      invalidatesTags: ["booking"],
    }),
    reserveBus: builder.mutation({
      query: (body) => ({
        url: "/reserveBus",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useInsertBookingMutation, useReserveBusMutation } = bookingApi;
