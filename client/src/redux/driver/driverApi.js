import apiSlice from "../api/apiSlice";

const driverApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDriver: builder.query({
      query: () => `/driver`,
      providesTags: ["driver"],
    }),
    getSingleDriverDetails: builder.query({
      query: ({ driverId }) => `/driver/${driverId}`,
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
  }),
});

export const {
  useGetAllDriverQuery,
  useGetSingleDriverDetailsQuery,
  useAddDriverMutation,
} = driverApi;
