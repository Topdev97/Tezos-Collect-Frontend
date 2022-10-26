import CollectionRoutes from "components/CollectionRoutes";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import PercentageChangeTag from "components/UI/PercentageChangeTag";
import { TYPE_COLLECTION } from "helper/interfaces";
import { useMemo } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useTezosCollectStore } from "store";

const CollectionDetails = () => {
  const { slug } = useParams();
  const { findCollectionBySlug } = useTezosCollectStore();

  // @ts-ignore
  const collection: TYPE_COLLECTION = useMemo(() => {
    return findCollectionBySlug(slug || "");
  }, [slug]);

  const COLLECTION_TABS = useMemo(
    () => [
      {
        path: `/collection/${slug}/domains`,
        text: "Collections",
      },
      {
        path: `/collection/${slug}/activity`,
        text: "Activity",
      },
      {
        path: `/collection/${slug}/holders`,
        text: "Holders",
      },
    ],
    [slug]
  );

  return (
    <div className="flex flex-col gap-8 pt-16">
      <div className="flex gap-8 rounded-lg bg-componentBg p-6">
        <div className="rounded-lg w-32 aspect-square bg-tezDarkBg flex items-center justify-center tracking-tight font-oswald size-6">
          {collection?.avatar}
        </div>
        <div className="flex flex-col justify-between items-start">
          <h3>{collection?.label}</h3>
          <span className="text-grayText">{collection?.description}</span>
          <div className="flex gap-4">
            <a
              href={collection?.discordLink}
              target="_blank"
              className="rounded-lg border border-white p-2 hover:bg-grayText/50"
            >
              <FaDiscord className="size-2" />
            </a>
            <a
              href="https://twitter.com/tezoscollect"
              target="_blank"
              className="rounded-lg border border-white p-2 hover:bg-grayText/50"
            >
              <FaTwitter className="size-2" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-8">
        <div className="flex flex-col">
          <div className="size-3 flex items-center gap-2">
            {collection?.floorPrice.toFixed(2)} ꜩ
            <PercentageChangeTag value={collection?.floorPriceChange} />
          </div>
          <span className="text-grayText">Floor</span>
        </div>
        <div className="flex flex-col">
          <div className="size-3">{collection?.topSale.toFixed(2)} ꜩ</div>
          <span className="text-grayText">Top Sale</span>
        </div>
        <div className="flex flex-col">
          <div className="size-3">{collection?.numberOfOwners}</div>
          <span className="text-grayText">Owners</span>
        </div>
        <div className="flex flex-col col-span-3">
          <div className="size-3">
            {collection?.numberOfMinted}/{collection?.numberOfItems}
          </div>
          <span className="text-grayText">Items</span>
        </div>
        <div className="flex flex-col">
          <div className="size-3 flex items-center gap-2">
            {collection?.volumeDay.toFixed(2)} ꜩ
            <PercentageChangeTag value={collection?.volumeDayChange} />
          </div>
          <span className="text-grayText">24h Volume</span>
        </div>
        <div className="flex flex-col">
          <div className="size-3 flex items-center gap-2">
            {collection?.volumeMonth.toFixed(2)} ꜩ
            <PercentageChangeTag value={collection?.volumeMonthChange} />
          </div>
          <span className="text-grayText">1 Month Volume</span>
        </div>
        <div className="flex flex-col">
          <div className="size-3">{collection?.totalVolume.toFixed(2)} ꜩ</div>
          <span className="text-grayText">Total Volume</span>
        </div>
      </div>
      <div className="flex gap-3 mt-4 overflow-x-auto">
        {COLLECTION_TABS.map((link, index) => (
          <LinkWithSearchParams
            key={index}
            className={({ isActive }: { isActive: boolean }) =>
              `button hover-bg-tezGr whitespace-nowrap ${
                isActive ? "bg-tezGr outline-0 text-white " : ""
              }`
            }
            to={{
              pathname: link.path,
            }}
          >
            {link.text}
          </LinkWithSearchParams>
        ))}
      </div>
      <CollectionRoutes />
    </div>
  );
};
export default CollectionDetails;
