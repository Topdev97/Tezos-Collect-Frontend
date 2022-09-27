import { useEffect, useRef, useState } from "react";

const HoverMenu = (props: {
  options: any[];
  icon: any;
  text: string | undefined;
}) => {
  const { options, icon, text } = props;
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      className="relative cursor-pointer font-medium "
      onClick={() => {
        setDropdown((dropdown) => !dropdown);
      }}
      ref={ref}
    >
      <div
        className={`flex justify-between items-center w-full input border rounded-full p-2 duration-150 ${
          dropdown ? "border-white" : "border-grayText"
        }`}
      >
        {icon}
        {text}
      </div>
      {dropdown && (
        <div className="absolute right-0 top-12 backdrop-blur-md z-10 animation-fade-in rounded-lg overflow-hidden">
          {options.map(
            (el: any, index: number) =>
              el && (
                <div
                  key={index}
                  className="p-4 pr-8 flex gap-2 border-b border-kadComponentBorder last:border-0 items-center bg-tezDarkBg hover:bg-white/5 duration-50"
                  onClick={() => {
                    el.handler && el.handler(el);
                  }}
                >
                  {el.icon}
                  <span className="whitespace-nowrap">{el.text}</span>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};
export default HoverMenu;
