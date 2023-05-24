import { AiOutlineSearch } from "react-icons/ai";
import {
  useAllCategoriesQuery,
  useBlogsByCategoryQuery,
  useSearchBlogsQuery,
} from "../redux/blogSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { setSearch } from "../redux/authSlice";

const AllBlogs = () => {
  const { search } = useSelector((store) => store.auth);
  const [tempSearch, setTempSearch] = useState("");
  const dispatch = useDispatch();

  const {
    data: blogs,
    isLoading,
    refetch,
  } = useSearchBlogsQuery({ search: search.title, category: search.category });
  const { data: categories } = useAllCategoriesQuery();

  useEffect(() => {
    setTempSearch(search.title);
  }, []);

  const searchCategory = ({ category, name }) => {
    dispatch(
      setSearch({
        title: "",
        category: category,
        name: name,
      })
    );
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setTempSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(
          setSearch({
            title: e.target.value,
            category: "",
            name: e.target.value,
          })
        );
        refetch();
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <div className="container my-5 px-6 mx-auto">
      <div className="flex justify-center">
        <div className="flex flex-col w-full md:w-2/3 gap-y-5 mt-2 relative">
          <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
          <input
            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-3"
            type="text"
            placeholder="Search for pest, pest prevention or pest services"
            value={tempSearch}
            onChange={optimizedDebounce}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap mt-5 md:w-2/3 ml-1 md:ml-5 ">
          <h1 className="font-bold w-2/12 md:w-1/12">Tags:</h1>
          <div className="w-10/12 md:w-11/12">
            {categories?.map((category) => (
              <button
                key={category._id}
                className="mr-2 mb-2 rounded-lg bg-primary bg-opacity-10 h-6 md:h-auto px-1 md:px-2 py-0.5 text-primary hover:text-dark-hard text-sm md:text-base md:font-semibold"
                onClick={() =>
                  searchCategory({
                    category: category._id,
                    name: category.category,
                  })
                }
              >
                #{category.category.toLowerCase().split(" ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="my-1 text-gray-800 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {blogs?.length ? `Latest ${search.name} blogs` : "No Blog Found"}
        </h2>

        {blogs?.map((blog) => (
          <div className="flex flex-wrap mb-6" key={blog._id}>
            <Link
              to={`/blog/${blog._id}`}
              className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto"
            >
              <div
                className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                <img
                  src="https://mdbootstrap.com/img/new/standard/city/018.jpg"
                  className="w-full"
                  alt="Louvre"
                />
                <div
                  className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                  style={{ backgroundColor: "#fbfbfb33" }}
                ></div>
              </div>
            </Link>

            <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
              <h5 className="text-lg font-bold mb-3">{blog.title}</h5>
              <div className="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
                {blog?.category.map((c) => `#${c.category.toLowerCase()} `)}
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
                <Link to={`/blog/${blog._id}`} className="text-primary">
                  ...Read More
                </Link>
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default AllBlogs;
