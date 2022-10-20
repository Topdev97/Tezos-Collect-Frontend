import { useEffect, useState, useMemo } from "react";
import { useTezosCollectStore } from "store";
import { DOMAIN_ACTIVITY_LABEL, I_DOMAIN_ACTIVITY } from "helper/interfaces";
import { beautifyAddress, dateDifFromNow } from "helper/formatters";
import ComponentTable from "components/UI/ComponentTable";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import DomainBox from "components/UI/DomainBox";
import AddressBox from "components/UI/AddressBox";
import TxBox from "components/UI/TxBox";
import { useParams } from "react-router-dom";

const ProfileActivity = () => {
  const { address } = useParams();
  const { getDomainActivityByAddress } = useTezosCollectStore();
  const [domainActivities, setDomainActivities] = useState<I_DOMAIN_ACTIVITY[]>(
    []
  );
  useEffect(() => {
    if (address) {
      getDomainActivityByAddress(address).then((_domainActivities) => {
        setDomainActivities(_domainActivities);
      });
    }
  }, [address]);

  const domainActivitiesData = useMemo(() => {
    return {
      textAlign: "left",
      heading: "Activity",
      collapsible: true,
      header: ["Event", "Name", "Amount", "From", "To", "TX", "Date"],
      tableData:
        domainActivities.length === 0
          ? []
          : domainActivities.map((activity) => [
              <div className="flex items-center gap-2">
                <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                  <img src={tezosCollectLogo} className="w-4" />
                </div>
                {DOMAIN_ACTIVITY_LABEL[activity.type]}
              </div>,
              <DomainBox name={activity.name} />,
              `${activity.amount} ꜩ`,
              <AddressBox address={activity.from} />,
              <AddressBox address={activity.to} />,
              <TxBox tx={activity.txHash} />,
              dateDifFromNow(activity.timestamp),
            ]),
    };
  }, [domainActivities]);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Recent Activities</h3>
      <ComponentTable {...domainActivitiesData} />
    </div>
  );
};
export default ProfileActivity;
