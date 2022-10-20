import DomainCard from "components/DomainCard";
import { useTezosCollectStore } from "store";

const ProfileFavorites = () => {
  const { auctionedDomains } = useTezosCollectStore();
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Favorites (4)</h3>
      <div className="grid grid-cols-5 gap-5">
        {auctionedDomains.slice(0, 3).map((domain, index) => {
          return <DomainCard key={index} {...domain} />;
        })}
      </div>
    </div>
  );
};
export default ProfileFavorites;
