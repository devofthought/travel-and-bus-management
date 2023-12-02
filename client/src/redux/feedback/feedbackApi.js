import apiSlice from "../api/apiSlice";

const feedBackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBack: builder.query({
      query: () => `/feedback`,
      providesTags: ["feedback"],
    }),
  }),
});

export const { useGetFeedBackQuery } = feedBackApi;
