import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const ComponentTable = (props: {
  textAlign: string;
  heading: string;
  collapsible: boolean;
  header: any[];
  tableData: any[][];
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { textAlign, heading, collapsible, header, tableData } = props;
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
        <div
          className={`flex bg-tezDarkBg  ${
            textAlign === "center" ? "px-2" : "px-2 md:px-8"
          } py-4 mt-4 mb-1 rounded-lg overflow-x-scroll`}
        >
          {header.map((item, index) => {
            return (
              <span
                className={`${
                  header.length > 4 ? "min-w-[5rem]" : ""
                } flex-1 flex text-${textAlign}`}
                key={index}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="flex flex-col mb-2">
          {tableData.map((rowData, index) => {
            return (
              <div
                key={index}
                className={`flex size-xs md:size-base ${
                  textAlign === "center" ? "px-2" : "px-2 md:px-8"
                } py-4 border-b border-b-itemBorder overflow-x-scroll`}
              >
                {rowData.map((item, cellIndex) => {
                  return (
                    <span
                      className={`flex-1 text-${textAlign} ${
                        header.length > 4 ? "min-w-[5rem]" : ""
                      }`}
                      key={cellIndex}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ComponentTable;
