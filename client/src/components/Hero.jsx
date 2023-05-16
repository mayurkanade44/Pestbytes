import { AiOutlineSearch } from "react-icons/ai";

import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-8 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          India's First Community Of Pest Bloggers
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Read the most interesting case studies, product reviews and
          publications from academia and professional pest managers.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-6 xl:mt-10 relative">
          <div className="relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              placeholder="Search for pest, pest prevention or pest services"
            />
          </div>
        </div>
        <div className="flex mt-4 flex-row lg:items-start flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-dark-light font-semibold italic mt-3 mr-1.5 lg:mt-4 lg:text-sm xl:text-base">
            Popular Pests:
          </span>
          <ul className="flex flex-wrap gap-x-2 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 h-6 md:h-auto px-2 md:px-3 py-0.5 md:py-1.5 text-primary text-sm md:text-base md:font-semibold">
              Rodent
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 h-6 md:h-auto px-2 md:px-3 py-0.5 md:py-1.5 text-primary text-sm md:text-base md:font-semibold">
              Mosquito
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 h-6 md:h-auto px-2 md:px-3 py-0.5 md:py-1.5 text-primary text-sm md:text-base md:font-semibold">
              Cockroach
            </li>
            <li className="hidden lg:block rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Termite
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img
          style={{ paddingLeft: 50, width: 600, height: 380 }}
          src={hero}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};
export default Hero;
