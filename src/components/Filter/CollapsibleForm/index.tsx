import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const CollapsibleForm = (props: { heading: string; element: any }) => {
  const { heading, element } = props;
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <div
        className="flex py-3 border-y border-y-itemBorder cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>{heading}</span>
        <FiChevronDown
          size={20}
          className={`mt-[3px] ml-auto duration-150 ${
            collapsed ? "-scale-y-100" : ""
          }`}
        />
      </div>

      <div
        className={`overflow-hidden duration-300 ${
          collapsed ? "max-h-0" : "max-h-[1000px]"
        } `}
      >
        {element}
      </div>
    </div>
  );
};
export default CollapsibleForm;
