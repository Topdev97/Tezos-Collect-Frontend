import LinkWithSearchParams from "components/LinkWithSearchParams";

const Header = () => {
  return (
    <div className="fixed flex items-center justify-between border-b-2 border-b-white/10 w-full top-0 lg:px-24 px-4 z-10 transition-all duration-300">
      <div className="backdrop-blur-md absolute left-0 top-0 w-full h-full z-[-1]" />
      <LinkWithSearchParams
        to={{
          pathname: "/",
        }}
      >
        <div className="home-logo my-2" />
      </LinkWithSearchParams>
      <LinkWithSearchParams
        key={"index"}
        to={{
          pathname: "item.link",
          search: "item.search",
        }}
        className="hidden xl:flex text-[15px] font-normal -tracking-tight items-start rounded-lg px-3 py-6 hover:text-kadGrSt duration-150"
      >
        Link1
      </LinkWithSearchParams>
      <div className="flex md:px-24 items-center gap-2">
        <div className="relative flex items-center">
          <input
            className="pl-10 md:pl-12 text-[14px] w-12 focus:w-48 duration-150"
            placeholder="Search"
          />
        </div>
      </div>
      <button className="tezGr-button">Connect Wallet</button>
    </div>
  );
};

export default Header;
