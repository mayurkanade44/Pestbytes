type Props = {};
const Footer = (props: Props) => {
  return (
    <footer className="bg-wh-900 text-wh-50 py-10 px-10">
      <div className="justify-between mx-auto gap-16 sm:flex">
        <div className="mt-1 basis-1/2 sm:mt-0">
          <h2 className="font-bold text-2xl text-blue-400">About Pestbyte</h2>
          <p className="my-5">
            Lorem vitae ut augue auctor faucibus eget eget ut libero. Elementum
            purus et arcu massa dictum condimentum. Augue scelerisque iaculis
            orci ut habitant laoreet. Iaculis tristique.
          </p>
          <p>© {new Date().getFullYear()} All Rights Reserved By Pestbyte.</p>
        </div>

        <div className="mt-10 basis-1/4 sm:mt-0">
          <h4 className="font-bold text-2xl text-blue-400">Links</h4>
          <p className="my-2">Home</p>
          <p className="my-2">About Us</p>
          <p>Ullamcorper vivamus</p>
        </div>

        <div className="mt-10 basis-1/4 sm:mt-0">
          <h4 className="font-bold text-2xl text-blue-400">Contact Us</h4>
          <p className="my-2">Tempus metus mattis risus volutpat egestas.</p>
          <p>123456789</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
