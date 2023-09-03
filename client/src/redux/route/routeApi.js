import apiSlice from "../api/apiSlice";

const routeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoute: builder.query({
      query: () => `/route`,
      providesTags: ["route"],
    }),
    getSingleRouteDetails: builder.query({
      query: ({ routeId }) => `/route/${routeId}`,
      providesTags: ["route"],
    }),
  }),
});

export const { useGetAllRouteQuery, useGetSingleRouteDetailsQuery } = routeApi;
