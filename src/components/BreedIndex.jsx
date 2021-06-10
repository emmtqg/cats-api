import React, { useState, useEffect, useCallback } from 'react'
// import useFetch from "../hooks/useFetch";
// import { Breed } from '../typings-custom/api';
import { Spin } from 'antd';
import BreedList from './BreedList';

const Index = () => {
    const [breeds, setBreeds] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    
    const [loaded, setLoaded] = useState(false);
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    // const headers = { 'x-api-key': `${process.env.REACT_APP_API_KEY}` }
    // const url = `${process.env.REACT_APP_API_BREED_URL}`;
    const test_url = `./assets/data/breeds.json`;
    const test_headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    /**
     * getData implement with useCallback to
     */
    const getData = useCallback(async () => {
      const response = await fetch(test_url, { test_headers });
      const responseJson = await response.json();
      setBreeds(responseJson)
 
    }, [test_url, test_headers]);
  
    useEffect(() => {
      if (!loaded) { 
        const fetchData = async () => {
          setIsError(false);
          setIsLoading(true);
  
          try {
            getData();
            setLoaded(true);
            console.log('setBreeds');
            
          } catch (error) {
            setIsError(true);
            setErrorMessage(JSON.stringify(error));
          }
    
          setIsLoading(false);
        };

        fetchData().then(() => setLoaded(true));
      }
    }, [loaded, getData])

    return (
        <>
          {isLoading && <div className="spinner"><Spin size="large" /></div>}

          {isError && 
            <p style={{color:'red'}}>Breed List: Error in herding the cats: API call went wrong - <b>{errorMessage}</b></p>}

          <BreedList breeds={breeds} />
        </>
    )
}

export default Index;
