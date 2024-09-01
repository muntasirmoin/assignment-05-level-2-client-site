import React from "react";

const OverlayReviews = ({ onLoginClick }) => (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Please Log In</h2>
      <p className="text-gray-600 mb-4">
        You need to be logged in to submit a review.
      </p>
      <button
        onClick={onLoginClick}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
      >
        Log In
      </button>
    </div>
  </div>
);

export default OverlayReviews;
