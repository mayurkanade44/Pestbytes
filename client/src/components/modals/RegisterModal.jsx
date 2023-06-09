import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "../../redux/userSlice";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/authSlice";

const RegisterModal = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { isOpen } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password"); // to compare password

  const submitHandler = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      toast.success(res.msg);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const body = (
    <section className="container mx-auto px-5 py-2">
      <div className="w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-x-3">
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="name"
              className="text-[#5a7184] font-semibold block pl-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be at least 1 character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter Full Name"
              className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block pl-1"
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
              placeholder="Enter Email Id"
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
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block pl-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
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
              placeholder="Enter Password"
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
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="confirmPassword"
              className="text-[#5a7184] font-semibold block pl-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please reconfirm your password",
                },
                validate: (value) => {
                  if (value !== password) return "Password does not match";
                },
              })}
              placeholder="Confirm Password"
              className={`placeholder:text-[#959ead] text-dark-hard mt-1 rounded-lg px-3 py-2 font-semibold block outline-none border ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>
        <p className="text-sm font-semibold pl-1 text-[#5a7184]">
          Already have an account?{" "}
          <button
            type="button"
            className="text-primary"
            onClick={() =>
              dispatch(toggleModal({ register: false, login: true }))
            }
          >
            Log In
          </button>
        </p>

        {/* <div className="inline-flex items-center justify-center w-full">
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
        </button> */}
      </div>
    </section>
  );

  return (
    <div>
      <Modal
        disabled={isLoading || !isValid}
        title="Register"
        actionLabel="Register"
        onSubmit={handleSubmit(submitHandler)}
        body={body}
        isOpen={isOpen.register}
        onClose={() => dispatch(toggleModal({ register: false, login: false }))}
        width="relative w-full mt-20 md:mt-2 md:w-4/6 lg:w-3/6 my-6 mx-auto h-full lg:h-auto md:h-auto"
        itemCenter="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
      />
    </div>
  );
};
export default RegisterModal;
