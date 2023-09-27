import apiSlice from "../api/apiSlice";

const busApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBus: builder.query({
      query: () => `/buses`,
      providesTags: ["bus"],
    }),
    getAllAvailabilityBus: builder.query({
      query: (status) => `/buses?availability_status=${status}`,
      providesTags: ["bus", "trip"],
    }),
    addForGetRequestAvailableBus: builder.mutation({
      query: (body) => ({
        url: "/buses/get-available-buses",
        method: "POST",
        body,
      }),
      invalidatesTags: [""], // automatic-data fetching
    }),
    getSingleBusDetails: builder.query({
      query: ({ busId }) => `/buses/${busId}`,
      providesTags: ["bus"],
    }),
    addBus: builder.mutation({
      query: (body) => ({
        url: "/buses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["bus"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetAllBusQuery,
  useGetAllAvailabilityBusQuery,
  useGetSingleBusDetailsQuery,
  useAddBusMutation,
  useAddForGetRequestAvailableBusMutation,
} = busApi;
