import React from "react";
import { Link } from "react-router-dom";
interface ErrorPageProps {
  errorCode?: string;
  errorMessage?: string;
}

const ErrorPage = ({
  errorCode = "Error",
  errorMessage = "Oops! Something went wrong",
}) => {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-40 h-40 text-gray-600"
        >
          <path
            fill="currentColor"
            d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
          ></path>
          <circle cx="256" cy="256" r="192" fill="#FF4C4C"></circle>
          <path
            fill="currentColor"
            d="M256,416c-70.4,0-128-57.6-128-128s57.6-128,128-128,128,57.6,128,128S326.4,416,256,416Zm0-224c-52.8,0-96,43.2-96,96s43.2,96,96,96,96-43.2,96-96S308.8,192,256,192Z"
          ></path>
        </svg>
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only">Error</span> {errorCode || "Error"}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            {errorMessage || "Oops! Something went wrong."}
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded bg-cyan-200 text-gray-900"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
