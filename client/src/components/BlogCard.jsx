import post from "../assets/post.jpg";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <Link to={`/blog/${blog._id}`}>
        <img
          src={post}
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
          alt="post image"
        />
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
