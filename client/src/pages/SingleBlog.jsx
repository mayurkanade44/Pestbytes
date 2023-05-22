import {
  BreadCrumbs,
  Comments,
  SocialShare,
  SuggestedBlogs,
} from "../components";
import post from "../assets/post.jpg";
import logo from "../assets/logo.png";
import { Link, useParams } from "react-router-dom";
import { useGetSingleBlogQuery, useLikeBlogMutation } from "../redux/blogSlice";
import { useSelector } from "react-redux";
import { MdCalendarMonth } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { SingleBlogSkeleton } from "../components/skeletons";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, refetch, isLoading, error } = useGetSingleBlogQuery(id);
  const [likeBlog, { isLoading: likeLoading }] = useLikeBlogMutation();
  const { user } = useSelector((store) => store.auth);

  const postsData = [
    {
      _id: "1",
      image: post,
      title: "Help children get better education",
      createdAt: "2023-01-28T15:35:53.607+0000",
    },
    {
      _id: "2",
      image: logo,
      title: "Help children get better education",
      createdAt: "2023-02-28T15:35:53.607+0000",
    },
    {
      _id: "3",
      image: post,
      title: "Help children get better education",
      createdAt: "2023-03-28T15:35:53.607+0000",
    },
  ];

  const tagsData = ["Cockroach", "Termite", "Mosquitoes", "Ants", "Rodent"];

  const brd = [
    { name: "Home", link: "/" },
    { name: "Blog", link: `/blog/${id}` },
    { name: `${blog?.title}`, link: `/blog/${id}` },
  ];

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like the blog");

    try {
      const res = await likeBlog(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <SingleBlogSkeleton />;

  return (
    <div>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={brd} />
          <h1 className="text-xl font-medium font-roboto my-5 text-dark-hard md:text-[26px]">
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
              <span className="font-bold text-dark-light italic text-sm md:text-base">
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
          </div>
          <img src={post} alt="post" className="rounded-xl w-full" />
          <div className="mt-4 flex gap-2">
            <Link
              to={`/blog?category`}
              className="text-primary text-sm font-roboto inline-block md:text-base"
            >
              Cockroach
            </Link>
          </div>
          <div className="mt-4 prose prose-sm sm:prose-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            repellat tenetur a tempora asperiores soluta quaerat vero nemo unde
            non possimus praesentium, neque voluptate similique expedita nobis
            est vel aut?
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
            posts={postsData}
            tags={tagsData}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <div className="mt-7">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
              Share on:
            </h2>
            <SocialShare
              url={encodeURI(`http://localhost:3000/blog/${blog?._id}`)}
              title={encodeURIComponent(`Pestbytes - ${blog?.title}`)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default SingleBlog;
