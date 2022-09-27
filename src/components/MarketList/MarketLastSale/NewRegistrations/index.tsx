import ComponentTable from "components/UI/ComponentTable";
import { FiSearch } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
const NewRegistrations = () => {
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
          <option>All Categories</option>
        </select>
      </div>

      <ComponentTable {...marketLastSaleData} />
    </div>
  );
};
export default NewRegistrations;

const marketLastSaleData = {
  textAlign: "left",
  heading: "New Registrations",
  collapsible: true,
  header: [
    "Event",
    "Name",
    "Cost",
    "Owner",
    "Registration Date",
    "Expiry Date",
  ],
  tableData: [
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Minted
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "3 months",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        List
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "3 months",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Sale
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "3 months",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Bid placed
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "3 months",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Bid received
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "3 months",
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        Auction won
      </div>,
      "080.tez",
      "70.6 ꜩ",
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "22 hours ago",
      "3 months",
    ],
  ],
};
