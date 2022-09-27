import LinkWithSearchParams from "components/LinkWithSearchParams";
import { TEZOS_PRICE } from "helper/constants";
import { commafyFormatter } from "helper/formatters";
import { FiChevronRight } from "react-icons/fi";

const TopCategories = () => {
  return (
    <div className="flex flex-col my-12">
      <div className="flex items-center">
        <h4 className="font-playfair mb-6">Top Categories (24h)</h4>
        <LinkWithSearchParams
          to={{
            pathname: "/categories",
          }}
          className="ml-auto size-1 text-tezLightGr hover:text-tezGr duration-50 flex items-center"
        >
          See all Categories
          <FiChevronRight className="text-tezGrEd" />
        </LinkWithSearchParams>
      </div>
      <div className="flex w-full flex-col gap-2">
        {topCategories.map((category, index) => {
          return (
            <div
              key={index}
              className="px-3 py-2 hover:bg-white/10 flex items-center cursor-pointer duration-100"
            >
              <div className="flex w-1/4 items-center">
                <div className="rounded-full w-12 h-12 bg-tezGr flex items-center justify-center tracking-tight font-oswald size-1">
                  {category.avatar}
                </div>
                <span className="ml-4">{category.name}</span>
              </div>
              <div className="flex w-1/4">
                <span>
                  <span className="text-grayText">Floor: </span>
                  {category.floorPrice}
                </span>
              </div>
              <div className="flex w-1/4">
                <span className="font-normal tracking-wide">
                  {commafyFormatter(category.volumn)} ꜩ
                </span>
              </div>
              <div className="flex w-1/4">
                <span className="tracking-wide">
                  ${commafyFormatter(TEZOS_PRICE * category.volumn)}
                </span>
                <span className="ml-auto mr-2 text-tezLightGr font-bold border-b-2 border-b-tezGrMd">
                  View
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategories;

const topCategories = [
  {
    avatar: "100K",
    name: "10k Club",
    floorPrice: "2.275 ꜩ",
    volumn: 94450.818,
    link: "10k-club",
  },
  {
    avatar: "999",
    name: "999 Club",
    floorPrice: "2.275 ꜩ",
    volumn: 8853.818,
    link: "10k-club",
  },
  {
    avatar: "100K",
    name: "100k Club",
    floorPrice: "2.275 ꜩ",
    volumn: 3183.818,
    link: "10k-club",
  },
  {
    avatar: "ABC",
    name: "3 Letters",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
  {
    avatar: "4LP",
    name: "4 Letters",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
  {
    avatar: "5LP",
    name: "5+ letters",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
  {
    avatar: "CN",
    name: "Countries",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
  {
    avatar: "H",
    name: "Hyphens ",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
  {
    avatar: "PG1",
    name: "Pokémon Generation 1",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
  {
    avatar: "MF",
    name: "Male firstnames",
    floorPrice: "2.275 ꜩ",
    volumn: 8893.818,
    link: "10k-club",
  },
];
