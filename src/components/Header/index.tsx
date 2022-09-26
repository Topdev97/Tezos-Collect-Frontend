import LinkWithSearchParams from "components/LinkWithSearchParams";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { RiWallet3Line } from "react-icons/ri";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b-2 border-b-white/10 w-full top-0 lg:px-24 px-4 z-10 transition-all duration-300">
      <div className="backdrop-blur-md absolute left-0 top-0 w-full h-full z-[-1]" />
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
      >
        <div className="home-logo my-2" />
      </LinkWithSearchParams>
      <div className="hidden md:flex ml-24 mr-auto">
        {pageLinks.map((item, index) => (
          <LinkWithSearchParams
            key={index}
            to={{
              pathname: item.link,
            }}
            className="hidden xl:flex text-[15px] font-medium -tracking-tight items-start rounded-lg px-3 py-6 hover:text-tezGrSt duration-150"
          >
            {item.text}
          </LinkWithSearchParams>
        ))}
      </div>
      <div className="flex md:px-24 items-center gap-4 md:gap-8">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 md:left-5" size={20} />
          <input
            className="border-0 p-1.5 md:p-2 z-[1] focus:border-2 pl-10 md:pl-12 text-[14px] w-0 focus:w-40 md:focus:w-48 duration-150"
            placeholder="Search"
          />
        </div>
        <AiFillStar
          className="cursor-pointer text-tezGrSt hover:text-tezGrMd"
          size={20}
        />
        <IoMdCart
          className="cursor-pointer text-tezGrSt hover:text-tezGrMd"
          size={20}
        />
      </div>
      <button className="tezGr-button px-2 md:px-8 ml-4 md:ml-0 duration-100">
        <span className="hidden md:block">Connect Wallet</span>
        <RiWallet3Line className="md:hidden" size={20} />
      </button>
    </div>
  );
};

export default Header;

const pageLinks = [
  {
    text: "Market",
    link: "market",
  },
  {
    text: "Categories",
    link: "market",
  },
  {
    text: "Auctions",
    link: "auction",
  },
  {
    text: "FAQ",
    link: "/domain/dota-2",
  },
];
