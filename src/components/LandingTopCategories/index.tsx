import LinkWithSearchParams from "components/LinkWithSearchParams";

import { commafyFormatter } from "helper/formatters";
import { FiChevronRight } from "react-icons/fi";
import { useTezosCollectStore } from "store";

const TopLastSales = () => {
  const { collectionStore, tezosPrice } = useTezosCollectStore();
  return (
    <div className="flex flex-col md:my-12">
      <div className="flex items-center">
        <h4 className="font-playfair mb-6">📈 Top Categories (24h)</h4>
        <LinkWithSearchParams
          to={{
            pathname: "/market/top-categories",
          }}
          className="ml-auto size-1 text-tezLightGr hover:text-tezGr duration-50 flex items-center"
        >
          See all Categories
          <FiChevronRight className="text-tezGrEd" />
        </LinkWithSearchParams>
      </div>
      <div className="flex w-full flex-col gap-2">
        {collectionStore.collections
          .sort((itemA, itemB) => itemB.volumeDay - itemA.volumeDay)
          .map((collection, index) => {
            return (
              <LinkWithSearchParams
                to={{ pathname: `/collection/${collection.slug}` }}
                key={index}
                className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer duration-100"
              >
                <div className="flex w-2/5 md:w-1/4 items-center">
                  <div className="rounded-full w-12 h-12 aspect-square bg-tezGr flex items-center justify-center tracking-tight font-oswald size-1">
                    {collection.avatar}
                  </div>
                  <span className="ml-4">{collection.label}</span>
                </div>
                <div className="hidden md:flex w-1/4">
                  <span>
                    <span className="text-grayText">Floor: </span>
                    {collection.floorPrice.toFixed(2)} ꜩ
                  </span>
                </div>
                <div className="hidden md:flex w-1/4">
                  <span className="font-normal tracking-wide">
                    <span className="text-grayText">24h Vol: </span>
                    {commafyFormatter(collection.volumeDay)} ꜩ
                  </span>
                </div>
                <div className="flex flex-1 md:w-1/4">
                  <span className="tracking-wide">
                    <span className="text-grayText">30d Vol: </span>
                    {commafyFormatter(collection.volumeMonth)} ꜩ
                  </span>
                  <span className="ml-auto mr-2 text-tezLightGr font-bold border-b-2 border-b-tezGrMd">
                    View
                  </span>
                </div>
              </LinkWithSearchParams>
            );
          })}
      </div>
    </div>
  );
};

export default TopLastSales;
