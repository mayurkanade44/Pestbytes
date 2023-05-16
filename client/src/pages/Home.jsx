import { BlogRow, Blogs, Hero } from "../components";

const blogs = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <Blogs />

      <BlogRow title="Trending Now" blogs={blogs} />
      <BlogRow title="Cockroach" blogs={blogs} />
      <BlogRow title="Termite" blogs={blogs} />
      <BlogRow title="Mosquito" blogs={blogs} />
    </div>
  );
};
export default Home;
