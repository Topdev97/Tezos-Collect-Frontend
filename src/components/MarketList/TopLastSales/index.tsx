import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import CSVSvg from "assets/images/market/csv.svg";
import { FiSearch } from "react-icons/fi";
import Filter from "components/Filter";
import DomainCard from "components/DomainCard";
import Pagination from "components/UI/Pagination";

const TopLastSales = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
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
      <div className="grid grid-cols-6 gap-5">
        {allDomains.slice(0, 9).map((domain, index) => {
          return (
            <div key={index}>
              <DomainCard {...domain} />
            </div>
          );
        })}
        <div className="col-span-3 col-start-2 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPage={48}
            visibleNumber={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};
export default TopLastSales;

const allDomains = [
  { name: "5471.tez", price: 27.86, bookmarked: true },
  { name: "5480.tez", price: 40.86, bookmarked: false },
  { name: "1358.tez", price: 96.1, bookmarked: false },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
  { name: "axis.tez", price: 107.56, bookmarked: true },
];
