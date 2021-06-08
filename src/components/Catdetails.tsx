import React, {useState, useEffect} from 'react';
// import { useParams } from "react-router-dom";
import axios from 'axios'
import Masonry from 'react-masonry-css';
import Catlist from './Catlist';
import generateRandomString from '../utils/generateRandomString';

interface Catdetails {
    catName: string;
}

let cat: any[] = [];

const Catdetails = (catName: any) => {
    // const [cat, setCats] = useState('');   
    const [subcat, setSubcat] = useState('');
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`https://cat.ceo/api/breed/${catName.catName}/images`)
            .then(res => {
                console.log(res.data.message);
                res.data.message.slice(0,12).map( (d: string, index: number) => { 
                    console.log(`d = ${d}`)
                    return res.data.message.map( (d: string) => { return cat.push(<img key={generateRandomString()} alt={d} src={d} />)});
                });
            })
            .catch((err) => {
                setError(err.message);
                setLoad(true);
            });
    }, [catName.catName]);

    useEffect(() => {
        axios.get(`https://cat.ceo/api/breed/${catName.catName}/list`)
            .then(res => {
                console.log(res.data.message)
                setSubcat(res.data.message.map( (d: string, index: number) => { 
                    return cat.push(<div 
                        key={generateRandomString()}>{d}
                    </div>)}));
            })
            .catch((err) => {
                setError(err.message);
                setLoad(true);
            });
    }, [catName.catName]);

    const handleRefresh = () => {
        axios.get(`https://cat.ceo/api/breed/${catName.catName}/images`)
            .then(res => {
                res.data.message.map( (d: string, index: number) => {
                    return cat.push(<img key={generateRandomString()} alt={d} src={d} />)});
            })
            .catch((err) => {
                setError(err.message);
                setLoad(true);
            });
    }
return(
    <div>
        {load && <div>loading.....</div>}
        <p>Cat details :  <b>{catName.catName}</b></p> 
       <p>SubCats: <span>{subcat}</span></p>
        <Masonry
            breakpointCols={4}
            className="cat-masonry-grid"
            columnClassName="cat-masonry-grid_column">
                {cat} 
        </Masonry>
        <button onClick={handleRefresh}>Refresh</button>
    </div>
)}

export default Catdetails;
