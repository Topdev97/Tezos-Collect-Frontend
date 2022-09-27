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
              pathname: collection.link,
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

const topCollectionData = [
  {
    name: "10k Club",
    link: "10k-club",
  },
  {
    name: "100k Club",
    link: "10k-club",
  },
  {
    name: "999 Club",
    link: "10k-club",
  },
  {
    name: "3 letters",
    link: "10k-club",
  },
  {
    name: "4 letters ",
    link: "10k-club",
  },
  {
    name: "5+ letters",
    link: "10k-club",
  },
  {
    name: "Countries",
    link: "10k-club",
  },
  {
    name: "Hyphens",
    link: "10k-club",
  },
  {
    name: "Pokémon Generations 1",
    link: "10k-club",
  },
  {
    name: (
      <span className="flex items-center gap-2">
        More
        <FiExternalLink />
      </span>
    ),
    link: "10k-club",
  },
];
