import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "",
    price: 0,
  },
  {
    name: "04/27",
    price: 40,
  },
  {
    name: "04/28",
    price: 80,
  },
  {
    name: "05/04",
    price: 70,
  },
  {
    name: "05/08",
    price: 35,
  },
  {
    name: "06/12",
    price: 60,
  },
  {
    name: "08/27",
    price: 100,
  },
];

const PriceHistory = (props: { heading: string; collapsible: boolean }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { heading, collapsible } = props;
  return (
    <div className="flex flex-col rounded-lg bg-componentBg p-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h5 className="font-playfair font-medium">{heading}</h5>
        {collapsible && (
          <FiChevronDown
            size={20}
            className={`mt-[3px] ml-auto duration-150 ${
              collapsed ? "-scale-y-100" : ""
            }`}
          />
        )}
      </div>
      <div
        className={`overflow-hidden duration-300 ${
          collapsed ? "max-h-0" : "max-h-[1000px]"
        } `}
      >
        <div className="h-8" />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} stroke="#35434E" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: any) => `${value} ꜩ`} />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00A672"
              fill="#00FBFB46"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PriceHistory;
