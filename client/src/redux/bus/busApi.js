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
  }),
});

export const { useGetAllBusQuery, useGetSingleBusDetailsQuery } = busApi;
