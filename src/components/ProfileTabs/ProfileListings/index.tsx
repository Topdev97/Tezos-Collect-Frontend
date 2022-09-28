import ComponentTable from "components/UI/ComponentTable";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import HoverMenu from "components/UI/HoverMenu";
import { MdReport } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const ProfileListings = () => {
  return <ComponentTable {...listingTableData} />;
};
export default ProfileListings;

const listingTableData = {
  textAlign: "left",
  heading: "Listings",
  collapsible: true,
  header: [
    "Domain",
    "Price",
    "Owner",
    "Date",
    <span className="mx-auto">Action</span>,
  ],
  tableData: [
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        080.tez
      </div>,

      "70.6 ꜩ",
      "tz1aSjTFe...",
      "3 weeks ago",
      <div className="flex justify-around">
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
      </div>,
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        080.tez
      </div>,

      "70.6 ꜩ",
      "tz1aSjTFe...",
      "3 weeks ago",
      <div className="flex justify-around">
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
      </div>,
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        080.tez
      </div>,

      "70.6 ꜩ",
      "tz1aSjTFe...",
      "3 weeks ago",
      <div className="flex justify-around">
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
      </div>,
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        080.tez
      </div>,

      "70.6 ꜩ",
      "tz1aSjTFe...",
      "3 weeks ago",
      <div className="flex justify-around">
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
      </div>,
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        080.tez
      </div>,

      "70.6 ꜩ",
      "tz1aSjTFe...",
      "3 weeks ago",
      <div className="flex justify-around">
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
      </div>,
    ],
    [
      <div className="flex items-center gap-2">
        <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
          <img src={tezosCollectLogo} className="w-4" />
        </div>
        080.tez
      </div>,

      "70.6 ꜩ",
      "tz1aSjTFe...",
      "3 weeks ago",
      <div className="flex justify-around">
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
      </div>,
    ],
  ],
};
