import apiSlice from "../api/apiSlice";

const routeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoute: builder.query({
      query: () => `/route`,
      providesTags: ["route"],
    }),
    getSingleRouteDetails: builder.query({
      query: (route_id) => `/route/${route_id}`,
      providesTags: ["route"],
    }),
    addRoute: builder.mutation({
      query: (body) => ({
        url: "/route",
        method: "POST",
        body,
      }),
      invalidatesTags: ["route"],
    }),
    deleteRoute: builder.mutation({
      query: (route_id) => ({
        url: `/route/${route_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["route"],
    }),
    updateRoute: builder.mutation({
      query: ({ route_id, body }) => ({
        url: `/route/${route_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["route"],
    }),
  }),
});

export const {
  useGetAllRouteQuery,
  useGetSingleRouteDetailsQuery,
  useAddRouteMutation,
  useDeleteRouteMutation,
  useUpdateRouteMutation,
} = routeApi;
