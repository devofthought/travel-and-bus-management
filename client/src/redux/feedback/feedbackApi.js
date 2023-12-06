import apiSlice from "../api/apiSlice";

const feedBackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBack: builder.query({
      query: () => `/feedback`,
      providesTags: ["feedback"],
    }),
    addFeedBack: builder.mutation({
      query: (body) => ({
        url: "/feedback",
        method: "POST",
        body,
      }),
      invalidatesTags: ["feedback"],
    }),
    getSupportBack: builder.query({
      query: () => `/support`,
      providesTags: ["support"],
    }),
    addSupportConnection: builder.mutation({
      query: (body) => ({
        url: "/support",
        method: "POST",
        body,
      }),
      invalidatesTags: ["support"],
    }),
  }),
});

export const {
  useGetFeedBackQuery,
  useAddFeedBackMutation,
  useGetSupportBackQuery,
  useAddSupportConnectionMutation,
} = feedBackApi;
