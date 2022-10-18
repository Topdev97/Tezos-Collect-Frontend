import { beautifyAddress } from "helper/formatters";

const AddressBox = ({ address }: { address: string }) => {
  return (
    <a
      href={`https://tzkt.io/${address}`}
      className="address-gr-br-box p-2"
      target="_blank"
    >
      {beautifyAddress(address)}
    </a>
  );
};

export default AddressBox;
