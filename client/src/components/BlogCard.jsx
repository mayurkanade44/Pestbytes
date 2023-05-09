import post from "../assets/post.jpg";
import profile from "../assets/profile.svg";

const BlogCard = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
    >
      <img
        src={post}
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        alt="post image"
      />
      <div className="p-5">
        <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
          Green Shield
        </h2>
        <p className="text-dark-light mt-3 text-sm md:text-lg">
          For cockroaches
        </p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={profile}
              alt="post-profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                Mayur
              </h4>
              <div className="flex items-center gap-x-2"></div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            09 May
          </span>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
