import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = () => {};

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              placeholder="Enter email"
              className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-2 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 5,
                  message: "Password length must be at least 5 characters",
                },
              })}
              placeholder="Enter password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
                errors.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-primary"
          >
            Forgot password?
          </Link>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-primary text-white font-bold text-lg py-2 px-4 w-full rounded-lg my-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Log In
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register Now
            </Link>
          </p>
        </form>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-2/3 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
            OR
          </span>
        </div>
        <button
          type="button"
          className=" text-black font-bold py-2 px-5 w-full rounded-lg mb-4 border-black border-[1px]"
        >
          <FcGoogle className="absolute" size={24} /> Login With Google
        </button>
      </div>
    </section>
  );
};
export default Login;
