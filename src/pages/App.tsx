import Footer from "components/Footer";
import Header from "components/Header";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Header />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tokens" element={"tokens"} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default App;
