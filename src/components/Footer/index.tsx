import LinkWithSearchParams from "components/LinkWithSearchParams";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { IoMdCart } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col bg-componentBg w-full lg:px-24 px-4 z-10">
      <div className="flex items-center justify-between transition-all duration-150 py-4 border-b-2 border-b-white/30">
        <LinkWithSearchParams
          to={{
            pathname: "/",
          }}
        >
          <div className="home-logo my-2" />
        </LinkWithSearchParams>
        <div className="flex items-center gap-8">
          {/* <AiFillStar
            className="cursor-pointer text-tezGrSt hover:text-tezGrMd"
            size={20}
          />
          <IoMdCart
            className="cursor-pointer text-tezGrSt hover:text-tezGrMd"
            size={20}
          /> */}
        </div>
      </div>
      <div className="flex items-center justify-between transition-all duration-150">
        <span>© 2022 Tezos Collect. All rights reserved.</span>
        <div className="ml-auto flex">
          {pageLinks.map((item, index) =>
            item.external ? (
              <a
                key={index}
                href={item.link}
                className="hidden xl:flex text-[15px] font-medium -tracking-tight items-start rounded-lg px-3 py-6 hover:text-tezGrSt duration-150"
                target="_blank"
              >
                {item.text}
              </a>
            ) : (
              <NavLink
                key={index}
                to={{
                  pathname: item.link,
                }}
                className="hidden xl:flex text-[15px] font-medium -tracking-tight items-start rounded-lg px-3 py-6 hover:text-tezGrSt duration-150"
                target={item.external ? "_blank" : undefined}
              >
                {item.text}
              </NavLink>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;

const pageLinks = [
  {
    text: "Market",
    link: "/market",
  },
  {
    text: "Categories",
    link: "/market/top-categories",
  },
  {
    text: "Auctions",
    link: "/auction",
  },
  {
    text: "FAQ",
    link: "https://tezoscollect.gitbook.io",
    external: true,
  },
];
