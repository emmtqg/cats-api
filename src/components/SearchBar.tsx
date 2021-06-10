import * as React from "react";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export interface ISearchProps {
  onChangeSearchQuery: (searchQuery: string) => void;
  placeholderText: string;
}

export default function SearchBar(props: ISearchProps) {
  const placeholderText = props.placeholderText;
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const { onChangeSearchQuery } = props;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      onChangeSearchQuery(debouncedSearchQuery);
      console.log(`debouncedSearchQuery ${debouncedSearchQuery}`);
      onChangeSearchQuery(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onChangeSearchQuery]);

  return (
    <>  
      <label htmlFor="search">Search <span role="img" aria-label="Cat icon">🐱</span></label>
      <input
        id="search"
        className="form-control"
        type="search"
        placeholder={placeholderText}
        aria-label="Search"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </>
  );
}