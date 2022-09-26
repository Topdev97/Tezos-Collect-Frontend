const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-playfair leading-snug">
        find your <strong className="gradient-text">web3</strong>
        <br /> identity
      </h1>
      <span className="landing-sub-text">
        Use names like alice.tez instead of addresses like
        <br />
        tz1VBLpuDKMoJuHRLZ4HrCgRuiLpEr7zZx2E
      </span>
      <div className="flex gap-8">
        <div>
          <span className="block">Search Domain</span>
          <input
            type="text"
            placeholder="Type your perfect domain"
            className="landing-search-input"
          ></input>
        </div>
        <div>
          <select
            id="states"
            className="dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          >
            <option>Choose a state</option>
            <option value="CA">California</option>
            <option value="TX">Texas</option>
            <option value="WH">Washinghton</option>
            <option value="FL">Florida</option>
            <option value="VG">Virginia</option>
            <option value="GE">Georgia</option>
            <option value="MI">Michigan</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Home;
