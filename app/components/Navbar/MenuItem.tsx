import Link from "next/link";

type Props = {
  link: string;
  label: string;
};
const MenuItem = ({ link, label }: Props) => {
  return (
    <Link
      href={link}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </Link>
  );
};
export default MenuItem;
