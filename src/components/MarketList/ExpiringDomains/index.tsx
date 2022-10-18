import { useEffect, useMemo, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Pagination from "components/UI/Pagination";
import { TYPE_DOMAIN } from "helper/interfaces";
import { useTezosCollectStore } from "store";
import { DEFAULT_PAGE_SIZE } from "helper/constants";
import DomainBox from "components/UI/DomainBox";
import AddressBox from "components/UI/AddressBox";
import tezosCollectLogo from "assets/images/tezos-collect-logo.svg";
import { dateDifFromNow } from "helper/formatters";
import ComponentTable from "components/UI/ComponentTable";
import LinkWithSearchParams from "components/LinkWithSearchParams";

const ExpiringDomains = () => {
  const { queryDomain, findCollectionById } = useTezosCollectStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [domains, setDomains] = useState<TYPE_DOMAIN[]>([]);

  const [containStr, setContainStr] = useState<string>("");

  useEffect(() => {
    onUpdateFilter(1);
  }, []);

  const onUpdateFilter = async (_currentPage: number) => {
    const { domains: _domains, count } = await queryDomain(
      {
        offset: _currentPage - 1,
        pageSize: DEFAULT_PAGE_SIZE,
        isRegistered: true,
        isExpiring: true,
      },
      [],
      "EXPIRESAT_DESC"
    );
    setDomains(_domains);

    const _totalPage = Math.ceil(count / DEFAULT_PAGE_SIZE);
    setTotalPage(_totalPage);
    if (_currentPage > _totalPage) setCurrentPage(1);
  };

  const updateCurrentPage = (_currentPage: number) => {
    setCurrentPage(_currentPage);
    onUpdateFilter(_currentPage);
  };

  const marketNewRegistrationData = useMemo(() => {
    return {
      textAlign: "left",
      heading: "Expiring Domains",
      collapsible: true,
      header: ["Event", "Name", "Collection", "Cost", "Owner", "Expiry Date"],
      tableData:
        domains.length === 0
          ? []
          : domains
              .filter((domain) => domain.name.includes(containStr))
              .map((domain) => [
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-2 bg-white/10 flex items-center justify-center tracking-tight font-oswald">
                    <img src={tezosCollectLogo} className="w-4" />
                  </div>
                  Expiring
                </div>,
                <DomainBox name={domain.name} />,

                <LinkWithSearchParams
                  className="button hover-bg-tezGr text-center tracking-wide font-semibold"
                  to={{
                    pathname: `/collection/${
                      findCollectionById(domain.collectionId)?.slug
                    }`,
                  }}
                >
                  {findCollectionById(domain.collectionId)?.slug}
                </LinkWithSearchParams>,
                `${
                  domain.name.length >= 5
                    ? 1
                    : domain.name.length === 4
                    ? 25
                    : 100
                } ꜩ per year`,
                <AddressBox address={domain.owner} />,
                dateDifFromNow(domain.expiresAt),
              ]),
    };
  }, [domains, containStr]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <button className="p-2 bg-white rounded-lg text-tezDarkBg">
          <HiOutlineRefresh
            size={24}
            className="hover:rotate-180 cursor-pointer duration-300"
          />
        </button>
        <div className="flex items-center flex-grow relative">
          <FiSearch className="absolute text-grayText left-2" size={24} />
          <input
            className="input-light w-full pl-10"
            placeholder="Type your perfect domain"
            onChange={(e) => setContainStr(e.target.value)}
          />
        </div>
      </div>

      <div className="flex mx-auto">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          visibleNumber={10}
          onPageChange={updateCurrentPage}
        />
      </div>
      <ComponentTable {...marketNewRegistrationData} />
    </div>
  );
};
export default ExpiringDomains;
