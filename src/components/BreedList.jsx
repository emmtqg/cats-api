// @ts-nocheck
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Divider } from 'antd';

import BreedFormFilter from './BreedFormFilter';
import BreedCard from './BreedCard'
import backgroundImage from '../assets/images/a5121e34-96b3-4a70-8227-040c51e64fae_cat.jpg';
import CatBreedFever from './CatBreedFever';

const BreedList = ({ breeds }) => {

  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedBreedId, setSelectedBreedId] = useState('');
  const [searchResults, setSearchResults] = useState(breeds);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOptionChange = (chosenOption) => {
    const [chosenBreedId, chosenBreed] = chosenOption.split('|');
    console.log(`handle option change=> ${chosenBreed}`);
    setSelectedBreed(chosenBreed);
    setSelectedBreedId(chosenBreedId);
    setSearchQuery(chosenBreed);
  };

  const handleCardClick = (chosenBreed, chosenBreedId) => {
    console.log(`handle car click=> ${chosenBreed}`);
    setSelectedBreed(chosenBreed);
    setSelectedBreedId(chosenBreedId);
    setSearchQuery(chosenBreed);
  };

  useEffect(() => {
    let results = breeds;
    if (searchQuery && searchQuery.trim().length > 0) {
      const searchTerm = searchQuery.toLowerCase();

      results = breeds.filter(breed => {
        return breed.name.toLowerCase().includes(searchTerm)
      });
    }

    setSearchResults(results);

  }, [breeds, searchQuery]);

  return (
    <>
      <header>
        <section 
          className="leading"
          style={{background: `url(${backgroundImage}) center / cover #333 no-repeat`}}
        >
          <h1 className="leading-bigtext">Cats!</h1>
          <p className="leading-text">Let's look at cute cats! This API comes to you courtesy of <a href="https://api.thecatapi.com/" alt="The cat api URL.">api.thecatapi.com</a></p>
        </section>

        <section className="filters">
          {searchResults ?
            <BreedFormFilter
              breeds={searchResults}
              handleChange={handleOptionChange}
              onChangeSearchQuery={setSearchQuery}
            />
          : <div>BreedList: No Breeds Found!</div>} 
        </section>       
      </header>

      <main>
        {(!searchResults && !selectedBreedId) &&<div>No cats herded...</div>} 

        {selectedBreedId && 
          <CatBreedFever 
            catBreed={selectedBreed} 
            catBreedId={selectedBreedId}
            setSelectedBreedId={setSelectedBreedId}
            setSearchQuery={setSearchQuery}
          />}

        {!selectedBreedId && 
          <section className="breed-showcase">
            {Object.keys(searchResults).map((breedKey) => 
              <BreedCard 
                key={searchResults[breedKey].id} 
                // onClick={onClick}
                breed={searchResults[breedKey]}
                onCLickHandler={handleCardClick}
              />
            )}
          </section>
        }

        {!selectedBreedId &&
          <section className="pagination">
            <p>Total cats: {searchResults.length}</p>
          </section>
        }

      </main>
      <Divider />
      <footer
        style={{background: `url(${backgroundImage}) center #333 no-repeat`}}
      >
        <p>2021 ~ Elizabeth McMahon for 3Play Media</p>
      </footer>
    </>
  );
}

export default BreedList;
