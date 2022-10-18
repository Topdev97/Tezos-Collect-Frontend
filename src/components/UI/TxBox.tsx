import { beautifyAddress } from "helper/formatters";

const TxBox = ({ tx }: { tx: string }) => {
  return (
    <a
      href={`https://tzkt.io/${tx}`}
      className="p-2 hover:opacity-80"
      target="_blank"
    >
      {beautifyAddress(tx)}
    </a>
  );
};

export default TxBox;
