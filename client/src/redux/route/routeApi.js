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
    addRoute: builder.mutation({
      query: (body) => ({
        url: "/route",
        method: "POST",
        body,
      }),
      invalidatesTags: ["route"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetAllRouteQuery,
  useGetSingleRouteDetailsQuery,
  useAddRouteMutation,
} = routeApi;
