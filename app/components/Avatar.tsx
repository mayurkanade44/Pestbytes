"use client";

import ava from "../../public/images/placeholder.jpg";
import Image from "next/image";

type Props = {
  src: string | null | undefined;
};
const Avatar = ({ src }: Props) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={ava}
    />
  );
};
export default Avatar;
