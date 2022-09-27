import { TYPE_VIEWMODE } from "helper/interfaces";
// import { IoListOutline } from "react-icons/io";
import { MdWindow, MdOutlineFormatListBulleted } from "react-icons/md";
import { RiListUnordered } from "react-icons/ri";
import { BiTable } from "react-icons/bi";

const ViewModeControl = (props: {
  viewMode: TYPE_VIEWMODE;
  setViewMode: any;
}) => {
  const { viewMode, setViewMode } = props;
  return (
    <div>
      {viewModes.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => setViewMode(item.mode)}
            className={`size-1 hover:text-tezGrSt ${
              viewMode === item.mode ? "text-tezGrSt" : ""
            }`}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
};
export default ViewModeControl;

const viewModes: { icon: any; mode: TYPE_VIEWMODE }[] = [
  {
    icon: <RiListUnordered />,
    mode: "VM_LIST",
  },
  {
    icon: <MdWindow />,
    mode: "VM_COMPACT",
  },
  {
    icon: <BiTable />,
    mode: "VM_MASS",
  },
];
