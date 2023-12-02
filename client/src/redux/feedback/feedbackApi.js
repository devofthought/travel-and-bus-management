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
  }),
});

export const { useGetFeedBackQuery, useAddFeedBackMutation } = feedBackApi;
