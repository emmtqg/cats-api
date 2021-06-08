import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Select } from 'antd';
import Catdetails from './Catdetails';

export interface Cats {
  catName: string [];
}

export interface CatListProps {
    props: any;
}

const Catlist = (props:any) => {
  let cats = props.cats as Array<string>;

    const [cat, setCat] = useState<string | null>(null);
    
    const [searchResults, setSearchResults] = React.useState<string []>([]);
    const [searchTerm, setSearchTerm] = React.useState("");
  
    const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
    };

    const onClick = (e: any) => {
      const elements = document.getElementsByClassName('active');
      Array.prototype.map.call(elements,
        element => { element.className = '' });
      e.currentTarget.className = 'active';
      setCat(e.currentTarget.innerText)
    }

    React.useEffect(() => {
      const results = Array.prototype.filter.call(cats, cat =>
        cat.toLowerCase().includes(searchTerm)
      );

      setSearchResults(results);
    }, [searchTerm, cats]);

    const onEnter = () => {
    //   setFilteredCats(cats.filter(cat =>
    //     cat.toLowerCase().includes(query)
    //   ));
    }

    const onChange = () => {}

    return (
      <>
        <main>
          <header>
            <h1>Cats!</h1>
            <form>
            {/* <SearchField 
              placeholder='Search item'
              onChange={onChange}
              onEnter={onEnter}
            /> */}
            <div className="react-search-field " >
              <input 
                className="react-search-field-input" placeholder="Search item" type="text" 
                value="" 
                onChange={handleChange}>
                <button     className="react-search-field-button" type="button" />
              </input>
            </div>
            </form>
          </header>

          <div className='wrapper'>
            {Object.keys(searchResults).slice(0, 12).map((cat) => 
              <button 
                id={cat}
                key={cat} 
                onClick={onClick}>
                  {cat}                  
              </button>
            )}
          </div>
          <h3>Results:</h3>
      {cats.length === 0 && <p>No results found!</p>} 
        {cat && <Catdetails catName={cat} />}
        </main>
      </>
    )
}

export default Catlist;
