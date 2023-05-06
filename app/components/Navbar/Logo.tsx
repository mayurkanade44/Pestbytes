import Image from "next/image";
import Link from "next/link";
import Logo1 from "../../../public/images/pestbyte.png";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="hidden md:block cursor-pointer"
        src={Logo1}
        height="50"
        width="50"
        alt="Logo"
      />
    </Link>
  );
};
export default Logo;
