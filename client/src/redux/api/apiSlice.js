import { getFromLocalStorage } from "@/utils/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}api/v1`,
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
    "reserveBus",
    "support",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
