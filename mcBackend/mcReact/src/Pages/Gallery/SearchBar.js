import './SearchBar.css';

const SearchBar = () => {


  return (
    <div className="searchbar">
        <label htmlFor="header-search">
            <span className="hidden">Search Here </span>
        </label>
        <input
             type="text"
             id="header-search"
             placeholder="Search Right Here"
             name="s"
        />
        <button type="submit">Search</button>

     
    </div>
  );
}

export default SearchBar;