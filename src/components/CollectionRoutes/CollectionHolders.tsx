import LinkWithSearchParams from "components/LinkWithSearchParams";
import AddressBox from "components/UI/AddressBox";
import { fetchCollectionHoldersInfo } from "helper/api/collections.api";
import { beautifyAddress } from "helper/formatters";
import { I_COLLECTION_HOLDER } from "helper/interfaces";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTezosCollectStore } from "store";

const CollectionHolders = () => {
  const { findCollectionBySlug } = useTezosCollectStore();
  const { slug } = useParams();

  const [holders, setHolders] = useState<I_COLLECTION_HOLDER[]>([]);

  useEffect(() => {
    if (slug) updateHolders();
  }, [slug]);

  const collection = useMemo(() => findCollectionBySlug(slug || ""), [slug]);

  const updateHolders = async () => {
    const _holders = await fetchCollectionHoldersInfo(slug || "");
    setHolders(_holders);
  };

  const data = useMemo(
    () =>
      holders.map((holder) => {
        return {
          name: beautifyAddress(holder._id, 3),
          count: holder.count,
          amt: holder.count,
        };
      }),
    [holders]
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h4>Top 10 Holders</h4>
          <div className="rounded-lg flex-1 mt-4 py-4 px-6 bg-componentBg size-1 flex flex-col gap-2">
            {holders.slice(0, 10).map((holder, index) => {
              return (
                <div key={index} className="flex items-center">
                  <span className="w-16">{index + 1}</span>
                  <LinkWithSearchParams
                    className="hover:opacity-80"
                    to={{ pathname: `/profile/${holder._id}` }}
                  >
                    {beautifyAddress(holder._id)}
                  </LinkWithSearchParams>
                  <span className="ml-auto mr-2">{holder.count}</span>
                  <span className="size-sm text-grayText">
                    {(
                      (100 * holder.count) /
                      (collection?.numberOfItems || 1)
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h4>Top Holders</h4>
          <div className="rounded-lg mt-4 py-4 bg-componentBg size-1 flex flex-col gap-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" fontSize={16} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#397DFF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <h4>Top 50</h4>
      <div className="grid grid-cols-2 gap-4">
        {holders.map((holder, index) => {
          return (
            <div
              key={index}
              className="bg-componentBg rounded-lg p-4 flex items-center"
            >
              <LinkWithSearchParams
                className="hover:opacity-80"
                to={{ pathname: `/profile/${holder._id}` }}
              >
                {beautifyAddress(holder._id, 6)}
              </LinkWithSearchParams>
              <span className="ml-auto">{holder.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CollectionHolders;
