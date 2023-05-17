import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../redux/userSlice";

const EditProfile = ({ user, close, refetch }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      about: "",
    },
    mode: "onChange",
  });

  const handleFileChange = () => {};

  const handleProfile = () => {};

  const submitHandler = async (data) => {
    try {
      const res = await updateProfile({ data, id: 123 }).unwrap();
      toast.success(res.msg);
      refetch();
      setTimeout(() => {
        close();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-4">
          Update Profile
        </h1>
        <form onSubmit={handleProfile}>
          <div className="flex flex-row md:w-3/12 md:ml-20">
            <img
              className="w-10 h-10 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-cyan-600 p-1"
              src={user?.avatar}
              alt="profile"
            />
            <div className="flex justify-center items-center ml-10">
              <button className=" bg-black text-white mb-2 text-lg py-1 px-2 w-52 rounded-lg">
                <HiOutlineCamera className="w-7 h-auto text-primary inline-flex mr-2" />
                Upload Picture
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={handleSubmit(submitHandler)}>
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
          </div>
          <button
            type="submit"
            disabled={!isValid || !isLoading}
            className="bg-primary text-white font-bold mb-2 text-lg py-2 px-5 w-full rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};
export default EditProfile;
