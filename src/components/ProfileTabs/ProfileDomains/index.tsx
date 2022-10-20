import DomainMarketCard from "components/DomainMarketCard";
import { DEFAULT_PAGE_SIZE } from "helper/constants";
import { TYPE_DOMAIN } from "helper/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTezosCollectStore } from "store";

const ProfileDomains = () => {
  const { address } = useParams();
  const { queryDomain } = useTezosCollectStore();
  const [domains, setDomains] = useState<TYPE_DOMAIN[]>([]);

  useEffect(() => {
    if (address) onUpdateFilter(1);
  }, [address]);

  const onUpdateFilter = async (_currentPage: number) => {
    const { domains: _domains, count } = await queryDomain(
      { owner: address },
      [],
      "LASTSOLDAMOUNT_DESC"
    );
    setDomains(_domains);
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Tezos Domains ({domains.length})</h3>
      <div className="grid grid-cols-5 gap-5">
        {domains.map((domain, index) => {
          return (
            <DomainMarketCard
              key={index}
              domain={domain}
              cardHandler={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ProfileDomains;
