import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUSer } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { Helmet } from "react-helmet-async";

interface LoginValues {
  userId: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email as string,
        password: data.password as string,
      };
      const res = await login(userInfo).unwrap();
      console.log("Response:", res);
      console.log("Token:", res.token);
      // navigate(`/`);
      const user = verifyToken(res.token) as TUSer;
      console.log("user:", user);
      dispatch(setUser({ user: user, token: res.token }));
      // const user = verifyToken(res.data.accessToken) as TUSer;
      // dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });

      if (res) {
        Swal.fire({
          title: "Login Successfully",
          // text: "You are being redirected to the homepage.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          navigate(`/`);
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err?.data?.message || "Something went wrong!",
      });
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
    console.log(data);
    // setIsSubmitting(true);

    // try {
    //   // Replace this URL with your actual API endpoint
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     const responseData = await response.json();
    //     // Save the token or handle authentication here
    //     localStorage.setItem("authToken", responseData.token);
    //     Swal.fire({
    //       title: "Success",
    //       text: "Login successful!",
    //       icon: "success",
    //     });
    //     // Redirect or navigate to another page here
    //   } else {
    //     const errorData = await response.json();
    //     Swal.fire({
    //       title: "Error",
    //       text: errorData.message || "Invalid email or password.",
    //       icon: "error",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "An unexpected error occurred. Please try again.",
    //     icon: "error",
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <>
      <Helmet>
        <title>Login | Wheels</title>
      </Helmet>
      <div className="bg-[#0f3e2a] max-w-full mx-auto px-6 py-16">
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <button
              type="submit"
              className={`btn btn-primary w-full `}
              //   disabled={isSubmitting}
            >
              {/* {isSubmitting ? "Logging in..." : "Login"} */}Login
            </button>
          </form>

          <div>
            {" "}
            <p className="text-red-500 mb-4">
              If you're not registered. Please{" "}
              <Link to="/signUp" className="text-blue-500 underline">
                Sign Up!
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
