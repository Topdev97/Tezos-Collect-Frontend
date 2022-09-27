import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = (props: {
  currentPage: number;
  pageSize: number;
  visibleNumber: number;
  onPageChange: Function;
}) => {
  const { currentPage, pageSize, visibleNumber, onPageChange } = props;
  const visibleArray = Array.from(Array(visibleNumber).keys())
    .map((item) => item + currentPage - ((currentPage - 1) % visibleNumber))
    .filter((item) => item <= pageSize);
  return (
    <div className="flex gap-3 items-center">
      <button
        className="tezGr-button p-2"
        onClick={() => onPageChange(Math.max(1, currentPage - 5))}
      >
        <FiChevronLeft size={20} />
      </button>
      {visibleArray.map((pageNo) => {
        return (
          <button
            key={pageNo}
            onClick={() => onPageChange(pageNo)}
            className={`${
              pageNo === currentPage ? "bg-tezGr" : "hover:bg-tezGr"
            } button w-10 h-10 p-0`}
          >
            {pageNo}
          </button>
        );
      })}
      <button
        className="tezGr-button p-2"
        onClick={() => onPageChange(Math.min(pageSize, currentPage + 5))}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};
export default Pagination;
