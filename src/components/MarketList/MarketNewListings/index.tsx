import { FiSearch } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import CSVSvg from "assets/images/market/csv.svg";
import { useState } from "react";
import { TYPE_VIEWMODE } from "helper/interfaces";
import ViewModeControl from "components/UI/ViewModeControl";
import { mockupDomains } from "helper/constants";
import HoverMenu from "components/UI/HoverMenu";
import { MdReport } from "react-icons/md";
import DomainCard from "components/DomainCard";
import DomainWideCard from "components/DomainWideCard";

const ExpiringDomains = () => {
  const [viewMode, setViewMode] = useState<TYPE_VIEWMODE>("VM_LIST");

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
          <option>Expiring</option>
        </select>
      </div>
      <div className="flex">
        <button className="tezGr-button px-3 py-2.5">
          <img src={CSVSvg} />
        </button>
        <div className="ml-auto">
          <ViewModeControl viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      {viewMode === "VM_LIST" ? (
        <div className="p-5 rounded-lg bg-componentBg">
          <div className="flex">
            <h4 className="font-playfair">Expiring</h4>
          </div>
          <div className="bg-tezDarkBg py-4 rounded-lg grid grid-cols-[15%_16%_13%_14%_16%_19%_7%] mt-4">
            <span className="pl-8">Name</span>
            <span>Current Price</span>
            <span>Owners</span>
            <span>Last Sale</span>
            <span>Registration</span>
            <span>Expiration</span>
            <span className="text-center">Action</span>
          </div>
          <div className="flex flex-col">
            {mockupDomains.map((domain, index) => (
              <div
                key={index}
                className="grid grid-cols-[15%_16%_13%_14%_16%_19%_7%] items-center mt-4 cursor-pointer py-2 border-b border-b-inputBorder"
              >
                <div className="pl-8">{domain.name}</div>
                <div>
                  <span>PREMIUM</span>
                  <br />
                  <span className="size-sm text-tezSuccess font-normal">
                    $ {domain.price}
                  </span>
                </div>
                <div>{domain.owner} </div>
                <div>{domain.lastSalePrice} ꜩ</div>
                <div>{domain.registedAt?.toLocaleDateString()}</div>
                <div>
                  <span>PREMIUM PERIOD</span>
                  <br />
                  <span className="size-sm text-tezSuccess font-normal">
                    {domain.expiresAt?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-center">
                  <HoverMenu
                    options={[
                      {
                        icon: <MdReport size={20} />,
                        text: "Report",
                        handler: () => {
                          alert("report");
                        },
                      },
                    ]}
                    icon={<BsThreeDotsVertical size={20} />}
                    text=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : viewMode === "VM_COMPACT" ? (
        <div className="grid grid-cols-4 gap-5">
          {mockupDomains.map((domain, index) => (
            <DomainCard key={index} {...domain} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {mockupDomains.map((domain, index) => (
            <DomainWideCard key={index} {...domain} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ExpiringDomains;
