const SearchBar = ({
  status: {
    mobileView: { isSearchBarHidden },
    setmobileView,
  },
}) => {
  return (
    <>
      <div className="autocomplete">
        <input
          type="text"
          className={`search-box`}
          placeholder="Search by name"
        />
        <div className="autocomplete-items"></div>
      </div>
    </>
  );
};

export { SearchBar };
