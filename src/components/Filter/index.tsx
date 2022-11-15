import { domainMarketFilters } from "helper/constants";
import {
  I_DOMAIN_SEARCH_VALUE,
  TYPE_MARKET_ADVANCED_FILTER_VALUE,
} from "helper/interfaces";
import { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import CollapsibleForm from "./CollapsibleForm";

interface IPropsDomainFilter {
  updateFilter: any;
}

const Filter = (props: IPropsDomainFilter) => {
  const { updateFilter } = props;

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const listedRef = useRef<HTMLInputElement>(null);
  const showRef = useRef<HTMLSelectElement>(null);
  const pageSizeRef = useRef<HTMLSelectElement>(null);
  const startWithRef = useRef<HTMLInputElement>(null);
  const endWithRef = useRef<HTMLInputElement>(null);
  const minLengthRef = useRef<HTMLInputElement>(null);
  const maxLengthRef = useRef<HTMLInputElement>(null);
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  const onResetFilter = () => {
    if (listedRef?.current) listedRef.current.checked = true;
    if (showRef?.current) showRef.current.value = "SHOW_ALL";
    if (pageSizeRef?.current) pageSizeRef.current.value = "40";
    if (startWithRef?.current) startWithRef.current.value = "";
    if (endWithRef?.current) endWithRef.current.value = "";
    if (minLengthRef?.current) minLengthRef.current.value = "";
    if (maxLengthRef?.current) maxLengthRef.current.value = "";
    if (minPriceRef?.current) minPriceRef.current.value = "";
    if (maxPriceRef?.current) maxPriceRef.current.value = "";
  };
  const onApplyFilter = () => {
    const _searchOptions: I_DOMAIN_SEARCH_VALUE = {
      domainListed: listedRef.current?.checked,
      // @ts-ignore
      showType: showRef.current?.value,
      pageSize: parseInt(pageSizeRef.current?.value || "40"),
      startWith: startWithRef.current?.value,
      endWith: endWithRef.current?.value,
      minLength: parseInt(minLengthRef.current?.value || "0"),
      maxLength: parseInt(maxLengthRef.current?.value || "0"),
      minPrice: parseFloat(minPriceRef.current?.value || "0"),
      maxPrice: parseFloat(maxPriceRef.current?.value || "0"),
    };

    updateFilter(
      { ..._searchOptions, offset: 0 },
      advancedFilterValues.filter((item) => item !== "")
    );
  };

  const [advancedFilterValues, setAdvancedFilterValues] = useState<
    TYPE_MARKET_ADVANCED_FILTER_VALUE[]
  >(Array.from({ length: domainMarketFilters.length }, (_, i) => ""));

  const onChangeAdvancedFilter = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setAdvancedFilterValues((_advancedFilterValues) => {
      // @ts-ignore
      _advancedFilterValues[index] = e.target.value;
      return _advancedFilterValues;
    });
  };
  return (
    <div className="flex flex-col p-4 bg-componentBg rounded-lg row-auto gap-5 w-full md:w-80">
      <div className="flex items-center border-b border-b-inputBorder pb-4">
        <FiChevronDown
          onClick={() => setCollapsed(!collapsed)}
          size={20}
          className={`block md:hidden mr-1 duration-150 ${
            collapsed ? "-scale-y-100" : ""
          }`}
        />
        <span className="size-1">Filter</span>
        <button
          className="ml-auto text-tezWarning hover:text-tezSecSt"
          onClick={onResetFilter}
        >
          Reset Filter
        </button>
      </div>
      <div
        className={`flex flex-col gap-5 overflow-y-scroll duration-300 ${
          collapsed ? "max-h-[0px]" : "max-h-[1500px]"
        }`}
      >
        <div className="flex cursor-pointer">
          <label htmlFor="listed">Listed</label>
          <input
            ref={listedRef}
            className="ml-auto"
            id="listed"
            type="checkbox"
            defaultChecked={true}
          />
        </div>
        <div className="flex flex-col">
          <span>Show</span>
          <select ref={showRef} className="bg-tezDarkBg border-inputBorder">
            <option value="SHOW_ALL">All</option>
            <option value="SHOW_REGISTERED">Registered</option>
            <option value="SHOW_AVAILABLE">Available</option>
            <option value="SHOW_FEATURED">Featured</option>
          </select>
        </div>
        <div className="flex flex-col">
          <span>Results</span>
          <select ref={pageSizeRef} className="bg-tezDarkBg border-inputBorder">
            <option value={40}>40</option>
            <option value={60}>60</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex flex-col">
          <CollapsibleForm
            heading="Start/End With"
            element={
              <div className="py-4 flex flex-col gap-2">
                <input
                  ref={startWithRef}
                  className="bg-tezDarkBg border-inputBorder"
                  placeholder="Start with"
                />
                <input
                  ref={endWithRef}
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
                  ref={minLengthRef}
                  className="bg-tezDarkBg border-inputBorder"
                  placeholder="Min length"
                />
                <input
                  ref={maxLengthRef}
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
                  ref={minPriceRef}
                  className="bg-tezDarkBg border-inputBorder"
                  placeholder="Min price ꜩ"
                />
                <input
                  ref={maxPriceRef}
                  className="bg-tezDarkBg border-inputBorder"
                  placeholder="Max price ꜩ"
                />
              </div>
            }
          />
          <CollapsibleForm
            heading="Advanced"
            element={
              <div className="py-4 flex flex-col gap-2">
                {domainMarketFilters.map((type, index) => {
                  return (
                    <div className="flex flex-col" key={index}>
                      <span>{type.label}</span>
                      <select
                        className="bg-tezDarkBg border-inputBorder"
                        onChange={(e) => onChangeAdvancedFilter(e, index)}
                      >
                        {type.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            }
          />

          <button
            className="tezGr-button py-3 font-semibold my-2"
            onClick={onApplyFilter}
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
