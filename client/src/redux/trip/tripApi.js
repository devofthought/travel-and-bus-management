import apiSlice from "../api/apiSlice";

const tripApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrip: builder.query({
      query: ({ limit, page, trips_status }) =>
        `/trips?trips_status=${trips_status}&page=${page}&limit=${limit}`,
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
      query: ({ limit, page }) =>
        `/trips/update-able-trip?page=${page}&limit=${limit}`,
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
    getTripsByUsers: builder.mutation({
      query: (body) => ({
        url: "/trips/get-trips-by-users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["trip"],
    }),
    getBusSeatStatus: builder.mutation({
      query: (body) => ({
        url: "/trips/get-bus-seat-status-on-trip",
        method: "POST",
        body,
      }),
      invalidatesTags: ["trip"],
    }),
    getAllCompletedAndUpcomingTripForUser: builder.query({
      query: ({ trip_status }) => `/trips/up-coming?trip_status=${trip_status}`,
      providesTags: ["trip"],
    }),
    Upgrade: builder.mutation({
      query: (body) => ({
        url: "/trips/update-trip-data-and-time",
        method: "POST",
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
  useGetTripsByUsersMutation,
  useGetBusSeatStatusMutation,
  useGetAllCompletedAndUpcomingTripForUserQuery,
  useUpgradeMutation
} = tripApi;
