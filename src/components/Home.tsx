import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useFetch from "../hooks/useFetch";
import Doglist from './Doglist'

const Home = () => {
    const [dogs, setDogs] = useState({})
    const [subdogs, setSubdogs] = useState([])

    const [cats, setCats] = useState({})
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(false)

    type CatData = {
      data?: Object | Response,
    }
    type JSONResponse = {
      catList?: Array<CatData>,
      errors?: Array<{message: string}>
    }

    const headers = { 'x-api-key': `${process.env.REACT_APP_API_KEY}` }

    const { data: response, isLoading, isError } = useFetch(
      `${process.env.REACT_APP_API_URL}`,
      headers,
      []
    );

    useEffect(() => {
      if (response.length) {
        setCats(response);
        // setDogs(res.data?.message);
                // setSubdogs(res.data?.message)
                // console.log(res.data?.message);
                 // setLoad(true);
      }
      else if (isLoading) {
        setLoad(isLoading);
      }
      else if (isError) {
        setError(isError);
      }
    }, [response, isLoading, isError]);

    return (
        <>
            {!load && <div>loading.....</div>}
            <p style={{color:'red'}}>{error && <div>LIST: Something went wrong - <b>{error}</b></div>}</p>
            {/* <Doglist dogs={dogs} subdogs={subdogs}/>           */}
        </>
    )
}

export default Home;
