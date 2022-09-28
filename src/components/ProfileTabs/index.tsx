import { Route, Routes } from "react-router-dom";
import ProfileActivity from "./ProfileActivity";
const ProfileTabs = () => {
  return (
    <Routes>
      <Route path="" element={<ProfileActivity />} />
      <Route path="activity" element={<ProfileActivity />} />
      <Route path="holdings" element={<ProfileActivity />} />
      <Route path="history" element={<ProfileActivity />} />
      <Route path="offers" element={<ProfileActivity />} />
      <Route path="listings" element={<ProfileActivity />} />
      <Route path="auctions" element={<ProfileActivity />} />
      <Route path="notifications" element={<ProfileActivity />} />
      <Route path="favourites" element={<ProfileActivity />} />
    </Routes>
  );
};

export default ProfileTabs;
