import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: ({ headers }) => ({
        url: `/users/`,
        headers: headers,
      }),
    }),
    getMyProfile: builder.query({
      query: ({ headers }) => ({
        url: `/users/my-profile`,
        headers: headers,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetMyProfileQuery,
} = userApi;
