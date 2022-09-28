import DomainCard from "components/DomainCard";
import { mockupDomains } from "helper/constants";

const ProfileFavourties = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Favorites (4)</h3>
      <div className="grid grid-cols-4 gap-5">
        {mockupDomains.slice(0, 3).map((domain, index) => {
          return <DomainCard key={index} {...domain} cardType="DC_AUCTION" />;
        })}
      </div>
    </div>
  );
};
export default ProfileFavourties;
