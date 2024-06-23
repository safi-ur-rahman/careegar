import React, { useState, useEffect, useRef, useCallback } from "react"
import './Configurator.css'
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import axios from 'axios';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Fortuner from './carModels/fortuner.jsx';
import WagonR from './carModels/wagonR'
import Rim1 from './carModels/rim1'
import Rim2 from './carModels/rim2'
import Rim3 from './carModels/rim3'
import Spoiler1 from './carModels/spoiler1.jsx'
import Bumper1 from './carModels/bumper1.jsx'
import Bullbar1 from './carModels/bullbar1.jsx'
import Revo from './carModels/Revo'
import Corolla from './carModels/Corolla.jsx'
import S63 from './carModels/s63.jsx'
import Sidebar from './components/SideBar.jsx'
import ColorPicker from './components/ColorPicker.jsx';
import Slider from './components/Slider.jsx';
import { useParams } from 'react-router-dom';

function Configurator() {

  const { car } = useParams();
  const groupRef = useRef();
  const screenshotRef = useRef();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedPart, setSelectedPart] = useState({ title: 'Wheels', description: 'initialcard' });
  const [rim, setrim] = useState();
  const [stock, setStock] = useState(true);
  const [spoiler, setspoiler] = useState(false);
  const [bumper, setbumper] = useState(false);
  const [bullbar, setbullbar] = useState(false);
  const [data, setData] = useState({});
  const [selectedCar, setSelectedCar] = useState(car);
  const [selectedColor, setSelectedColor] = useState('#00FFFFFF');
  const [selectedColorMaterial, setSelectedColorMaterial] = useState({});
  const [carHeight, setCarHeight] = useState(0);

  useEffect(() => {
    if (selectedCar) {
      axios.get(`${window.location.origin}/carModels/models.json`)
        .then((response) => {
          console.log(selectedCar)
          setData(response.data.cars[selectedCar]);
          //setSelectedCar(response.data.cars[])
        })
        .catch((error) => {
          console.error('Error loading car components:', error);
        });
    }
  }, []);

  function downloadScreenshot() {
    const image = screenshotRef.current.toDataURL('image/png')
    const a = document.createElement('a')
    a.setAttribute('download', 'screenshot.png')
    a.setAttribute('href', image)
    a.click()
  }

  const colorTypes = {
    plain: {
      material: new THREE.MeshPhysicalMaterial({
        roughness: 0.4,
        metalness: 0
      })
    },
    matte: {
      material: new THREE.MeshPhysicalMaterial({
        roughness: 0.4,
        metalness: 0
      })
    },
    metallic: {
      material: new THREE.MeshPhysicalMaterial(),
      roughness: 0.3,
      metalness: 0.6
    }
  };

  const GarageModel = () => {
    const { scene } = useGLTF(`${window.location.origin}/Garage/car_garage2.glb`);
    return <primitive object={scene} scale={[11, 11, 11]} />;
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleColor = (color) => {
    setSelectedColor(color);
  };

  const selectedPartInfo = (info) => {
    setSelectedPart(info);
  };


  const selectedRim = (info) => {
    setrim(info);

    if (info === 'stock') {
      setStock(true);
    }

    else if (info === 'spoiler') {

      setspoiler(!spoiler);
    }
    else if (info === 'bumper') {
      setStock(false);
      setbumper(!bumper);
    }

    else if (info === 'bullbar') {

      setbullbar(!bullbar);
    }

    else if (groupRef && groupRef.current) {
      setStock(false);
      const parentGroup = groupRef.current;
      parentGroup.children.forEach(child => {
        if (child.isGroup)
          child.visible = false;
        //console.log(child);
      });
      const obj = groupRef.current.getObjectByName(info);
      //console.log(obj);

      obj.visible = true;
      //obj.material.color.set(selectedColor);
    };
  }
  const rimComponents = {
    rim1: Rim1,
    rim2: Rim2,
    rim3: Rim3
  };
  const spoilerComponents = {
    spoiler1: Spoiler1
  };
  const bumperComponents = {
    bumper1: Bumper1
  };
  const bullbarComponents = {
    bullbar1: Bullbar1
  };

  const airUp = () => {
    const val = data.maxUp;
    const inc = data.heightInc;
    if (carHeight < val) {
      setCarHeight(carHeight + inc)
    }
    //console.log(carHeight)
  };

  const airDown = () => {
    const val = data.maxDown;
    const inc = data.heightInc;
    if (carHeight > val) {
      setCarHeight(carHeight - inc)
    }
    //console.log(carHeight)
  };


  return (
    <>

      <div className={`app ${sidebarVisible ? 'blurred' : ''}`}>

        <div className='main-page'>
          <div className='upper-section'>

            <div className='content'>
              <div className="toggle-sidebar-btn">
                <button onClick={toggleSidebar}>
                  {sidebarVisible ? 'Close Sidebar' : 'Select Part'}
                </button>
              </div>

              <div className='colorTypeContainer'>

                <button onClick={() => setSelectedColorMaterial(colorTypes.matte)}>
                  <span>Secondary Color</span>
                </button>

              </div>

              <div className='colorsContainer'>
  <div onClick={() => setSelectedColor(0xff0000)} className='smallColorDot redShade'></div>
  <div onClick={() => setSelectedColor(0xffffff)} className='smallColorDot whiteShade'></div>
  <div onClick={() => setSelectedColor(0x000000)} className='smallColorDot blackShade'></div>
  <div onClick={() => setSelectedColor(0xfff08d)} className='smallColorDot yellowShade'></div>
  <div onClick={() => setSelectedColor(0x001133)} className='smallColorDot blueShade'></div>
  <div onClick={() => setSelectedColor(0xc0c0c0)} className='smallColorDot silverShade'></div>
</div>


              <ColorPicker currentColor={handleColor} className='colorPicker' />

              <div className="lower-btns">

                <div className="suspension">
                  <h3>Height:</h3>
                  <button class="cam-svg-button" onClick={() => airUp()}>
                    <svg fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330" xml:space="preserve">
                      <path id="XMLID_224_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
                    </svg>
                  </button>
                  <button class="cam-svg-button" onClick={() => airDown()}>
                    <svg fill="#000000" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330" xml:space="preserve">
                      <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                    </svg>

                  </button>
                </div>


                <div >
                  <button onClick={() => downloadScreenshot()} class="cam-svg-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="camera"><path d="M10 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8-3h-2.4a.888.888 0 0 1-.789-.57l-.621-1.861A.89.89 0 0 0 13.4 2H6.6c-.33 0-.686.256-.789.568L5.189 4.43A.889.889 0 0 1 4.4 5H2C.9 5 0 5.9 0 7v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 11a5 5 0 0 1-5-5 5 5 0 1 1 10 0 5 5 0 0 1-5 5zm7.5-7.8a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z"></path></svg>
                  </button>
                </div>



              </div>
            </div>

            <div className='model'>
              <Canvas
                camera={{ position: [10, 10, 25] }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
                ref={screenshotRef}
              >

                <GarageModel></GarageModel>

                <ambientLight intensity={2} />
                <directionalLight color="white" intensity={5} position={[0, 10, -5]} />
                <directionalLight color="white" intensity={1.4} position={[10, 0, 5]} />
                <directionalLight color="white" intensity={1.4} position={[-10, 0, 5]} />
                {selectedCar === 'fortuner' ? (
                  <Fortuner
                    updatecolor={selectedColor}
                    carHeight={carHeight}
                    colorMaterial={selectedColorMaterial}
                    selectedPart={selectedPart.title}
                    stock={stock}
                  />
                ) : selectedCar === 'wagonR' ? (
                  <WagonR
                    updatecolor={selectedColor}
                    carHeight={carHeight}
                    colorMaterial={selectedColorMaterial}
                    selectedPart={selectedPart.title}
                    stock={stock}
                  />
                ) : (
                  <S63
                    updatecolor={selectedColor}
                    carHeight={carHeight}
                    colorMaterial={selectedColorMaterial}
                    selectedPart={selectedPart.title}
                    stock={stock}
                  />
                )}

                <group ref={groupRef}>
                  {data.rimPositions && Object.keys(data.rimPositions).map((rimKey) => {
                    const RimComponent = rimComponents[rimKey];
                    return (
                      <group name={rimKey} key={rimKey} visible={false}>
                        {data.rimPositions[rimKey].map((rim, index) => (
                          <RimComponent
                            key={index}
                            position={rim.position}
                            size={rim.size}
                            rot={rim.rot}
                            updatecolor={selectedColor}
                          />
                        ))}
                      </group>
                    );
                  })}

                  {data.spoilers && Object.keys(data.spoilers).map((spoilerKey) => {
                    const SpoilerComponent = spoilerComponents[spoilerKey];
                    return (
                      <group name={spoilerKey} key={spoilerKey} visible={spoiler}>
                        {data.spoilers[spoilerKey].map((spoiler, index) => (
                          <SpoilerComponent key={index} position={spoiler.position} />
                        ))}
                      </group>
                    );
                  })}
                  {data.bullbar && Object.keys(data.bullbar).map((bullbarKey) => {
                    const BullbarComponent = bullbarComponents[bullbarKey];
                    return (
                      <group name={bullbarKey} key={bullbarKey} visible={bullbar}>
                        {data.bullbar[bullbarKey].map((bullbar, index) => (
                          <BullbarComponent key={index} position={bullbar.position} />
                        ))}
                      </group>
                    );
                  })}
                  {data.bumpers && Object.keys(data.bumpers).map((bumpersKey) => {
                    const BumperComponent = bumperComponents[bumpersKey];
                    return (
                      <group name={bumpersKey} key={bumpersKey} visible={bumper}>
                        {data.bumpers[bumpersKey].map((bumper, index) => (
                          <BumperComponent updatecolor={selectedColor} key={index} size={bumper.size} position={bumper.position} />
                        ))}
                      </group>
                    );
                  })}
                </group>



                <OrbitControls />
              </Canvas>
            </div>
          </div>

          <div className='slider'>
            {selectedPart && <Slider selectedPart={selectedPart.title} selectedRim={selectedRim} />}
          </div>

        </div>

      </div>

      <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} selectedPartInfo={selectedPartInfo} />

    </>
  )
}

export default Configurator
