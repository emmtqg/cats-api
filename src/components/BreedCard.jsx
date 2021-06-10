import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Card } from 'antd';
import StarRating from './StarRating'

const BreedCard = ({ breed, onCLickHandler }) => {
  const Meta = Card;
  // console.log(JSON.stringify(breed));
  
  if (!breed || breed.length === 0 || breed.image === undefined || breed.image?.url === undefined) {
    if (breed && !breed.image) {
      console.log(`${breed.name} as no image.`);
    }
  }

  return (  
    <Card
      style={{ width: 300 }}
      cover={
          <img
            alt={breed.name}
            onClick={() => { onCLickHandler(breed.name, breed.id) }}
            src={breed.image ? breed.image.url : 'https://http.cat/404'} 
            width={250}
          />
      }
    >
      <Meta
        title={breed.name}
        description={breed.description}
      >
        <p style={{ textAlign: 'left' }}>{breed.description}</p>
        <p style={{ textAlign: 'left' }}><b>Temperament </b>{breed.temperament}</p>
      </Meta>
      <div>Energy Level<StarRating  disabled defaultValue={breed.energy_level} /></div>
      <div>Affection Level<StarRating disabled defaultValue={breed.affection_level} /></div>
      <div>Intelligence<StarRating disabled defaultValue={breed.intelligence} /></div>
      <div>Stranger Friendly<StarRating disabled defaultValue={breed.stranger_friendly} /></div>
      {breed.hairless === true && <span>Hairless&nbsp;&nbsp;</span>}
      {breed.hypoallergenic === true && <span>Hypoallergenic</span>}
      <p><a href={breed.wikipedia_url}>{breed.name} on the Wikipedia</a></p>
    </Card>              
  );
}

export default BreedCard;
