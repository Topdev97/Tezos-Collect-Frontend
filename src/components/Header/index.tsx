import { useState } from "react";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { IoMdCart, IoMdHeart } from "react-icons/io";
import { RiWallet3Line } from "react-icons/ri";
import HoverMenu from "components/UI/HoverMenu";
import { FaUserCircle } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import offerPercentage from "assets/images/offer-percentage.svg";

const Header = () => {
  const navigate = useNavigate();
  const [beaconConnected, setBeaconConnected] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-between border-b-2 border-b-white/10 w-full top-0 lg:px-24 px-4 z-10 transition-all duration-300">
      <div className="backdrop-blur-12px absolute left-0 top-0 w-full h-full z-[-1]" />
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
      {beaconConnected === false ? (
        <button
          className="tezGr-button px-2 md:px-6 ml-4 md:ml-0 duration-100"
          onClick={() => setBeaconConnected(true)}
        >
          <span className="hidden md:block">Connect Wallet</span>
          <RiWallet3Line className="md:hidden" size={20} />
        </button>
      ) : (
        <HoverMenu
          options={[
            {
              icon: <FaUserCircle size={20} />,
              text: "My Profile",
              handler: () => {
                navigate("/profile");
              },
            },
            {
              icon: <img src={offerPercentage} />,
              text: "Offers",
              handler: () => {
                navigate("/profile");
              },
            },
            {
              icon: <IoMdHeart size={20} />,
              text: "Watchlist",
              handler: () => {
                navigate("/profile");
              },
            },
            {
              text: <span className="text-tezWarning">Disconnect Wallet</span>,
              class:
                "p-4 pr-8 flex gap-2 border-t-2 border-t-inputBorder items-center bg-componentBg hover:bg-white/10 duration-50",
              handler: () => setBeaconConnected(false),
            },
          ]}
          icon={<BiUser size={20} className="mx-2" />}
          text={<span className="mr-4">tz1gu...RKpE</span>}
        />
      )}
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
