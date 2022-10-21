import { Navigate, Route, Routes } from "react-router-dom";
import CollectionActivity from "./CollectionActivity";
import CollectionDomains from "./CollectionDomains";
import CollectionHolders from "./CollectionHolders";

const CollectionRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="domains" replace />} />
      <Route path="domains" element={<CollectionDomains />} />
      <Route path="activity" element={<CollectionActivity />} />
      <Route path="holders" element={<CollectionHolders />} />
    </Routes>
  );
};

export default CollectionRoutes;
