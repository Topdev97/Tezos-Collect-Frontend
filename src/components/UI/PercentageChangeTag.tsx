const PercentageChangeTag = ({ value }: { value: number }) => {
  return (
    <span
      className={`size-sm ${
        value >= 0 ? "text-tezSuccess" : "text-tezWarning"
      } font-normal`}
    >
      {value >= 0 ? `+${value.toFixed(2)}` : value.toFixed(2)}%
    </span>
  );
};
export default PercentageChangeTag;
