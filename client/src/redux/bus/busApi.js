import apiSlice from "../api/apiSlice";

const busApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBus: builder.query({
      query: () => `/buses`,
      providesTags: ["bus"],
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
  useGetSingleBusDetailsQuery,
  useAddBusMutation,
} = busApi;
