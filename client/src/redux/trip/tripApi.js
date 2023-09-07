import apiSlice from "../api/apiSlice";

const tripApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrip: builder.query({
      query: () => `/trips`,
      providesTags: ["trip"],
    }),
    getSingleTripDetails: builder.query({
      query: (trip_id) => `/trip/${trip_id}`,
      providesTags: ["trip"],
    }),
    addTrip: builder.mutation({
      query: (body) => ({
        url: "/trip",
        method: "POST",
        body,
      }),
      invalidatesTags: ["trip"],
    }),
    deleteTrip: builder.mutation({
      query: (trip_id) => ({
        url: `/trip/${trip_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["trip"],
    }),
    updateTrip: builder.mutation({
      query: ({ trip_id, body }) => ({
        url: `/trip/${trip_id}`,
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
} = tripApi;
