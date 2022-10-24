import { Navigate, Route, Routes } from "react-router-dom";
import ProfileActivity from "./ProfileActivity";
import ProfileDomains from "./ProfileDomains";
import ProfileFavorites from "./ProfileFavorites";
import ProfileOffers from "./ProfileOffers";
const ProfileTabs = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="holdings" replace />} />
      <Route path="holdings" element={<ProfileDomains />} />
      <Route path="activity" element={<ProfileActivity />} />
      <Route path="offers" element={<ProfileOffers />} />
      {/* <Route path="notifications" element={<ProfileActivity />} /> */}
      <Route path="favorites" element={<ProfileFavorites />} />
    </Routes>
  );
};

export default ProfileTabs;
