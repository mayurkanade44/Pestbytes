import { useState } from "react";
import logo from "../assets/logo.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";


const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "About Us", type: "link", href: "/about" },
  { name: "Contact Us", type: "link", href: "/contact" },
];

const NavItems = ({ name, href }) => {
  return (
    <li className="relative group">
      <a href={href} className="px-4 py-2">
        {name}
      </a>
      <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
        /
      </span>
    </li>
  );
};

const Navbar = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };
  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm border-b-[1px]">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <div>
          <img src={logo} className="w-32" alt="logo" />
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-7 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItems key={item.name} name={item.name} href={item.href} />
            ))}
          </ul>
          <button className="mt-8 lg:mt-0 border-2 border-blue-500 px-4 py-1 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
            Sign In
          </button>
        </div>
      </header>
    </section>
  );
};
export default Navbar;
