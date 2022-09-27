import LinkWithSearchParams from "components/LinkWithSearchParams";
import { TEZOS_PRICE, topCategories } from "helper/constants";
import { commafyFormatter } from "helper/formatters";
import { FiChevronRight } from "react-icons/fi";

const TopLastSales = () => {
  return (
    <div className="flex flex-col my-12">
      <div className="flex items-center">
        <h4 className="font-playfair mb-6">Top Categories (24h)</h4>
        <LinkWithSearchParams
          to={{
            pathname: "/categories",
          }}
          className="ml-auto size-1 text-tezLightGr hover:text-tezGr duration-50 flex items-center"
        >
          See all Categories
          <FiChevronRight className="text-tezGrEd" />
        </LinkWithSearchParams>
      </div>
      <div className="flex w-full flex-col gap-2">
        {topCategories.map((category, index) => {
          return (
            <div
              key={index}
              className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer duration-100"
            >
              <div className="flex w-1/4 items-center">
                <div className="rounded-full w-12 h-12 bg-tezGr flex items-center justify-center tracking-tight font-oswald size-1">
                  {category.avatar}
                </div>
                <span className="ml-4">{category.name}</span>
              </div>
              <div className="flex w-1/4">
                <span>
                  <span className="text-grayText">Floor: </span>
                  {category.floorPrice}
                </span>
              </div>
              <div className="flex w-1/4">
                <span className="font-normal tracking-wide">
                  {commafyFormatter(category.volumn)} ꜩ
                </span>
              </div>
              <div className="flex w-1/4">
                <span className="tracking-wide">
                  ${commafyFormatter(TEZOS_PRICE * category.volumn)}
                </span>
                <span className="ml-auto mr-2 text-tezLightGr font-bold border-b-2 border-b-tezGrMd">
                  View
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopLastSales;
