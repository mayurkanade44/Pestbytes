import {
  BreadCrumbs,
  Comments,
  SocialShare,
  SuggestedBlogs,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAllBlogsQuery,
  useGetSingleBlogQuery,
  useLikeBlogMutation,
} from "../redux/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdCalendarMonth } from "react-icons/md";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineEye,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { SingleBlogSkeleton } from "../components/skeletons";
import { useEffect, useState } from "react";
import { setSearch, toggleModal } from "../redux/authSlice";
import ad from "../assets/verticalAd.jpg";
import AdModal from "../components/modals/AdModal";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, refetch, isLoading, error } = useGetSingleBlogQuery(id);
  const { data: latest } = useAllBlogsQuery();
  const [likeBlog] = useLikeBlogMutation();
  const [share, setShare] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const brd = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: `/all-blogs` },
    { name: `${blog?.title}`, link: `/blog/${id}` },
  ];

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like the blog");
      dispatch(toggleModal({ register: false, login: true }));
      return;
    }

    try {
      await likeBlog(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const searchCategory = ({ category, name }) => {
    dispatch(
      setSearch({
        title: "",
        category: category,
        name: name,
      })
    );
    navigate(`/all-blogs`);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (isLoading) return <SingleBlogSkeleton />;

  return (
    <div>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={brd} />
          <h1 className="text-xl font-medium font-roboto my-3 text-dark-hard md:text-[26px]">
            {blog?.title}
          </h1>
          <div className="py-1 px-4 bg-slate-100 mb-5 ">
            <div className="flex justify-between flex-nowrap items-center">
              <div className="flex items-center gap-x-2 md:gap-x-2.5">
                <img
                  src={blog?.user.avatar}
                  alt="post-profile"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                    <span className="font-normal">by</span> {blog?.user.name}
                  </h4>
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs text-dark-light">
                      <MdCalendarMonth className="inline mr-1 mb-[2px]" />
                      {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <span className="font-bold flex text-dark-light italic text-sm md:text-base">
                <h6 className="text-[13px] text-center mr-4">
                  {blog?.viewCount} <AiOutlineEye className="h-4 w-4" />
                </h6>
                <AiOutlineShareAlt
                  className="w-7 h-7 mt-2 mr-4 text-black hover:cursor-pointer"
                  onClick={() => setShare(!share)}
                />
                <button type="button" onClick={handleLike}>
                  {user && blog?.likes.find((like) => like === user.userId) ? (
                    <AiFillHeart className="text-[#ee4040] w-6 h-6 mr-2 mb-1 inline" />
                  ) : (
                    <AiOutlineHeart className="w-6 h-6 mr-2 text-[#ee4040] mb-1 inline" />
                  )}
                  <span className="text-xl">{blog?.likes.length}</span>
                </button>
              </span>
            </div>
            {share && (
              <SocialShare
                url={encodeURI(`https://pestbytes.com/blog/${blog?._id}`)}
                title={encodeURIComponent(`Pestbytes - ${blog?.title}`)}
              />
            )}
          </div>

          <img
            src={blog?.coverPicture}
            alt="post"
            className="w-full object-contain h-40 md:h-52 lg:h-72 rounded-lg"
          />
          <div className="my-4 flex gap-2">
            {blog?.category.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  searchCategory({ category: item.value, name: item.label })
                }
                className="text-primary text-sm font-roboto inline-block md:text-base"
              >
                #{item.label.replaceAll(" ", "")}
              </button>
            ))}
          </div>
          <div className=" prose prose-sm sm:prose-base">
            <div
              className="quill"
              dangerouslySetInnerHTML={{ __html: blog?.body }}
            ></div>
          </div>
          <Comments
            comments={blog?.comments}
            blogUser={blog?.user._id}
            userId={user?.userId}
            blogId={id}
            refetch={refetch}
          />
        </article>
        <div>
          <SuggestedBlogs
            header="Latest Article"
            posts={latest?.blogs}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <button onClick={() => setOpen(!open)}>
            <img
              src={ad}
              className="w-full lg:w-80 h-60 my-5 border-2 border-gray-500"
            />
            <img
              src={ad}
              className="hidden lg:block w-full lg:w-80 h-96 my-8 border-2 border-gray-500"
            />
          </button>
          <AdModal onClose={onClose} open={open} />
        </div>
      </section>
    </div>
  );
};
export default SingleBlog;
