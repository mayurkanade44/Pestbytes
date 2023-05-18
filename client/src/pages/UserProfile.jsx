import BlogCard from "../components/BlogCard";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { EditProfile } from "../components";

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.auth);
  const { data, refetch, isLoading, error } = useGetUserProfileQuery(id);
  const [open, setOpen] = useState(false);

  const goBack = () => {
    setOpen(!open);
  };

  return (
    <main className="bg-gray-100 bg-opacity-25">
      {open ? (
        <EditProfile user={data} id={id} close={goBack} refetch={refetch} />
      ) : (
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap p-4 md:pt-8 pb-2">
            <div className="md:w-3/12 md:ml-16 mt-1">
              <img
                className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-cyan-600 p-1"
                src={data?.avatar}
                alt="profile"
              />
            </div>
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="mt-4 md:mt-0 md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-2xl md:text-3xl inline-block font-light md:mr-4 mb-2 sm:mb-0">
                  {data?.name}
                </h2>
                {id === user.userId && (
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="bg-blue-500 px-4 py-1 
                        text-white font-semibold text-sm rounded text-center 
                        sm:inline-block block"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="hidden md:block">
                <h1 className="font-semibold">ByteWebster</h1>
                <span className="bioclass">Internet company</span>
                <p>
                  ByteWebster is a web development and coding blog website.
                  Where we provide professional web projects🌍
                </p>
                <span>
                  <strong>www.bytewebster.com</strong>
                </span>
              </div>
              <ul className="hidden md:flex space-x-8 mt-5">
                <li>
                  <span className="font-semibold mr-1">{data?.blogs}</span>
                  Blogs
                </li>
                <li>
                  <span className="font-semibold mr-1">10</span>
                  Favorites
                </li>
              </ul>
            </div>
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">ByteWebster</h1>
              <span className="bioclass">Internet company</span>
              <p>
                ByteWebster is a web development and coding blog website. Where
                we provide professional web projects🌍
              </p>
              <span>
                <strong>www.bytewebster.com</strong>
              </span>
            </div>
          </header>
          <div className="px-px md:px-3">
            <ul
              className="flex md:hidden justify-around space-x-2 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <span className="font-semibold text-gray-800 block">
                  {data?.blogs}
                </span>
                Blogs
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">10</span>
                Favorites
              </li>
            </ul>
            <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10 px-3">
              <BlogCard className="w-full md:w-[calc(50%-20px)]" />
              <BlogCard className="w-full md:w-[calc(50%-20px)]" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default UserProfile;
