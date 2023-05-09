import { BreadCrumbs, Comments, SuggestedBlogs } from "../components";
import post from "../assets/post.jpg";
import logo from "../assets/logo.png";
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
          <img src={post} alt="post" className="rounded-xl w-full" />
          <div className="mt-4 flex gap-2">
            <Link
              to={`/blog?category`}
              className="text-primary text-sm font-roboto inline-block md:text-base"
            >
              Cockroach
            </Link>
          </div>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Green Shield
          </h1>
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
