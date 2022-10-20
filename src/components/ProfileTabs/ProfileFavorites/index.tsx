import { useEffect, useState } from "react";
import DomainCard from "components/DomainCard";
import { useParams } from "react-router-dom";
import { useTezosCollectStore } from "store";

const ProfileFavorites = () => {
  const {
    bookmarkedNames: myBookmarkedNames,
    fetchBookmarkedNamesByAddress,
    activeAddress,
  } = useTezosCollectStore();
  const { address } = useParams();
  const [bookmarkedNames, setBookmarkedNames] = useState<string[]>([]);
  useEffect(() => {
    if (address === activeAddress) setBookmarkedNames(myBookmarkedNames);
    fetchBookmarkedNamesByAddress(address || "").then((list) =>
      setBookmarkedNames(list)
    );
  }, [activeAddress]);
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-playfair">Favorites ({bookmarkedNames.length})</h3>
      <div className="grid grid-cols-5 gap-5">
        {bookmarkedNames.map((name, index) => {
          return <DomainCard key={index} name={name} />;
        })}
      </div>
    </div>
  );
};
export default ProfileFavorites;
