import React, { useState } from 'react';
import cardImg from '../configimgs/car.png'
import '../css/sidebar.css'
import Card from './Card.jsx'


const Sidebar = (props) => {


    const handleCardClick = (info) => {

        props.selectedPartInfo(info);
        //console.log(info);
        props.onClose();

    };

    return (
        <div className={`sidebar ${props.visible ? 'visible' : ''}`}>
            <button className="close-btn" onClick={props.onClose}>
                &times;
            </button>
            <h2>
                Parts
            </h2>
            <div className="sidebar-body">
                <Card imageurl={cardImg} title="Body" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="Wheels" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="TailLights" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="Headlights" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="Mirrors" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="Bumper" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="Spoiler" onCardClick={handleCardClick} > </Card>
                <Card imageurl={cardImg} title="Bullbar" onCardClick={handleCardClick} > </Card>
            </div>
        </div>
    );
};

export default Sidebar;