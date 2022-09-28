import LinkWithSearchParams from "components/LinkWithSearchParams";

import ProfileCard from "components/ProfileCard";
import ProfileTabs from "components/ProfileTabs";

const Profile = () => {
  return (
    <div className="flex flex-col gap-8 mb-8">
      <ProfileCard />
      <div className="flex flex-col">
        <div className="flex">
          {TAB_LIST.map((link, index) => (
            <LinkWithSearchParams
              key={index}
              className={({ isActive }: { isActive: boolean }) =>
                `whitespace-nowrap flex-1 font-semibold cursor-pointer hover:text-tezLightGr ${
                  isActive
                    ? "border-b-2 border-b-tezGrSt text-tezGr outline-0"
                    : ""
                }`
              }
              to={{
                pathname: link.path,
              }}
            >
              <div className="p-2 text-center">{link.text}</div>
            </LinkWithSearchParams>
          ))}
        </div>
        <div className="h-[2px] -translate-y-[2px] bg-componentBorder" />
      </div>
      <ProfileTabs />
    </div>
  );
};

export default Profile;

const TAB_LIST = [
  {
    path: "/profile/activity",
    text: "Activity",
  },
  {
    path: "/profile/holdings",
    text: "Owned",
  },
  {
    path: "/profile/history",
    text: "History",
  },
  {
    path: "/profile/offers",
    text: "Offers",
  },
  {
    path: "/profile/listings",
    text: "Listings",
  },
  {
    path: "/profile/auctions",
    text: "Auctions",
  },
  {
    path: "/profile/notifications",
    text: "Notifications",
  },
  {
    path: "/profile/favourites",
    text: "Favorites",
  },
];
