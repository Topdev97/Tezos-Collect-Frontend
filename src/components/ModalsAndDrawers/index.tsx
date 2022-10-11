import CartDrawer from "components/CartDrawer";
import MakeOfferModal from "components/MakeOfferModal";
import OpenAuctionModal from "components/OpenAuctionModal";
import TxModal from "components/TxModal";
import PlaceBidModal from "components/PlaceBidModal";
const ModalsAndDrawers = () => {
  return (
    <>
      <MakeOfferModal />
      <OpenAuctionModal />
      <PlaceBidModal />
      <TxModal />
      <CartDrawer />
      <div className="hidden animation-blink" />
    </>
  );
};

export default ModalsAndDrawers;
