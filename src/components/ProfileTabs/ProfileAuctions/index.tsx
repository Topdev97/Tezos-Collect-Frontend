import DomainCard from "components/DomainCard";
import { useTezosCollectStore } from "store";

const ProfileAuctions = () => {
  const { auctionedDomains } = useTezosCollectStore();
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Auctions (3)</h3>
      <div className="grid grid-cols-4 gap-5">
        {auctionedDomains.slice(0, 3).map((domain, index) => {
          return <DomainCard key={index} {...domain} cardType="DC_OFFER" />;
        })}
      </div>
    </div>
  );
};
export default ProfileAuctions;
