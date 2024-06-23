import React, { useState } from 'react';
import '../css/colorpicker.css'
const ColorPicker = (props) => {
    const [color, setColor] = useState('#000000'); // Initial color black



    const handleColorChange = (e) => {
        setColor(e.target.value);
        props.currentColor(color);
    };

    const handleOptionChange = (option) => {
        console.log('Selected option:', option);
        // Add logic to handle the selected option
    };

    return (
        <div className="color-picker">

            <label htmlFor="colorPicker">Color:</label>
            <input
                type="color"
                id="colorPicker"
                value={color}
                onChange={handleColorChange}
            />

            <div className='color-type'>
                <label htmlFor="selectWrapOrPaint">Select:</label>
                <select
                    id="selectWrapOrPaint"
                    onChange={(e) => handleOptionChange(e.target.value)}
                >
                    <option value="wrap">Wrap</option>
                    <option value="paint">Paint</option>
                </select>
            </div>



        </div>
    );
};

export default ColorPicker;