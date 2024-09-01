// import {
//   TAcademicDepartment,
//   TAcademicFaculty,
//   TAcademicSemester,
// } from "../../../types/academicManagement.type";
// import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    getAllService: builder.query({
      query: () => {
        return {
          url: "/services",
          method: "GET",
          credentials: "include",
        };
      },
    }),

    //

    //

    //

    //

    //
  }),
});

export const { useGetAllServiceQuery } = userManagementApi;
