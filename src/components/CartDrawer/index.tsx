import AceDrawer from "components/UI/AceDrawer";
import { useTezosCollectStore } from "store";

const CartDrawer = () => {
  const domainCart = useTezosCollectStore((state) => state.domainCart);
  const setCartDrawerVisible = useTezosCollectStore(
    (state) => state.setCartDrawerVisible
  );

  return (
    <div className="z-30">
      <AceDrawer
        drawerVisible={domainCart.cartDrawerVisible}
        setDrawerVisible={setCartDrawerVisible}
        drawAlign="D_RIGHT"
      >
        <div className="flex flex-col gap-4 w-96">
          <span className="size-2 font-semibold p-6 border-b border-b-inputBorder">
            Checkout
          </span>
        </div>
      </AceDrawer>
    </div>
  );
};
export default CartDrawer;
