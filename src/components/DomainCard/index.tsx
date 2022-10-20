import { TbHeart } from "react-icons/tb";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { TYPE_DOMAIN } from "helper/interfaces";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { useTezosCollectStore } from "store";

const DomainCard = (domain: TYPE_DOMAIN) => {
  let { name } = domain;

  const { bookmarkedNames, toggleBookmark } = useTezosCollectStore();

  return (
    <div className="flex flex-col rounded-lg bg-componentBg p-5">
      <div className="bg-tezDarkBg rounded-lg p-4 flex flex-col items-center">
        <TbHeart
          onClick={() => toggleBookmark(name)}
          className={`size-2 ml-auto cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
            bookmarkedNames.includes(name) ? "stroke-tezGrSt fill-tezGrSt" : ""
          }`}
        />
        <img src={tezosCollectLogo} className="w-2/5" />
        <LinkWithSearchParams
          to={{ pathname: `/domain/${name}` }}
          className="size-2 my-6"
        >
          {name}.tez
        </LinkWithSearchParams>
      </div>
    </div>
  );
};
export default DomainCard;
