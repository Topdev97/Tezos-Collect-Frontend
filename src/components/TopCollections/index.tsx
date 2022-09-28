import LinkWithSearchParams from "components/LinkWithSearchParams";
import { FiExternalLink } from "react-icons/fi";

const TopCollections = () => {
  return (
    <div className="hidden md:flex gap-4">
      {topCollectionData.map((collection, index) => {
        return (
          <LinkWithSearchParams
            key={index}
            className="button hover-bg-tezGr flex-grow text-center tracking-wide font-semibold"
            to={{
              pathname: `/collection${collection.link}`,
            }}
          >
            {collection.name}
          </LinkWithSearchParams>
        );
      })}
    </div>
  );
};

export default TopCollections;

export const topCollectionData = [
  {
    name: "10k Club",
    link: "/10k-club",
  },
  {
    name: "100k Club",
    link: "/100k-club",
  },
  {
    name: "999 Club",
    link: "/999-club",
  },
  {
    name: "3 letters",
    link: "/3-letters",
  },
  {
    name: "4 letters ",
    link: "/4-letters",
  },
  {
    name: "5+ letters",
    link: "/5-letters",
  },
  {
    name: "Countries",
    link: "/countries",
  },
  {
    name: "Hyphens",
    link: "/hypens",
  },
  {
    name: "Pokémon Generations 1",
    link: "/pokemon-generation-1",
  },
  {
    name: (
      <span className="flex items-center gap-2">
        More
        <FiExternalLink />
      </span>
    ),
    link: "/more",
  },
];
