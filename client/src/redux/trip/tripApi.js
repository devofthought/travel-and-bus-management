import apiSlice from "../api/apiSlice";

const tripApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrip: builder.query({
      query: () => `/trips`,
      providesTags: ["trip"],
    }),
    getSingleTripDetails: builder.query({
      query: (trip_id) => `/trips/${trip_id}`,
      providesTags: ["trip"],
    }),
    addTrip: builder.mutation({
      query: (body) => ({
        url: "/trips",
        method: "POST",
        body,
      }),
      invalidatesTags: ["trip"],
    }),
    deleteTrip: builder.mutation({
      query: (trip_id) => ({
        url: `/trips/${trip_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["trip"],
    }),
    getAllUpdateAbleTrip: builder.query({
      query: ({ status, statusTwo }) =>
        `/trips/update-able-trip?trips_status=${status}&trips_status=${statusTwo}`,
      providesTags: ["trip"],
    }),
    updateTrip: builder.mutation({
      query: ({ trip_id, body }) => ({
        url: `/trips/${trip_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["trip"],
    }),
  }),
});

export const {
  useGetAllTripQuery,
  useGetSingleTripDetailsQuery,
  useAddTripMutation,
  useDeleteTripMutation,
  useUpdateTripMutation,
  useGetAllUpdateAbleTripQuery,
} = tripApi;
