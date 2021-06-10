import React, { useState, useRef } from 'react';

import './StarRating.css';

const StarRating = (props) => {
  const [currentRating, setCurrentRating] = useState(props.defaultValue);

  // imperatively reference 
  const starRef = useRef(null);

  // user interaction
  const isDisabled = (props.disabled === undefined)? false : true ;

  const hoverHandler = ev => {
    const stars = ev.target.parentElement.getElementsByClassName('star');
    const hoverValue = ev.target.dataset.value;
    Array.from(stars).forEach(star => {
      star.style.color = hoverValue >= star.dataset.value ? 'yellow' : 'gray';
    });
  }

  const setRating = ev => {
    const stars = starRef.current.getElementsByClassName('star');
    Array.from(stars).forEach(star => {
      star.style.color =
        currentRating >= star.dataset.value ? 'yellow' : 'gray';
    });
  };

  const starClickHandler = ev => {
    let rating = ev.target.dataset.value;
    setCurrentRating({ currentRating: rating }); // set state so the rating stays highlighted
    if(props.onClick){
      props.onClick(rating); // emit the event up to the parent
    }
  };

  return (
    <div
      className="rating"
      ref={starRef}
      data-rating={currentRating}
      onMouseOut={isDisabled? null : setRating}
    >
      {[...Array(currentRating).keys()].map(n => {
        return (
          <span
            className="star"
            key={n+1}
            data-value={n+1}
            onMouseOver={isDisabled?null : hoverHandler}
            onClick={isDisabled? null : starClickHandler}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
