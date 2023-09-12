import apiSlice from "../api/apiSlice";

const incidentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncident: builder.query({
      query: () => `/incident`,
      providesTags: ["incident"],
    }),
    getSingleIncidentDetails: builder.query({
      query: (incident_id) => `/incident/${incident_id}`,
      providesTags: ["incident"],
    }),
    addIncident: builder.mutation({
      query: (body) => ({
        url: "/incident",
        method: "POST",
        body,
      }),
      invalidatesTags: ["incident"],
    }),
    deleteIncident: builder.mutation({
      query: (incident_id) => ({
        url: `/incident/${incident_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["incident"],
    }),
    updateIncident: builder.mutation({
      query: ({ incident_id, body }) => ({
        url: `/incident/${incident_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["incident"],
    }),
  }),
});

export const {
  useGetAllIncidentQuery,
  useGetSingleIncidentDetailsQuery,
  useAddIncidentMutation,
  useDeleteIncidentMutation,
  useUpdateIncidentMutation,
} = incidentApi;
