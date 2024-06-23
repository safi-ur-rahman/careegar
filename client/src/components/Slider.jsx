import React from 'react';
import SliderCards from './SliderCards';
import rimimage from '../configimgs/Rimone.jpg'
import stock from '../configimgs/gear.png'
import rim1 from '../configimgs/rim1.png'
import rim2 from '../configimgs/rim2.png'
import rim3 from '../configimgs/rim3.png'
import tail from '../configimgs/TailLight.jpg'
import { useEffect } from 'react';
import '../css/slider.css'

const Slider = (props) => {

    const taillights = [
        { imageurl: tail, name: 'Tail 1' },
        { imageurl: tail, name: 'Tail 2' },
        { imageurl: tail, name: 'Tail 3' },

    ];

    const wheels = [
        { imageurl: rim1, name: 'Rim 1' },
        { imageurl: rim2, name: 'Rim 2' },
        { imageurl: rim3, name: 'Rim 3' },

    ];

    const spoiler = [
        { imageurl: rimimage, name: 'Spoiler' }, 
    ];

    const bullbar = [
        { imageurl: rimimage, name: 'Bullbar' },
     

    ];

    const bumper = [
        { imageurl: rimimage, name: 'Bumper' },
     

    ];
    const handleCardClick = (info) => {

        props.selectedRim(info);
    }

    const selectArray = (partName) => {
        switch (partName) {
            case 'Wheels':
                return wheels;
            case 'TailLights':
                return taillights;
            case 'Spoiler':
                return spoiler;
            case 'Bullbar':
                return bullbar;
            case 'Bumper':
                return bumper;
            // Add cases for other parts as needed
            default:
                return [];
        }
    };

    const selectedArray = selectArray(props.selectedPart);

    return (
        <div className="slider-body">

            <SliderCards imageurl={stock} name={"Stock"} onCardClick={handleCardClick} />

            {selectedArray.map((part, index) => (
                <SliderCards key={index} imageurl={part.imageurl} name={part.name} onCardClick={handleCardClick} />
            ))}




        </div>
    );
};

export default Slider;