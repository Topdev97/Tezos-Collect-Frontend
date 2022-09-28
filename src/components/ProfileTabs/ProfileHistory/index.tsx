import ComponentTable from "components/UI/ComponentTable";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";

const ProfileHistory = () => {
  return <ComponentTable {...historyTabeData} />;
};
export default ProfileHistory;

const historyTabeData = {
  textAlign: "left",
  heading: "History",
  collapsible: true,
  header: ["Event", "Name", "Price", "From", "To", "TX", "Date"],
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
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "tz1aSjTFe...",
      "3 weeks ago",
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
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "tz1aSjTFe...",
      "3 weeks ago",
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
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "tz1aSjTFe...",
      "3 weeks ago",
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
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "tz1aSjTFe...",
      "3 weeks ago",
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
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "tz1aSjTFe...",
      "3 weeks ago",
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
      <span className="address-gr-br-box p-2">tz1aSjTFe</span>,
      "tz1aSjTFe...",
      "3 weeks ago",
    ],
  ],
};
