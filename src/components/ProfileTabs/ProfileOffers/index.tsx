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

const ProfileOffers = () => {
  const { address } = useParams();
  const { queryDomainActivity } = useTezosCollectStore();
  const [domainActivities, setDomainActivities] = useState<I_DOMAIN_ACTIVITY[]>(
    []
  );

  useEffect(() => {
    if (address) {
      fetchDomainActivites();
    }
  }, [address]);

  const fetchDomainActivites = async () => {
    const [offersMade, offersReceived] = await Promise.all([
      queryDomainActivity(
        { from: address, type: "NEW_OFFER" },
        "TIMESTAMP_DESC"
      ),
      queryDomainActivity({ to: address, type: "NEW_OFFER" }, "TIMESTAMP_DESC"),
    ]);

    setDomainActivities(
      offersMade.domainActivities.concat(offersReceived.domainActivities)
    );
  };

  const domainActivitiesData = useMemo(() => {
    return {
      textAlign: "left",
      heading: `${domainActivities.length} Offers - Made (${
        domainActivities.filter((item) => item.from === address).length
      }) - Recevied (${
        domainActivities.filter((item) => item.to === address).length
      })`,
      collapsible: true,
      header: ["Event", "Name", "Amount", "From", "To", "TX", "Date"],
      tableData:
        domainActivities.length === 0
          ? []
          : domainActivities
              .sort(
                (itemB, itemA) =>
                  itemA.timestamp.getTime() - itemB.timestamp.getTime()
              )
              .map((activity) => [
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                    <img src={tezosCollectLogo} className="w-4" />
                  </div>
                  {activity.from === address ? "Made Offer" : "Received Offer"}
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
      <h3 className="font-playfair">Offers Made and Received</h3>
      <ComponentTable {...domainActivitiesData} />
    </div>
  );
};
export default ProfileOffers;
