import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),

    //

    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/auth/users",
          method: "GET",
          credentials: "include", // Optional, if you need to include cookies or other credentials
        };
      },
      providesTags: ["UserRole"],
    }),

    //
    changeUserRole: builder.mutation({
      query: ({ userId, currentRole }) => {
        return {
          url: "/auth/role",
          method: "POST",
          body: {
            userId,
            currentRole,
          },
          credentials: "include" as RequestCredentials,
        };
      },
      invalidatesTags: ["UserRole"], // You can add tags to invalidate cache if necessary
    }),

    //

    getUserById: builder.query({
      query: (userId) => ({
        url: `auth/singleuser`,
        method: "GET",
        params: { userId }, // Pass userId as a query parameter
        credentials: "include", // Ensure correct type in actual implementation
      }),
      providesTags: ["UserRole"],
    }),

    //
    updateUserById: builder.mutation({
      query: ({ userId, updateData }) => ({
        url: `auth/user/${userId}`, // Define the URL with userId as part of the endpoint
        method: "PUT", // Use PUT method for updating data
        body: updateData, // Pass the updated user data in the request body
        credentials: "include" as RequestCredentials, // Ensure correct type for credentials
      }),
      invalidatesTags: ["UserRole"], // Optional: Invalidate tags if necessary
    }),

    //
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetAllUsersQuery,
  useChangeUserRoleMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
} = authApi;
