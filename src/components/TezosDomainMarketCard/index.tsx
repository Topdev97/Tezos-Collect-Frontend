import { useEffect, useMemo, useState } from "react";
import { useTezosCollectStore } from "store";
import { I_TEZOSDOMAIN_MARKET_OFFER } from "helper/interfaces";
import Loader from "components/UI/Loader";

interface ITezosDomainMarketCardProps {
  tokenId?: number;
  owner: string;
  callback: any;
}
const TezosDomainMarketCard = (props: ITezosDomainMarketCardProps) => {
  const { tokenId: _tokenId, owner, callback } = props;

  const {
    fetchTezosDomainMarketOfferData,
    contractReady,
    executeOfferViaTezosDomainMarket,
  } = useTezosCollectStore();

  const [loading, setLoading] = useState<boolean>(true);

  const [tezosDomainMarketOffer, setTezosDomainMarketOffer] =
    useState<I_TEZOSDOMAIN_MARKET_OFFER>({
      expiration: new Date(),
      price: 0,
      valid: false,
    });

  const tokenId = useMemo(() => _tokenId || 0, [_tokenId]);

  const updateMarketData = () => {
    fetchTezosDomainMarketOfferData(owner, tokenId).then((offer) => {
      setTezosDomainMarketOffer(offer);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (tokenId > 0 && contractReady) {
      updateMarketData();
    }
  }, [tokenId, contractReady]);

  const executeOffer = async () => {
    await executeOfferViaTezosDomainMarket(
      owner,
      tokenId,
      tezosDomainMarketOffer.price
    );
    updateMarketData();
    if (callback) callback();
  };

  return (
    <div className="md:ml-6 bg-tezDarkBg border-2 border-itemBorder rounded-lg  aspect-square flex flex-col">
      <div className="size-1 border-b-2 px-4 py-4 border-itemBorder font-semibold">
        Listing at Tezos Domains
      </div>
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {tezosDomainMarketOffer.valid === false && (
            <div className="flex flex-1 justify-center items-center">
              No Active Listings
            </div>
          )}

          {tezosDomainMarketOffer.valid === true && (
            <div className="flex flex-col flex-1 p-4">
              <span>Price: {tezosDomainMarketOffer.price} ꜩ</span>
              <span>
                Expiration: {tezosDomainMarketOffer.expiration.toLocaleString()}
              </span>
            </div>
          )}
        </>
      )}

      <div className="flex items-center border-t-2 px-4 py-4 mt-auto border-itemBorder">
        <button
          className="ml-auto tezGr-button px-6 md:py-3"
          disabled={!tezosDomainMarketOffer.valid}
          onClick={executeOffer}
        >
          Buy
        </button>
      </div>
    </div>
  );
};
export default TezosDomainMarketCard;
