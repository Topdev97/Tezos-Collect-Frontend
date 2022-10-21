import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import CSVSvg from "assets/images/market/csv.svg";
import { FiSearch } from "react-icons/fi";
import { TbHeart } from "react-icons/tb";
import { useTezosCollectStore } from "store";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import PercentageChangeTag from "components/UI/PercentageChangeTag";

const MarketTopCategories = () => {
  const { collectionStore } = useTezosCollectStore();
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <button className="p-2 bg-white rounded-lg text-tezDarkBg">
          <HiOutlineRefresh
            size={24}
            className="hover:rotate-180 cursor-pointer duration-300"
          />
        </button>
        <div className="flex items-center flex-grow relative">
          <FiSearch className="absolute text-grayText left-2" size={24} />
          <input
            className="input-light w-full pl-10"
            placeholder="Search Categories"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="p-5 rounded-lg bg-componentBg">
        <div className="flex">
          <h4 className="font-playfair">All Categories</h4>
        </div>
        <div className="bg-tezDarkBg py-4 rounded-lg grid grid-cols-[30%_12%_17%_14%_13%_14%] mt-4">
          <span className="pl-8">Category</span>
          <span>24h Vol</span>
          <span>Total Vol</span>
          <span>Floor</span>
          <span>Holders</span>
          <span>Supply</span>
        </div>
        <div className="flex flex-col">
          {collectionStore.collections
            .filter((item) => item.slug.includes(searchValue))
            .map((collection, index) => (
              <LinkWithSearchParams
                to={{
                  pathname: `/collection/${collection.slug}`,
                }}
                key={index}
                className="grid grid-cols-[30%_12%_17%_14%_13%_14%] items-center mt-4 cursor-pointer hover:bg-white/10 py-2"
              >
                <div className="flex items-center gap-4">
                  <TbHeart
                    className={`ml-1 size-2 cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
                      true ? "stroke-tezGrSt fill-tezGrSt" : ""
                      // collection.bookmarked
                    }`}
                  />
                  <div className="rounded-full w-10 h-10 bg-tezGr flex items-center justify-center tracking-tight font-oswald size-1">
                    {collection.avatar}
                  </div>
                  <div>
                    <span>{collection.label}</span>
                    <br />
                    <span className="text-grayText size-sm font-normal">
                      {collection.description}
                    </span>
                  </div>
                </div>
                <div>
                  <span>{collection.volumeDay.toFixed(2)} ꜩ</span>
                  <br />
                  <PercentageChangeTag value={collection.volumeDayChange} />
                </div>
                <div>{collection.totalVolume.toFixed(2)} ꜩ</div>
                <div>
                  <span>{collection.floorPrice.toFixed(2)} ꜩ</span>
                  <br />
                  <PercentageChangeTag value={collection.floorPriceChange} />
                </div>
                <div>{collection.numberOfOwners}</div>
                <div>
                  {collection.numberOfMinted} / {collection.numberOfItems}
                </div>
                {/* {collection.maxSupply} */}
              </LinkWithSearchParams>
            ))}
        </div>
      </div>
    </div>
  );
};
export default MarketTopCategories;
