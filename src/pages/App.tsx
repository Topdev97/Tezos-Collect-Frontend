import Header from "components/Header";
import { Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/tokens" element={"tokens"} />
      </Routes>
    </>
  );
};
export default App;
