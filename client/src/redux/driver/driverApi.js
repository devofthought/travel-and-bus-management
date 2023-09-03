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
  }),
});

export const { useGetAllDriverQuery, useGetSingleDriverDetailsQuery } =
  driverApi;
