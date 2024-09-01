import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";

interface FormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const SignUpPage: React.FC = () => {
  const [signUp, { isLoading, isError, isSuccess }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  const role = "user";
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    // setIsSubmitting(true);

    const userInfo = { role, ...data };

    console.log(userInfo);

    try {
      await signUp(userInfo).unwrap();

      Swal.fire({
        title: "Success",
        text: "Account created successfully! Redirecting to login...",
        icon: "success",
      }).then(() => {
        navigate("/login"); // Redirect to login page after success
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text:
          error?.data?.message ||
          "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <>
      {" "}
      <Helmet>
        <title>SignUp | Wheels</title>
      </Helmet>
      <div className="bg-[#0f3e2a] max-w-full mx-auto px-6 py-16">
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                className={`input input-bordered w-full ${
                  errors.phone ? "input-error" : ""
                }`}
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.address ? "input-error" : ""
                }`}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full`}
              // disabled={isSubmitting}
            >
              {/* {isSubmitting ? "Submitting..." : "Sign Up"} */} Sign Up
            </button>
          </form>

          <div>
            {" "}
            <p className="text-red-500 mb-4">
              If you're already registered. Please{" "}
              <a href="/login" className="text-blue-500 underline">
                Login!
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
