import { BreadCrumbs, Comments, SuggestedBlogs } from "../components";
import post from "../assets/post.jpg";
import logo from "../assets/logo.png";
import profile from "../assets/profile.svg";
import { Link } from "react-router-dom";

const SingleBlog = () => {
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
    { name: "Blog", link: "/blog" },
  ];

  return (
    <div>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={brd} />
          <h1 className="text-xl font-medium font-roboto my-5 text-dark-hard md:text-[26px]">
            Green Shield
          </h1>
          <div className="py-1 px-4 bg-slate-100 mb-5 ">
            <div className="flex justify-between flex-nowrap items-center">
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
                5 Likes
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
          <Comments />
        </article>
        <SuggestedBlogs
          header="Latest Article"
          posts={postsData}
          tags={tagsData}
          className="mt-8 lg:mt-0 lg:max-w-xs"
        />
      </section>
    </div>
  );
};
export default SingleBlog;
