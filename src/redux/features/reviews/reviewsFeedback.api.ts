// import {
//   TAcademicDepartment,
//   TAcademicFaculty,
//   TAcademicSemester,
// } from "../../../types/academicManagement.type";
// import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const reviewsFeedbackManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    getAllReviewFeedback: builder.query({
      query: () => {
        return {
          url: "/rating-and-feedback",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["ReviewsFeedback"],
    }),

    //

    createReviewFeedback: builder.mutation({
      query: (newFeedback) => ({
        url: "/rating-and-feedback",
        method: "POST",
        body: newFeedback,
        credentials: "include",
      }),
      invalidatesTags: ["ReviewsFeedback"],
    }),

    //

    //

    //

    //
  }),
});

export const { useGetAllReviewFeedbackQuery, useCreateReviewFeedbackMutation } =
  reviewsFeedbackManagementApi;
