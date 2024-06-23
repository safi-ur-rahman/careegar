import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

export default function Model(props) {
  const { nodes, materials } = useGLTF('../WagonR/scene.gltf')

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
    <group name='wagonr' {...props} dispose={null} scale={5} ref={groupRef}>
      <group scale={0.01}>
        <group position={[0, 267, 0]} rotation={[-Math.PI / 2, 0, 250]} scale={250}>
          <group name='Wheels' ref={wheelsRef} position={[0.755, 1.338, -0.677]}>
            <group position={[0, 0, -0.036]} >
              <mesh geometry={nodes.wheel_wheel1_0.geometry} material={materials['wheel.1']} />
              <mesh geometry={nodes.wheel_wheel0_0.geometry} material={materials['wheel.0']} />
              <mesh geometry={nodes.wheel_wheel2_0.geometry} material={materials['wheel.2']} />
            </group>
            <group position={[0, -2.79, -0.036]}>
              <mesh geometry={nodes.wheel001_wheel1_0.geometry} material={materials['wheel.1']} />
              <mesh geometry={nodes.wheel001_wheel0_0.geometry} material={materials['wheel.0']} />
              <mesh geometry={nodes.wheel001_wheel2_0.geometry} material={materials['wheel.2']} />
            </group>
            <group position={[-1.508, -2.79, -0.036]} scale={[-1, 1, 1]}>
              <mesh geometry={nodes.wheel002_wheel1_0.geometry} material={materials['wheel.1']} />
              <mesh geometry={nodes.wheel002_wheel0_0.geometry} material={materials['wheel.0']} />
              <mesh geometry={nodes.wheel002_wheel2_0.geometry} material={materials['wheel.2']} />
            </group>
            <group position={[-1.508, 0, -0.036]} scale={[-1, 1, 1]}>
              <mesh geometry={nodes.wheel003_wheel1_0.geometry} material={materials['wheel.1']} />
              <mesh geometry={nodes.wheel003_wheel0_0.geometry} material={materials['wheel.0']} />
              <mesh geometry={nodes.wheel003_wheel2_0.geometry} material={materials['wheel.2']} />
            </group>
          </group>
          <group name='Suspension' position={[0, 0, props.carHeight]}>
            <group name='Body' position={[0, 1.267, 0.165]}>
              <mesh geometry={nodes.bonnet_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
              <mesh geometry={nodes.bonnet_ok_primary_0.geometry} material={materials.primary} />
            </group>

            <group position={[0, -1.509, 0.85]}>
              <mesh geometry={nodes.boot_ok_breaklight_l_0.geometry} material={materials.breaklight_l} />
              <mesh geometry={nodes.boot_ok_wipers0_0.geometry} material={materials['wipers.0']} />
              <mesh geometry={nodes.boot_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
              <mesh geometry={nodes.boot_ok_primary_0.geometry} material={materials.primary} />
              <mesh geometry={nodes.boot_ok_interior_0.geometry} material={materials.interior} />
              <mesh geometry={nodes.boot_ok_boot_ok6_0.geometry} material={materials['boot_ok.6']} />
              <mesh geometry={nodes.boot_ok_glass001_0.geometry} material={materials['glass.001']} />
              <mesh geometry={nodes.boot_ok_boot_ok7_0.geometry} material={materials['boot_ok.7']} />
              <mesh geometry={nodes.boot_ok_boot_ok8_0.geometry} material={materials['boot_ok.8']} />
            </group>
            <group name='FBumper' position={[0, 1.882, -0.503]}>
              <mesh geometry={nodes.bump_front_ok_foglight_l_0.geometry} material={materials.foglight_l} />
              <mesh geometry={nodes.bump_front_ok_foglight_r_0.geometry} material={materials.foglight_r} />
              <mesh geometry={nodes.bump_front_ok_wipers0_0.geometry} material={materials['wipers.0']} />
              <mesh geometry={nodes.bump_front_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
              <mesh geometry={nodes.bump_front_ok_primary_0.geometry} material={materials.primary} />
              <mesh geometry={nodes.bump_front_ok_boot_ok6_0.geometry} material={materials['boot_ok.6']} />
              <mesh geometry={nodes.bump_front_ok_boot_ok7_0.geometry} material={materials['boot_ok.7']} />
              <mesh geometry={nodes.bump_front_ok_boot_ok8_0.geometry} material={materials['boot_ok.8']} />
            </group>
            <group name='BBumper' position={[0, -1.839, -0.431]}>
              <mesh geometry={nodes.bump_rear_ok_breaklight_l_0.geometry} material={materials.breaklight_l} />
              <mesh geometry={nodes.bump_rear_ok_wipers0_0.geometry} material={materials['wipers.0']} />
              <mesh geometry={nodes.bump_rear_ok_primary_0.geometry} material={materials.primary} />
              <mesh name='TailLights' geometry={nodes.bump_rear_ok_taillights0_0.geometry} material={materials['taillights.0']} />
            </group>
            <group name='doors'>
              <group position={[-0.815, 0.913, -0.197]}>
                <mesh geometry={nodes.door_lf_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
                <mesh geometry={nodes.door_lf_ok_primary_0.geometry} material={materials.primary} />
                <mesh geometry={nodes.door_lf_ok_boot_ok6_0.geometry} material={materials['boot_ok.6']} />
                <mesh geometry={nodes.door_lf_ok_glass002_0.geometry} material={materials['glass.002']} />
                <mesh geometry={nodes.door_lf_ok_door_lf_ok3_0.geometry} material={materials['door_lf_ok.3']} />
              </group>
              <group position={[0.828, 0.904, -0.199]}>
                <mesh geometry={nodes.door_rf_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
                <mesh geometry={nodes.door_rf_ok_primary_0.geometry} material={materials.primary} />
                <mesh geometry={nodes.door_rf_ok_boot_ok6_0.geometry} material={materials['boot_ok.6']} />
                <mesh geometry={nodes.door_rf_ok_glass002_0.geometry} material={materials['glass.002']} />
                <mesh geometry={nodes.door_rf_ok_door_lf_ok3_0.geometry} material={materials['door_lf_ok.3']} />
              </group>
              <group position={[-0.832, -0.346, -0.199]}>
                <mesh geometry={nodes.door_lr_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
                <mesh geometry={nodes.door_lr_ok_primary_0.geometry} material={materials.primary} />
                <mesh geometry={nodes.door_lr_ok_boot_ok6_0.geometry} material={materials['boot_ok.6']} />
                <mesh geometry={nodes.door_lr_ok_glass002_0.geometry} material={materials['glass.002']} />
                <mesh geometry={nodes.door_lr_ok_door_lf_ok3_0.geometry} material={materials['door_lf_ok.3']} />
              </group>
              <group position={[0.83, -0.347, -0.199]}>
                <mesh geometry={nodes.door_rr_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
                <mesh geometry={nodes.door_rr_ok_primary_0.geometry} material={materials.primary} />
                <mesh geometry={nodes.door_rr_ok_boot_ok6_0.geometry} material={materials['boot_ok.6']} />
                <mesh geometry={nodes.door_rr_ok_glass002_0.geometry} material={materials['glass.002']} />
                <mesh geometry={nodes.door_rr_ok_door_lf_ok3_0.geometry} material={materials['door_lf_ok.3']} />
              </group>

            </group>

            <group name='windscreen' position={[-0.001, 0.995, 0.452]}>
              <mesh geometry={nodes.windscreen_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
              <mesh geometry={nodes.windscreen_ok_glass002_0.geometry} material={materials['glass.002']} />
              <mesh geometry={nodes.windscreen_ok_glass003_0.geometry} material={materials['glass.003']} />
            </group>

            <mesh geometry={nodes.steering_ok_interior0_0.geometry} material={materials['interior.0']} position={[0.321, 0.449, 0.069]} rotation={[-0.453, 0, 0]} />
            <group position={[0, -0.276, 0]}>
              <mesh geometry={nodes.headlights_right_front_light_0.geometry} material={materials.right_front_light} />
              <mesh geometry={nodes.headlights_left_front_light_0.geometry} material={materials.left_front_light} />
              <mesh geometry={nodes.headlights_indicator_lf_0.geometry} material={materials.indicator_lf} />
              <mesh geometry={nodes.headlights_indicator_rf_0.geometry} material={materials.indicator_rf} />
              <mesh geometry={nodes['headlights_light_all-day_0'].geometry} material={materials['light_all-day']} />
              <mesh name='Headlights' geometry={nodes.headlights_headlights0_0.geometry} material={materials['headlights.0']} />
            </group>
            <mesh geometry={nodes.chassis_ok_indicator_lf_0.geometry} material={materials.indicator_lf} />
            <mesh geometry={nodes.chassis_ok_indicator_rf_0.geometry} material={materials.indicator_rf} />
            <mesh geometry={nodes.chassis_ok_chassis_ok2_0.geometry} material={materials['chassis_ok.2']} />
            <mesh geometry={nodes.chassis_ok_primary_0.geometry} material={materials.primary} />
            <mesh geometry={nodes.chassis_ok_chassis_ok4_0.geometry} material={materials['chassis_ok.4']} />
            <mesh geometry={nodes.chassis_ok_chassis_ok5_0.geometry} material={materials['chassis_ok.5']} />
            <mesh geometry={nodes.chassis_ok_chassis_ok6_0.geometry} material={materials['chassis_ok.6']} />
            <mesh geometry={nodes.interior_interior0_0.geometry} material={materials['interior.0']} />
            <mesh geometry={nodes.interior_interior_0.geometry} material={materials.interior} />
            <mesh geometry={nodes.interior_interior3_0.geometry} material={materials['interior.3']} />
            <mesh geometry={nodes.interior_interior4_0.geometry} material={materials['interior.4']} />
            <mesh geometry={nodes.interior_interior1_0.geometry} material={materials['interior.1']} />
            <mesh geometry={nodes.wipers_wipers0_0.geometry} material={materials['wipers.0']} />
            <mesh geometry={nodes.extra1_wipers0_0.geometry} material={materials['wipers.0']} />
            <mesh geometry={nodes.taillights_taillights0_0.geometry} material={materials['taillights.0']} position={[0, -0.287, 0]} />



          </group>

        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
