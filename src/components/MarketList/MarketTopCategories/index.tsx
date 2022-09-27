import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import CSVSvg from "assets/images/market/csv.svg";
import { FiSearch } from "react-icons/fi";
import { TbHeart } from "react-icons/tb";
import { topCategories } from "helper/constants";

const MarketTopCategories = () => {
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
            placeholder="Type your perfect domain"
          />
        </div>
        <select className="select-light w-32 lg:w-64">
          <option>All</option>
        </select>
      </div>
      <div className="p-5 rounded-lg bg-componentBg">
        <div className="flex">
          <h4 className="font-playfair">All Categories</h4>
          <select className="select-light ml-auto">
            <option>Filters</option>
          </select>
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
          {topCategories.map((category, index) => (
            <div
              key={index}
              className="grid grid-cols-[30%_12%_17%_14%_13%_14%] items-center mt-4 cursor-pointer hover:bg-white/10 py-2"
            >
              <div className="flex items-center gap-4">
                <TbHeart
                  className={`ml-1 size-2 cursor-pointer duration-150 hover:stroke-tezGrSt mr-0.5 ${
                    category.bookmarked ? "stroke-tezGrSt fill-tezGrSt" : ""
                  }`}
                />
                <div className="rounded-full w-10 h-10 bg-tezGr flex items-center justify-center tracking-tight font-oswald size-1">
                  {category.avatar}
                </div>
                <div>
                  <span>{category.name}</span>
                  <br />
                  <span className="text-grayText size-sm font-normal">
                    {category.description}
                  </span>
                </div>
              </div>
              <div>
                <span>{category.volumn} ꜩ</span>
                <br />
                <span
                  className={`size-sm ${
                    category.volumnChange >= 0
                      ? "text-tezSuccess"
                      : "text-tezWarning"
                  } font-normal`}
                >
                  {category.volumnChange >= 0
                    ? `+${category.volumnChange}`
                    : category.volumnChange}
                  %
                </span>
              </div>
              <div>{category.volumn} ꜩ</div>
              <div>
                <span>{category.floorPrice} ꜩ</span>
                <br />
                <span
                  className={`size-sm ${
                    category.floorChange >= 0
                      ? "text-tezSuccess"
                      : "text-tezWarning"
                  } font-normal`}
                >
                  {category.floorChange >= 0
                    ? `+${category.floorChange}`
                    : category.floorChange}
                  %
                </span>
              </div>
              <div>{category.holders}</div>
              <div>
                {category.totalSupply} / {category.maxSupply}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MarketTopCategories;
