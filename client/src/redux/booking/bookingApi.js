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
  }),
});

export const { useInsertBookingMutation } = bookingApi;
