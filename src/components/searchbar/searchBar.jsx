const SearchBar = () => {
  return (
    <>
      <div className="autocomplete">
        <input
          type="text"
          className={`search-box`}
          placeholder="Search by name"
        />
        <div className="autocomplete-items">
          {/* <div>helo</div>
          <div>hi</div> */}
        </div>
      </div>
    </>
  );
};

export { SearchBar };
