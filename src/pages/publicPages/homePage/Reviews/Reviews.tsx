import React from "react";
import { FaStar, FaThumbsUp, FaUser } from "react-icons/fa";
import { useGetAllReviewFeedbackQuery } from "../../../../redux/features/reviews/reviewsFeedback.api";
import { useLocation } from "react-router-dom";
import { TbMessageShare } from "react-icons/tb";

interface Review {
  id: number;
  name: string;
  rating: number;
  feedback: string;
}

// const location = useLocation();
// const { getAllReviewFeedback } = location.state || {};

// console.log("Received getAllReviewFeedback:", getAllReviewFeedback);

const reviewsData: Review[] = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    feedback: "Great service! Highly recommended.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    feedback: "Very good experience, but could improve in timing.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    rating: 3,
    feedback: "It was okay, nothing exceptional.",
  },
  {
    id: 4,
    name: "Michael Brown",
    rating: 5,
    feedback: "Excellent! Will definitely come again.",
  },
  {
    id: 5,
    name: "Sarah Davis",
    rating: 2,
    feedback: "Not satisfied with the service.",
  },
  // Add more reviews here
];

const Reviews: React.FC = () => {
  const {
    data: getAllReviewFeedbackData,
    isLoading: getAllReviewFeedbackIsLoading,
  } = useGetAllReviewFeedbackQuery(undefined);

  console.log("getAllReviewFeedback", getAllReviewFeedbackData);
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 mt-8">All Reviews</h2>
      <div className="space-y-6">
        {getAllReviewFeedbackData?.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between gap-8"
          >
            {/* Reviewer Name (Left) */}
            <div className="w-1/3 text-left">
              <div className="flex items-center mb-2">
                <FaUser className="mr-2 text-gray-500" size={20} />
                <h4 className="text-lg font-semibold text-gray-900">
                  {review.userName}
                </h4>
              </div>
            </div>

            {/* Rating (Center) */}
            <div className="w-1/3 text-center">
              <div className="flex justify-center mb-2">
                {[...Array(review.rating)].map((_, idx) => (
                  <FaStar key={idx} size={20} color="#f59e0b" />
                ))}
                {[...Array(5 - review.rating)].map((_, idx) => (
                  <FaStar key={idx} size={20} color="#e5e7eb" />
                ))}
              </div>
            </div>

            {/* Feedback (Right) */}
            <div className="w-1/3 text-right">
              <div className="flex items-center mb-2">
                <TbMessageShare className="ml-2 text-gray-500" size={20} />
                <p className="text-gray-700 ml-3">{review.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
