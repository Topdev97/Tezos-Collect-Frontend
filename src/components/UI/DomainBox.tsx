import { NavLink } from "react-router-dom";

const DomainBox = ({ name }: { name: string }) => {
  return <NavLink to={{ pathname: `/domain/${name}` }}>{name}.tez</NavLink>;
};

export default DomainBox;
