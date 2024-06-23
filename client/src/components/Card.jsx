import React from "react";
import '../css/card.css'

const Card = (props) => {

    const handleClick = () => {
        // Sample card information
        const cardInfo = {
            title: props.title,
            description: 'This is a sample card.',

        };

        props.onCardClick(cardInfo);
        //console.log(cardInfo); // Call the callback function with card information
    };


    return (
        <div className="card" onClick={handleClick}>
            <img src={props.imageurl} alt={props.title} />
            <div className="card-content">
                <span>{props.title}</span>
            </div>
        </div>
    );
}

export default Card

