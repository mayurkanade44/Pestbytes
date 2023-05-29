import post from "../assets/post.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setNewBlog } from "../redux/authSlice";

const BlogCard = ({ blog, className, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = () => {
    dispatch(
      setNewBlog({
        status: false,
        blogId: blog._id,
      })
    );
    navigate("/add-blog")
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <div className="relative">
        <Link to={`/blog/${blog._id}`}>
          <img
            src={blog.coverPicture}
            alt="Image"
            className="w-full h-60 rounded-lg"
          />
        </Link>
        {profile && (
          <div className="absolute top-0 right-1 p-3 flex">
            <FaRegEdit
              onClick={handleEdit}
              className="text-cyan-600 w-8 h-8 p-1  hover:border-2 mr-3"
            />
            <AiOutlineDelete className="text-red-500 w-8 h-8 p-1  hover:border-2" />
          </div>
        )}
      </div>
      <Link to={`/blog/${blog._id}`}>
        <div className="py-2 px-4">
          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
            {blog.title}
          </h2>
          <div className="flex justify-between flex-nowrap items-center mt-2">
            <div className="flex items-center gap-x-2 md:gap-x-2.5">
              <img
                src={blog.user.avatar}
                alt="post-profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                  {blog.user.name}
                </h4>
                <div className="flex items-center gap-x-2"></div>
              </div>
            </div>
            <span className="font-bold text-dark-light italic text-sm md:text-base">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default BlogCard;
