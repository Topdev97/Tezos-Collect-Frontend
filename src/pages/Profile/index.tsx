import LinkWithSearchParams from "components/LinkWithSearchParams";

import ProfileCard from "components/ProfileCard";
import ProfileTabs from "components/ProfileTabs";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { address } = useParams();
  const TAB_LIST = useMemo(
    () => [
      {
        path: `/profile/${address}/holdings`,
        text: "Domains",
      },
      {
        path: `/profile/${address}/activity`,
        text: "Activity",
      },
      {
        path: `/profile/${address}/offers`,
        text: "Offers",
      },
      // {
      //   path: `//${address}profile/notifications`,
      //   text: "Notifications",
      // },
      {
        path: `/profile/${address}/favourites`,
        text: "Favorites",
      },
    ],
    [address]
  );

  return (
    <div className="flex flex-col gap-8 py-8">
      <ProfileCard />
      <div className="flex flex-col">
        <div className="flex md:w-1/2">
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
