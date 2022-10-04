import DomainCard from "components/DomainCard";
import { useTezosCollectStore } from "store";

const ProfileActivity = () => {
  const { auctionedDomains } = useTezosCollectStore();
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Recent sales from user(2)</h3>
      <div className="grid grid-cols-4 gap-5">
        {auctionedDomains.slice(0, 2).map((domain, index) => {
          return <DomainCard key={index} {...domain} cardType="DC_SOLD" />;
        })}
      </div>
      <h3 className="font-playfair mt-6">Recent Purchases (6)</h3>
      <div className="grid grid-cols-4 gap-5">
        {auctionedDomains.slice(0, 6).map((domain, index) => {
          return <DomainCard key={index} {...domain} cardType="DC_PURCHASE" />;
        })}
      </div>
      <h3 className="font-playfair mt-6">Recent Listings (3)</h3>
      <div className="grid grid-cols-4 gap-5">
        {auctionedDomains.slice(0, 3).map((domain, index) => {
          return <DomainCard key={index} {...domain} cardType="DC_LISTING" />;
        })}
      </div>
      <h3 className="font-playfair mt-6">Recent Offers (3)</h3>
      <div className="grid grid-cols-4 gap-5">
        {auctionedDomains.slice(0, 3).map((domain, index) => {
          return <DomainCard key={index} {...domain} cardType="DC_OFFER" />;
        })}
      </div>
    </div>
  );
};
export default ProfileActivity;
