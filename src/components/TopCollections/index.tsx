import LinkWithSearchParams from "components/LinkWithSearchParams";
import { FiExternalLink } from "react-icons/fi";
import { useTezosCollectStore } from "store";

const TopCollections = () => {
  const { collectionStore } = useTezosCollectStore();
  return (
    <div className="hidden md:flex justify-between">
      {collectionStore.collections.map((collection, index) => {
        return (
          <LinkWithSearchParams
            key={index}
            className="button hover-bg-tezGr text-center tracking-wide font-semibold"
            to={{
              pathname: `/collection/${collection.slug}`,
            }}
          >
            {collection.label}
          </LinkWithSearchParams>
        );
      })}
    </div>
  );
};

export default TopCollections;
