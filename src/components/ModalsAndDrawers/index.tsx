import CartDrawer from "components/CartDrawer";
import MakeOfferModal from "components/MakeOfferModal";
import TxModal from "components/TxModal";

const ModalsAndDrawers = () => {
  return (
    <>
      <MakeOfferModal />
      <TxModal />
      <CartDrawer />
    </>
  );
};

export default ModalsAndDrawers;
