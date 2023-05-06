"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
type Props = {};
const UserMenu = (props: Props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block">
          <Avatar src={"as"} />
        </div>
        <div className="hidden md:block text-sm font-semibold py-3 px-2 rounded-full">
          <h2>Mayur</h2>
        </div>
        <div
          onClick={toggleOpen}
          className="md:py-1 md: flex  flex-row items-center rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
        </div>
      </div>
      {open && (
        <div className="absolute rounded-xl shadow-md w-[10vw]  bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem link="/" label="Login" />
            <MenuItem link="/" label="Sign Up" />
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
