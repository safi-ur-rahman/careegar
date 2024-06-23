import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('../Corolla/scene.gltf')
  const groupRef = useRef();
  const wheelsRef = useRef();


  const applyColorToGroup = (groupName, color, stock) => {
    // console.log(stock);

    if (groupRef && groupRef.current) {

      const selectedGroup = groupRef.current.getObjectByName(groupName);

      if (selectedGroup) {

        selectedGroup.traverse((child) => {
          // console.log(`Applying material to child: ${child.name}`);

          if (props.colorMaterial && props.colorMaterial.material) {
            child.material = props.colorMaterial.material.clone(); // Cloning to ensure each mesh gets its own instance
          }

          if (child.isMesh) {

            if (selectedGroup.name == 'Wheels') {
              child.visible = stock;
            }

            child.material.color.set(color);
          }
        });
      } else {

        console.error(`Group with name '${groupName}' not found.`);
      }
    } else {
      console.error('groupRef or groupRef.current is undefined.');
    }
  };

  useEffect(() => {

    const color = '#ff0000'; // Example color
    applyColorToGroup(props.selectedPart, props.updatecolor, props.stock);
  }, [props.selectedPart, props.updatecolor, props.stock]);

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <group scale={0.17} rotation={[0,-Math.PI/2, 0]}>
        <group position={[0, 43.265, 216.088]} rotation={[-1.666, 0, 0]} scale={100}>
          <mesh geometry={nodes.Cube002_Material010_0.geometry} material={materials['Material.010']} />
          <mesh geometry={nodes.Cube002_Material008_0.geometry} material={materials['Material.008']} />
        </group>
        <group position={[0, 74.365, -210.537]} rotation={[-1.367, 0, -Math.PI]} scale={100}>
          <mesh geometry={nodes.Cube003_Material010_0.geometry} material={materials['Material.010']} />
          <mesh geometry={nodes.Cube003_Material008_0.geometry} material={materials['Material.008']} />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_body_main_paint001_0.geometry} material={materials['main_paint.001']} />
          <mesh geometry={nodes.corolla_e180_body_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_body_plastic1_0.geometry} material={materials.plastic1} />
          <mesh geometry={nodes.corolla_e180_body_Material005_0.geometry} material={materials['Material.005']} />
          <mesh geometry={nodes.corolla_e180_body_Material003_0.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.corolla_e180_body_klosz_0.geometry} material={materials.klosz} />
          <mesh geometry={nodes.corolla_e180_body_invisible_dark_0.geometry} material={materials.invisible_dark} />
          <mesh geometry={nodes.corolla_e180_body_fabric_high_0.geometry} material={materials.fabric_high} />
          <mesh geometry={nodes.corolla_e180_body_car_plastic_grainy_gray_0.geometry} material={materials.car_plastic_grainy_gray} />
          <mesh geometry={nodes.corolla_e180_body_miror_0.geometry} material={materials.miror} />
        </group>
        <group name='Wheels' ref={wheelsRef} position={[71.405, 30.319, 125.286]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_wheels_Material011_0.geometry} material={materials['Material.011']} />
          <mesh geometry={nodes.corolla_e180_wheels_tyre_side_0.geometry} material={materials.tyre_side} />
          <mesh geometry={nodes.corolla_e180_wheels_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_wheels_Material013_0.geometry} material={materials['Material.013']} />
        </group>
        <group position={[0.146, 134.522, 0.226]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_frontlights_klosz_0.geometry} material={materials.klosz} />
          <mesh geometry={nodes.corolla_e180_frontlights_plastic1_0.geometry} material={materials.plastic1} />
          <mesh geometry={nodes.corolla_e180_frontlights_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_frontlights_Material014_0.geometry} material={materials['Material.014']} />
        </group>
        <group position={[70.497, 92.661, -16.601]} rotation={[-1.521, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_interior1_dark_plastic_grainy_0.geometry} material={materials.dark_plastic_grainy} />
          <mesh geometry={nodes.corolla_e180_interior1_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_interior1_fabric_high_0.geometry} material={materials.fabric_high} />
          <mesh geometry={nodes.corolla_e180_interior1_car_plastic_grainy_gray_0.geometry} material={materials.car_plastic_grainy_gray} />
          <mesh geometry={nodes.corolla_e180_interior1_miror_0.geometry} material={materials.miror} />
          <mesh geometry={nodes.corolla_e180_interior1_klosz_0.geometry} material={materials.klosz} />
          <mesh geometry={nodes.corolla_e180_interior1_carpet002_0.geometry} material={materials['carpet.002']} />
          <mesh geometry={nodes.corolla_e180_interior1_belts_0.geometry} material={materials.belts} />
          <mesh geometry={nodes.corolla_e180_interior1_plastic1_0.geometry} material={materials.plastic1} />
        </group>
        <group position={[0, 74.009, -108.155]} rotation={[-2.038, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_furniture_leather_0.geometry} material={materials.leather} />
          <mesh geometry={nodes.corolla_e180_furniture_seat_fabric_0.geometry} material={materials.seat_fabric} />
          <mesh geometry={nodes.corolla_e180_furniture_dark_plastic_grainy_0.geometry} material={materials.dark_plastic_grainy} />
          <mesh geometry={nodes.corolla_e180_furniture_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_furniture_Material019_0.geometry} material={materials['Material.019']} />
        </group>
        <group position={[72.117, 91.481, 73.131]} rotation={[-1.46, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_interior_front_dark_plastic_grainy_0.geometry} material={materials.dark_plastic_grainy} />
          <mesh geometry={nodes.corolla_e180_interior_front_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_interior_front_speaker_0.geometry} material={materials.speaker} />
        </group>
        <group position={[35.914, 77.542, 70.05]} rotation={[-1.501, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_dashboard_dark_plastic_grainy_0.geometry} material={materials.dark_plastic_grainy} />
          <mesh geometry={nodes.corolla_e180_dashboard_smal_screen_0.geometry} material={materials.smal_screen} />
          <mesh geometry={nodes.corolla_e180_dashboard_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_dashboard_M_dashboard001_0.geometry} material={materials['M_dashboard.001']} />
          <mesh geometry={nodes.corolla_e180_dashboard_Material016_0.geometry} material={materials['Material.016']} />
          <mesh geometry={nodes.corolla_e180_dashboard_plastic1_0.geometry} material={materials.plastic1} />
          <mesh geometry={nodes.corolla_e180_dashboard_speaker_0.geometry} material={materials.speaker} />
          <mesh geometry={nodes.corolla_e180_dashboard_invisible_dark_0.geometry} material={materials.invisible_dark} />
        </group>
        <group position={[35.914, 84.311, 53.547]} rotation={[-2.887, 0, -Math.PI]} scale={100}>
          <mesh geometry={nodes.corolla_e180_steering_wheel_M_Steering_wheel_0.geometry} material={materials.M_Steering_wheel} />
          <mesh geometry={nodes.corolla_e180_steering_wheel_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_steering_wheel_plastic1_0.geometry} material={materials.plastic1} />
        </group>
        <group position={[35.914, 77.542, 70.05]} rotation={[-1.501, 0, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_dashboard001_M_dashboard_0.geometry} material={materials.M_dashboard} />
          <mesh geometry={nodes.corolla_e180_dashboard001_Material021_0.geometry} material={materials['Material.021']} />
          <mesh geometry={nodes.corolla_e180_dashboard001_main_paint_0.geometry} material={materials.main_paint} />
          <mesh geometry={nodes.corolla_e180_dashboard001_screen_0.geometry} material={materials.screen} />
          <mesh geometry={nodes.corolla_e180_dashboard001_Material026_0.geometry} material={materials['Material.026']} />
          <mesh geometry={nodes.corolla_e180_dashboard001_Material020_0.geometry} material={materials['Material.020']} />
        </group>
        <group position={[45.38, 89.287, 81.761]} rotation={[-1.501, -0.447, 0]} scale={100}>
          <mesh geometry={nodes.corolla_e180_dashboard002_dark_plastic_grainy_0.geometry} material={materials.dark_plastic_grainy} />
          <mesh geometry={nodes.corolla_e180_dashboard002_Material016_0.geometry} material={materials['Material.016']} />
        </group>
        <mesh geometry={nodes.corolla_e180_windows_Material004_0.geometry} material={materials['Material.004']} position={[0, 112.862, 76.811]} rotation={[-1.174, 0, 0]} scale={100} />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
