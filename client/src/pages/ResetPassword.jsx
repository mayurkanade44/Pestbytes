import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues: { password: "" } }, { mode: "onChange" });

  const submitHandler = () => {};

  return (
    <section className="container mx-auto px-5 py-10 md:py-16">
      <div className="w-full mx-auto max-w-sm">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-6">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block pl-1"
            >
              New Password
            </label>
            <input
              type="password"
              {...register("password", {
                minLength: {
                  value: 5,
                  message: "Password length must be at least 5 characters",
                },
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              placeholder="New Password"
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
          <button
            type="submit"
            className="bg-primary text-white mb-2 text-lg py-1 px-5 w-full rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};
export default ForgotPassword;
