import LinkWithSearchParams from "components/LinkWithSearchParams";
import { beautifyAddress } from "helper/formatters";

const AddressBox = ({ address }: { address: string }) => {
  return (
    <LinkWithSearchParams
      to={{ pathname: `/profile/${address}` }}
      className="address-gr-br-box p-2"
    >
      {beautifyAddress(address)}
    </LinkWithSearchParams>
  );
};

export default AddressBox;
