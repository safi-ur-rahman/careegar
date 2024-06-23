import React from 'react';
import '../css/slidercards.css'

const SliderCards = (props) => {

    const handleClick = () => {
        const id = props.name.toLowerCase().replace(/\s+/g, '') ;
        props.onCardClick(id);
    }

    return (
        <div className="slider-card" onClick={handleClick}>
            <img src={props.imageurl} alt={props.name} />
            <div className="card-content">
                <span>{props.name}</span>
            </div>
        </div>
    );
};

export default SliderCards;