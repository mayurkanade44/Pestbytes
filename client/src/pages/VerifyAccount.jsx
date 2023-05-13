import { Link, useSearchParams } from "react-router-dom";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("email"));

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="w-full mx-auto">
        <h1 className="font-roboto text-4xl font-bold text-center text-dark-hard mb-4">
          <span className="text-lime-600"> Congratulations!! </span>
        </h1>
        <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-4">
          Your Account Successfully Verified.
        </h1>
        <div className="flex justify-center">
          <Link
            to="/login"
            className="bg-primary w-20  text-white font-bold mb-2 text-lg py-1 px-4 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
export default VerifyAccount;
