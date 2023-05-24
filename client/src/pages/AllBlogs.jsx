import { AiOutlineSearch } from "react-icons/ai";
import {
  useAllCategoriesQuery,
  useBlogsByCategoryQuery,
} from "../redux/blogSlice";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const {
    data: blogs,
    isLoading,
    refetch,
  } = useBlogsByCategoryQuery("646b40162ce0bb21a57968fa");
  const { data: categories } = useAllCategoriesQuery();

  return (
    <div className="container my-5 px-6 mx-auto">
      <div className="flex justify-center">
        <div className="flex flex-col w-full md:w-2/3 gap-y-2.5 mt-4 xl:mt-2 relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-3"
            type="text"
            placeholder="Search for pest, pest prevention or pest services"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap my-3 md:w-2/3 ml-1 md:ml-5 ">
          <h1 className="font-bold w-2/12 md:w-1/12">Tags:</h1>
          <div className="w-10/12 md:w-11/12">
            {categories?.map((category) => (
              <button
                key={category._id}
                className="mr-2 mb-2 rounded-lg bg-primary bg-opacity-10 h-6 md:h-auto px-1 md:px-2 py-0.5 text-primary hover:text-dark-hard text-sm md:text-base md:font-semibold"
              >
                #{category.category.toLowerCase().split(" ")}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="my-1 text-gray-800 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Latest articles
        </h2>

        {blogs?.map((blog) => (
          <div className="flex flex-wrap mb-6" key={blog._id}>
            <Link
              to={`/blog/${blog._id}`}
              className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto"
            >
              <div
                className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/standard/city/018.jpg"
                  className="w-full"
                  alt="Louvre"
                />
                <a href="#!">
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                    style={{ backgroundColor: "#fbfbfb33" }}
                  ></div>
                </a>
              </div>
            </Link>

            <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
              <h5 className="text-lg font-bold mb-3">{blog.title}</h5>
              <div className="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
                {blog.category.map((c) => `#${c.category.toLowerCase()} `)}
              </div>
              <p className="text-gray-500 mb-2">
                <small>
                  Published on{" "}
                  {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  by
                  <span className="text-gray-900 ml-1">{blog.user.name}</span>
                </small>
              </p>
              <p className="text-gray-500">
                Ut pretium ultricies dignissim. Sed sit amet mi eget urna
                placerat vulputate. Ut vulputate est non quam dignissim
                elementum. Donec a ullamcorper diam
                <Link to={`/blog/${blog._id}`} className="text-primary">...Read More</Link>
              </p>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap mb-6">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
            <div
              className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <img
                src="https://mdbootstrap.com/img/new/standard/city/032.jpg"
                className="w-full"
                alt="Louvre"
              />
              <a href="#!">
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                  style={{ backgroundColor: "#fbfbfb33" }}
                ></div>
              </a>
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
            <h5 className="text-lg font-bold mb-3">Exhibition in Paris</h5>
            <div className="mb-3 text-blue-600 font-medium text-sm flex items-center justify-center md:justify-start">
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
                />
              </svg>
              Art
            </div>
            <p className="text-gray-500 mb-6">
              <small>
                Published <u>12.01.2022</u> by
                <a href="" className="text-gray-900">
                  Halley Frank
                </a>
              </small>
            </p>
            <p className="text-gray-500">
              Suspendisse in volutpat massa. Nulla facilisi. Sed aliquet diam
              orci, nec ornare metus semper sed. Integer volutpat ornare erat
              sit amet rutrum.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap mb-6">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
            <div
              className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              <img
                src="https://mdbootstrap.com/img/new/standard/city/059.jpg"
                className="w-full"
                alt="Louvre"
              />
              <a href="#!">
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                  style={{ backgroundColor: "#fbfbfb33" }}
                ></div>
              </a>
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
            <h5 className="text-lg font-bold mb-3">Stock market boom</h5>
            <div className="mb-3 text-yellow-500 font-medium text-sm flex items-center justify-center md:justify-start">
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"
                />
              </svg>
              Business
            </div>
            <p className="text-gray-500 mb-6">
              <small>
                Published <u>10.01.2022</u> by
                <a href="" className="text-gray-900">
                  Joe Svan
                </a>
              </small>
            </p>
            <p className="text-gray-500">
              Curabitur tristique, mi a mollis sagittis, metus felis mattis
              arcu, non vehicula nisl dui quis diam. Mauris ut risus eget massa
              volutpat feugiat. Donec.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AllBlogs;
