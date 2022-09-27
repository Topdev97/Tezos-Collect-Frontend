import CollapsibleForm from "./CollapsibleForm";

const Filter = () => {
  const advancedFilters = [
    {
      label: "Letters",
      options: ["Yes", "No"],
    },
    {
      label: "Numbers",
      options: ["Yes", "No"],
    },
    {
      label: "Palindromes",
      options: ["Yes", "No"],
    },
    {
      label: "Pre-Punk",
      options: ["Yes", "No"],
    },
  ];
  return (
    <div className="flex flex-col p-4 bg-componentBg row-span-3 gap-5">
      <div className="flex items-center border-b border-b-inputBorder pb-4">
        <span className="size-1">Filter</span>
        <span className="ml-auto text-tezWarn">Reset Filter</span>
      </div>
      <div className="flex cursor-pointer">
        <label htmlFor="listed">Listed</label>
        <input className="ml-auto" id="listed" type="checkbox" />
      </div>
      <div className="flex flex-col">
        <span>Show</span>
        <select className="bg-tezDarkBg border-inputBorder">
          <option>Registered</option>
        </select>
      </div>
      <div className="flex flex-col">
        <span>Results</span>
        <select className="bg-tezDarkBg border-inputBorder">
          <option>40</option>
        </select>
      </div>
      <div className="flex flex-col">
        <CollapsibleForm
          heading="Start/End With"
          element={
            <div className="py-4 flex flex-col gap-2">
              <input
                className="bg-tezDarkBg border-inputBorder"
                placeholder="Start with"
              />
              <input
                className="bg-tezDarkBg border-inputBorder"
                placeholder="End with"
              />
            </div>
          }
        />
        <CollapsibleForm
          heading="Length"
          element={
            <div className="py-4 flex flex-col gap-2">
              <input
                className="bg-tezDarkBg border-inputBorder"
                placeholder="Min length"
              />
              <input
                className="bg-tezDarkBg border-inputBorder"
                placeholder="Max length"
              />
            </div>
          }
        />
        <CollapsibleForm
          heading="Price"
          element={
            <div className="py-4 flex flex-col gap-2">
              <input
                className="bg-tezDarkBg border-inputBorder"
                placeholder="Min price tez"
              />
              <input
                className="bg-tezDarkBg border-inputBorder"
                placeholder="Max price tez"
              />
            </div>
          }
        />
        <CollapsibleForm
          heading="Advanced"
          element={
            <div className="py-4 flex flex-col gap-2">
              {advancedFilters.map((type, index) => {
                return (
                  <div className="flex flex-col" key={index}>
                    <span>{type.label}</span>
                    <select className="bg-tezDarkBg border-inputBorder">
                      {type.options.map((option, optionIndex) => (
                        <option key={optionIndex}>{option}</option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          }
        />

        <button className="tezGr-button py-3 font-semibold my-2">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
