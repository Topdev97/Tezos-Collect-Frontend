import { useEffect, useState } from "react";

const DelayedInput = (props: any) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (props.onChange) props.onChange(query);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <input
      {...props}
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
};
export default DelayedInput;
