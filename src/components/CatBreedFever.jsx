import React, { useState, useEffect, useCallback } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { Spin } from 'antd';

/**
 * @public CatBreedFever: Given a breed name and id, will perform a fetch of random images of cats of that breed.
 * @param {string} catBreed - currently selected breed
 * @param {string} catBreedId - corresponding selected id 
 * @param {() => void} setSelectedBreedId - resets the BreedList (parent's) current selection
 * @param {() => void} setSearchQuery - resets BreedList (parent's) current search
 * @returns A lovely masonary display of all the random 
 * breed images
 */
const CatBreedFever = ({ 
  catBreed, 
  catBreedId, 
  setSelectedBreedId, 
  setSearchQuery }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [cats, setCats] = useState([]);

  const headers = { 'x-api-key': `${process.env.REACT_APP_API_KEY}` }
  const url = `${process.env.REACT_APP_API_IMAGES_BY_BREED_URL}${catBreedId}`;
  // const test_url = `./assets/data/random_by_breed.json`;
  // const test_headers = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  // };

  const getData = useCallback(async () => {
    const response = await fetch(url, { headers });
    const responseJson = await response.json();
    const catArray = [];
    responseJson.map(cat => { return catArray.push(<img className="mason-cat" key={cat.id} alt={`A random ${catBreed}`} src={cat.url} />)});
    setCats(catArray);

  }, [url, headers, catBreed]);

  useEffect(() => {
    if (!loaded) { 
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          getData();
          setLoaded(true);
          console.log('setBreed Image');
          
        } catch (error) {
          setIsError(true);
          setErrorMessage(JSON.stringify(error));
        }
  
        setIsLoading(false);
      };

      fetchData().then(() => setLoaded(true))
    }
  }, [getData, loaded])

  const handleRefresh = () => {
    setCats([])
    setSelectedBreedId(null);
    setSearchQuery('');
  }

  return(
    <div>
      {isLoading && <div className="spinner"><Spin size="large" /></div>}

      {isError && <p style={{color:'red'}}><div>Breed List: Error in herding the cats: API call went wrong - <b>{errorMessage}</b></div></p>}

      <h2>Cat Breed :  <b>{catBreed}</b></h2> 
      
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
      >
        <Masonry>
            {cats} 
        </Masonry>
      </ResponsiveMasonry>

      <button onClick={handleRefresh}>Clear</button>
    </div>
  )
}

export default CatBreedFever;
