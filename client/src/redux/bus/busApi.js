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
      invalidatesTags: ["bus"],
    }),
    UpdateBus: builder.mutation({
      query: ({ bus_id, body }) => ({
        url: `/buses/${bus_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["bus"],
    }),
    UpdateBusImage: builder.mutation({
      query: ({ bus_id, body }) => ({
        url: `/buses/image/${bus_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["bus"],
    }),
    getAllReserveBusRequest: builder.query({
      query: ({ status }) => `/reserveBus?status=${status}`,
      providesTags: ["reserveBus"],
    }),
  }),
});

export const {
  useGetAllBusQuery,
  useGetAllAvailabilityBusQuery,
  useGetSingleBusDetailsQuery,
  useAddBusMutation,
  useAddForGetRequestAvailableBusMutation,
  useUpdateBusMutation,
  useUpdateBusImageMutation,
  useGetAllReserveBusRequestQuery,
} = busApi;
