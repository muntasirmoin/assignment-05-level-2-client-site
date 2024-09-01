import React, { useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import {
  useCreateReviewFeedbackMutation,
  useGetAllReviewFeedbackQuery,
} from "../../../../redux/features/reviews/reviewsFeedback.api";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";
import OverlayReviews from "./OverlayReviews";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | undefined>(undefined);
  const [feedback, setFeedback] = useState("");
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  console.log("reviewUSer", user, "userName", user?.name);

  const [createReviewFeedback, { isLoading, error }] =
    useCreateReviewFeedbackMutation();

  const {
    data: getAllReviewFeedback,
    isLoading: getAllReviewFeedbackIsLoading,
  } = useGetAllReviewFeedbackQuery(undefined);

  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.userId; // Replace with actual user ID
    const userName = user?.name;
    if (rating && feedback) {
      const newReviewFeedback = { rating, feedback, userId, userName };
      console.log("newReviewFeedback:", newReviewFeedback);
      try {
        await createReviewFeedback(newReviewFeedback).unwrap();
        Swal.fire({
          title: "Review Submitted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Clear the feedback textarea and reset state
        setFeedback("");
        setRating(0);
        setHover(undefined);
      } catch (err) {
        console.error("Failed to create feedback:", err);
      }
    }
  };

  const calculateAverageRating = () => {
    if (!getAllReviewFeedback || getAllReviewFeedback.length === 0) return 0;
    const total = getAllReviewFeedback.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return (total / getAllReviewFeedback.length).toFixed(1);
  };

  return (
    <>
      <div className="relative bg-gray-100 mx-auto py-4 mt-5 mb-5">
        <h2 className="text-3xl font-bold text-center mb-8">Reviews </h2>
        {/* Overlay */}
        {!user && (
          <>
            <OverlayReviews onLoginClick={handleLoginClick}></OverlayReviews>
          </>
        )}

        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8">
          {/* Review Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Leave a Review
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {/* Star Rating */}
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          className="hidden"
                          value={ratingValue}
                          onClick={() => handleRating(ratingValue)}
                        />
                        <FaStar
                          size={30}
                          color={
                            ratingValue <= (hover || rating)
                              ? "#f59e0b"
                              : "#e5e7eb"
                          }
                          className="cursor-pointer transition-colors duration-200"
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(undefined)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Textarea */}
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Write your feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                {user ? (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
                  >
                    Submit Review
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
                    onClick={handleLoginClick}
                  >
                    Login to Submit Review
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Post-Submission Display */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
            <h3 className="text-3xl font-bold text-center mb-6">
              Customer Reviews
            </h3>
            {/* Average Rating Display */}
            <div className="text-center mb-6">
              <h4 className="text-4xl font-bold">
                {calculateAverageRating()}{" "}
                <span className="text-yellow-500">★</span>
              </h4>
              <p className="text-gray-500">
                {getAllReviewFeedback?.length} Reviews
              </p>
            </div>

            {/* Display Last Two Reviews */}
            <div className="space-y-6">
              {getAllReviewFeedback?.slice(-2).map((review, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <div className="mb-2">
                    <div className="flex items-center mb-2">
                      <FaUser className="mr-2 text-gray-500" size={20} />
                      <h4 className="text-lg font-semibold text-gray-900">
                        {review.userName}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(review.rating)].map((_, idx) => (
                      <FaStar key={idx} size={20} color="#f59e0b" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, idx) => (
                      <FaStar key={idx} size={20} color="#e5e7eb" />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.feedback}</p>
                </div>
              ))}
            </div>

            {/* "See All Reviews" Button */}
            <div className="text-center mt-8">
              <Link
                to="/reviews"
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300 transition-colors duration-200"
              >
                See All Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="bg-gray-100 mx-auto py-4">

    //   <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row gap-8">
    //     {/* Review Form */}
    //     <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
    //       <h3 className="text-2xl font-bold mb-4 text-center">
    //         Leave a Review
    //       </h3>
    //       <form onSubmit={handleSubmit}>
    //         <div className="mb-4">
    //           {/* Star Rating */}
    //           <div className="flex justify-center mb-2">
    //             {[...Array(5)].map((star, index) => {
    //               const ratingValue = index + 1;
    //               return (
    //                 <label key={index}>
    //                   <input
    //                     type="radio"
    //                     name="rating"
    //                     className="hidden"
    //                     value={ratingValue}
    //                     onClick={() => handleRating(ratingValue)}
    //                   />
    //                   <FaStar
    //                     size={30}
    //                     color={
    //                       ratingValue <= (hover || rating)
    //                         ? "#f59e0b"
    //                         : "#e5e7eb"
    //                     }
    //                     className="cursor-pointer transition-colors duration-200"
    //                     onMouseEnter={() => setHover(ratingValue)}
    //                     onMouseLeave={() => setHover(undefined)}
    //                   />
    //                 </label>
    //               );
    //             })}
    //           </div>
    //         </div>

    //         {/* Feedback Textarea */}
    //         <div className="mb-4">
    //           <textarea
    //             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //             rows={4}
    //             placeholder="Write your feedback..."
    //             value={feedback}
    //             onChange={(e) => setFeedback(e.target.value)}
    //           ></textarea>
    //         </div>

    //         {/* Submit Button */}
    //         <div className="text-center">
    //           {user ? (
    //             <button
    //               type="submit"
    //               className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
    //             >
    //               Submit Review
    //             </button>
    //           ) : (
    //             <button
    //               type="button"
    //               className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
    //               onClick={() => navigate("/login")}
    //             >
    //               Login to Submit Review
    //             </button>
    //           )}
    //         </div>
    //       </form>
    //     </div>

    //     {/* Post-Submission Display */}
    //     <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
    //       <h3 className="text-3xl font-bold text-center mb-6">
    //         Customer Reviews
    //       </h3>
    //       {/* Average Rating Display */}
    //       <div className="text-center mb-6">
    //         <h4 className="text-4xl font-bold">
    //           {calculateAverageRating()}{" "}
    //           <span className="text-yellow-500">★</span>
    //         </h4>
    //         <p className="text-gray-500">
    //           {getAllReviewFeedback?.length} Reviews
    //         </p>
    //       </div>

    //       {/* Display Last Two Reviews */}
    //       <div className="space-y-6">
    //         {getAllReviewFeedback?.slice(-2).map((review, index) => (
    //           <div key={index} className="bg-white shadow-lg rounded-lg p-6">
    //             <div className="mb-2">
    //               <div className="flex items-center mb-2">
    //                 <FaUser className="mr-2 text-gray-500" size={20} />
    //                 <h4 className="text-lg font-semibold text-gray-900">
    //                   {review.userName}
    //                 </h4>
    //               </div>
    //             </div>
    //             <div className="flex items-center mb-2">
    //               {[...Array(review.rating)].map((_, idx) => (
    //                 <FaStar key={idx} size={20} color="#f59e0b" />
    //               ))}
    //               {[...Array(5 - review.rating)].map((_, idx) => (
    //                 <FaStar key={idx} size={20} color="#e5e7eb" />
    //               ))}
    //             </div>
    //             <p className="text-gray-700">{review.feedback}</p>
    //           </div>
    //         ))}
    //       </div>

    //       {/* "See All Reviews" Button */}
    //       <div className="text-center mt-8">
    //         <Link
    //           to="/reviews"
    //           className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300 transition-colors duration-200"
    //         >
    //           See All Reviews
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ReviewSection;
