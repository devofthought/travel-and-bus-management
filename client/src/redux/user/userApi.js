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
      query: () => `/users/my-profile`,
      providesTags: ["user"],
    }),
    updateUserEmail: builder.mutation({
      query: (data) => ({
        url: `/users/user-email-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    UpdateUserPassword: builder.mutation({
      query: (data) => ({
        url: `/users/user-password-update`,
        method: "PATCH",
        body: data,
      }),
    }),
    UpdateTravelerProfile: builder.mutation({
      query: (data) => ({
        url: `/traveler/traveler-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useUpdateUserEmailMutation,
  useUpdateUserPasswordMutation,
  useUpdateTravelerProfileMutation,
} = userApi;
