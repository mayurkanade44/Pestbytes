import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/pestbyte.png";

type Props = {};
const NavBar = (props: Props) => {
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="hidden sm:block">
          <div className="flex justify-between items-center gap-7">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Image alt="logo" src={Logo} width={50}/>
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center gap-10">
          <Link href="/">Home</Link>
          <Link href="/">About</Link>
        </div>
        <div>
          <p>Sign In</p>
        </div>
      </nav>
      <div className="flex justify-between gap-8 mt-5 mb-4 mx-10">
        <div className="basis-2/4 md:mt-3">
          <h1 className="font-bold text-2xl md:text-5xl ">Blogs Of Pest</h1>
          <p className="text-sm mt-3">
            Website dedicated towards blogs related to the pest.
          </p>
        </div>
        <div className="basis-full relative w-auto h-32 bg-wh-500">
          Image of ad
        </div>
      </div>
      <hr className="border-1 mx-10" />
    </header>
  );
};
export default NavBar;
