import apiSlice from "../api/apiSlice";

const driverApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDriver: builder.query({
      query: () => `/driver`,
      providesTags: ["driver"],
    }),
    getAllAvailabilityDriver: builder.query({
      query: (status) => `/driver?driving_status=${status}`,
      providesTags: ["driver", "trip"],
    }),
    getSingleDriverDetails: builder.query({
      query: (driverId) => `/driver/${driverId}`,
      providesTags: ["driver"],
    }),
    addDriver: builder.mutation({
      query: (body) => ({
        url: "/auth/admin/create-driver",
        method: "POST",
        body,
      }),
      invalidatesTags: ["driver"],
    }),
    deleteDriver: builder.mutation({
      query: (driver_id) => ({
        url: `/driver/${driver_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["driver"],
    }),
    updateDriver: builder.mutation({
      query: ({ driver_id, body }) => ({
        url: `/driver/${driver_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["driver"],
    }),
  }),
});

export const {
  useGetAllDriverQuery,
  useGetAllAvailabilityDriverQuery,
  useGetSingleDriverDetailsQuery,
  useAddDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApi;
