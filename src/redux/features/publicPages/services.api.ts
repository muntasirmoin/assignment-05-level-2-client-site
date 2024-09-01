import { baseApi } from "../../api/baseApi";

const servicesManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create

    createService: builder.mutation({
      query: (newServiceData) => ({
        url: "/services",
        method: "POST",
        credentials: "include",
        body: newServiceData,
      }),
      invalidatesTags: ["Services"], // Invalidate Services to refresh the cache
    }),

    //
    getAllServices: builder.query({
      query: () => {
        return {
          url: "/services",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Services"],
    }),

    //

    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Services"],
    }),

    //

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Services"], // Invalidate Services to refresh the cache
    }),

    //
    updateService: builder.mutation({
      query: ({ id, updatedService }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: updatedService,
        credentials: "include", // Include credentials if required by your backend
      }),
      invalidatesTags: ["Services"], // Invalidate the services cache to refresh the list
    }),

    //
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = servicesManagementApi;
