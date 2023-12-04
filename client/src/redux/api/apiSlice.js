import { getFromLocalStorage } from "@/utils/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      headers.set("authorization", getFromLocalStorage("accessToken"));
      return headers;
    },
  }),
  tagTypes: [
    "ticket",
    "bus",
    "driver",
    "route",
    "incident",
    "trip",
    "feedback",
    "user",
    "booking",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
