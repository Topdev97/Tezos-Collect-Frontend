import { Route, Routes } from "react-router-dom";
import ProfileActivity from "./ProfileActivity";
import ProfileAuctions from "./ProfileAuctions";
import ProfileFavourties from "./ProfileFavourties";
import ProfileHistory from "./ProfileHistory";
import ProfileListings from "./ProfileListings";
import ProfileOffers from "./ProfileOffers";
const ProfileTabs = () => {
  return (
    <Routes>
      <Route path="" element={<ProfileActivity />} />
      <Route path="activity" element={<ProfileActivity />} />
      <Route path="holdings" element={<ProfileActivity />} />
      <Route path="history" element={<ProfileHistory />} />
      <Route path="offers" element={<ProfileOffers />} />
      <Route path="listings" element={<ProfileListings />} />
      <Route path="auctions" element={<ProfileAuctions />} />
      <Route path="notifications" element={<ProfileActivity />} />
      <Route path="favourites" element={<ProfileFavourties />} />
    </Routes>
  );
};

export default ProfileTabs;
