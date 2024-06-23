
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('../S63/scene.gltf')
  const groupRef = useRef();
  const wheelsRef = useRef();
  const bumperRef = useRef();


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
            if (selectedGroup.name == 'Bumper') {
              if (child.visible == true)
                child.visible = false
              else
                child.visible = true
            }
            if (selectedGroup.name == 'Wheels') {
              child.visible = stock;
              const rim = groupRef.current.getObjectByName('Rims');
              rim.traverse((r) => {
                if (r.isMesh)
                  r.material.color.set(color);
              })
            }
            else {
              child.material.color.set(color);
            }
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
    <group name='s63' {...props} dispose={null} ref={groupRef}>
      <group scale={0.15} rotation={[0, -Math.PI / 2, 0]}>

        <group name='Wheels' ref={wheelsRef}>
          <group position={[79.526, 35.186, 136.499]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={91.733}>
            <mesh geometry={nodes['3_Wheel_Scene_-_Root002_0'].geometry} material={materials['Scene_-_Root.002']} />
            <mesh geometry={nodes['3_Wheel_amdb11_brake002_0'].geometry} material={materials['amdb11_brake.002']} />
            <mesh geometry={nodes['3_Wheel_amdb11_misc_chrome002_0'].geometry} material={materials['amdb11_misc_chrome.002']} />
            <mesh geometry={nodes['3_Wheel_amdb11_misc002_0'].geometry} material={materials['amdb11_misc.002']} />
            <mesh geometry={nodes['3_Wheel_amdb11_caliper002_0'].geometry} material={materials['amdb11_caliper.002']} />
          </group>
          <group position={[79.526, 35.186, -181.314]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={91.733}>
            <mesh geometry={nodes['3_Wheel001_Scene_-_Root002_0'].geometry} material={materials['Scene_-_Root.002']} />
            <mesh geometry={nodes['3_Wheel001_amdb11_brake002_0'].geometry} material={materials['amdb11_brake.002']} />
            <mesh geometry={nodes['3_Wheel001_amdb11_misc_chrome002_0'].geometry} material={materials['amdb11_misc_chrome.002']} />
            <mesh geometry={nodes['3_Wheel001_amdb11_misc002_0'].geometry} material={materials['amdb11_misc.002']} />
            <mesh geometry={nodes['3_Wheel001_amdb11_caliper002_0'].geometry} material={materials['amdb11_caliper.002']} />
          </group>
          <group position={[-68.64, 35.186, 136.499]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[-91.733, 91.733, 91.733]}>
            <mesh geometry={nodes['3_Wheel002_Scene_-_Root002_0'].geometry} material={materials['Scene_-_Root.002']} />
            <mesh geometry={nodes['3_Wheel002_amdb11_brake002_0'].geometry} material={materials['amdb11_brake.002']} />
            <mesh geometry={nodes['3_Wheel002_amdb11_misc_chrome002_0'].geometry} material={materials['amdb11_misc_chrome.002']} />
            <mesh geometry={nodes['3_Wheel002_amdb11_misc002_0'].geometry} material={materials['amdb11_misc.002']} />
            <mesh geometry={nodes['3_Wheel002_amdb11_caliper002_0'].geometry} material={materials['amdb11_caliper.002']} />
          </group>
          <group position={[-68.64, 35.186, -181.314]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} scale={[-91.733, 91.733, 91.733]}>
            <mesh geometry={nodes['3_Wheel003_Scene_-_Root002_0'].geometry} material={materials['Scene_-_Root.002']} />
            <mesh geometry={nodes['3_Wheel003_amdb11_brake002_0'].geometry} material={materials['amdb11_brake.002']} />
            <mesh geometry={nodes['3_Wheel003_amdb11_misc_chrome002_0'].geometry} material={materials['amdb11_misc_chrome.002']} />
            <mesh geometry={nodes['3_Wheel003_amdb11_misc002_0'].geometry} material={materials['amdb11_misc.002']} />
            <mesh geometry={nodes['3_Wheel003_amdb11_caliper002_0'].geometry} material={materials['amdb11_caliper.002']} />
          </group>

          <group name='Rims'>
            <group position={[79.526, 35.186, 136.499]} rotation={[-Math.PI / 2, 0, 0]} scale={108.297}>
              <mesh geometry={nodes.sw221_wheel_e_sw221001_0.geometry} material={materials['sw221.001']} />
              <mesh geometry={nodes.sw221_wheel_e_sw221_wheel_05a_0.geometry} material={materials.sw221_wheel_05a} />
              <mesh geometry={nodes.sw221_wheel_e_sw221_wheel_05a_b_0.geometry} material={materials.sw221_wheel_05a_b} />
            </group>

            <group position={[79.526, 35.186, -181.314]} rotation={[-Math.PI / 2, 0, 0]} scale={108.297}>
              <mesh geometry={nodes.sw221_wheel_e001_sw221001_0.geometry} material={materials['sw221.001']} />
              <mesh geometry={nodes.sw221_wheel_e001_sw221_wheel_05a_0.geometry} material={materials.sw221_wheel_05a} />
              <mesh geometry={nodes.sw221_wheel_e001_sw221_wheel_05a_b_0.geometry} material={materials.sw221_wheel_05a_b} />
            </group>

            <group position={[-68.64, 35.186, 136.499]} rotation={[-Math.PI / 2, 0, 0]} scale={[-108.297, 108.297, 108.297]}>
              <mesh geometry={nodes.sw221_wheel_e002_sw221001_0.geometry} material={materials['sw221.001']} />
              <mesh geometry={nodes.sw221_wheel_e002_sw221_wheel_05a_0.geometry} material={materials.sw221_wheel_05a} />
              <mesh geometry={nodes.sw221_wheel_e002_sw221_wheel_05a_b_0.geometry} material={materials.sw221_wheel_05a_b} />
            </group>

            <group position={[-68.64, 35.186, -181.314]} rotation={[-Math.PI / 2, 0, 0]} scale={[-108.297, 108.297, 108.297]}>
              <mesh geometry={nodes.sw221_wheel_e003_sw221001_0.geometry} material={materials['sw221.001']} />
              <mesh geometry={nodes.sw221_wheel_e003_sw221_wheel_05a_0.geometry} material={materials.sw221_wheel_05a} />
              <mesh geometry={nodes.sw221_wheel_e003_sw221_wheel_05a_b_0.geometry} material={materials.sw221_wheel_05a_b} />
            </group>

          </group>

        </group>

        <group name='Suspension' position={[0, props.carHeight, 0]}>
          <group position={[5.382, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_b_0.geometry} material={materials.sw221_b} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_lights_lod0_0.geometry} material={materials.sw221_lights_lod0} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_lights_lod0_2_0.geometry} material={materials.sw221_lights_lod0_2} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_runninglight_fl_0.geometry} material={materials.sw221_runninglight_fl} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_glass_0.geometry} material={materials.sw221_glass} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_lowbeam_fl_0.geometry} material={materials.sw221_lowbeam_fl} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_interior_hl_0.geometry} material={materials.sw221_interior_hl} />
            <mesh geometry={nodes.sw221_headlight_L_fl_sw221_signal_L_fl_0.geometry} material={materials.sw221_signal_L_fl} />
          </group>
          <group position={[5.105, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_taillightglass_R_fl_sw221_glass_0.geometry} material={materials.sw221_glass} />
            <mesh geometry={nodes.sw221_taillightglass_R_fl_sw221_redglass_0.geometry} material={materials.sw221_redglass} />
          </group>
          <group position={[5.502, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_taillightglass_L_fl_sw221_glass_0.geometry} material={materials.sw221_glass} />
            <mesh geometry={nodes.sw221_taillightglass_L_fl_sw221_redglass_0.geometry} material={materials.sw221_redglass} />
          </group>
          <group position={[5.268, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_taillight_R_fl_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_taillight_R_fl_sw221_lights_lod0_0.geometry} material={materials.sw221_lights_lod0} />
            <mesh geometry={nodes.sw221_taillight_R_fl_sw221_runninglight_fl_0.geometry} material={materials.sw221_runninglight_fl} />
            <mesh geometry={nodes.sw221_taillight_R_fl_sw221_reverselight_fl_0.geometry} material={materials.sw221_reverselight_fl} />
            <mesh geometry={nodes.sw221_taillight_R_fl_sw221_lights_lod0_trans_0.geometry} material={materials.sw221_lights_lod0_trans} />
          </group>
          <group position={[5.268, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_taillight_L_fl_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_taillight_L_fl_sw221_lights_lod0_0.geometry} material={materials.sw221_lights_lod0} />
            <mesh geometry={nodes.sw221_taillight_L_fl_sw221_runninglight_fl_0.geometry} material={materials.sw221_runninglight_fl} />
            <mesh geometry={nodes.sw221_taillight_L_fl_sw221_reverselight_fl_0.geometry} material={materials.sw221_reverselight_fl} />
            <mesh geometry={nodes.sw221_taillight_L_fl_sw221_lights_lod0_trans_0.geometry} material={materials.sw221_lights_lod0_trans} />
            <mesh geometry={nodes.sw221_taillight_L_fl_sw221_signal_LR_fl_0.geometry} material={materials.sw221_signal_LR_fl} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_tailgate_sedan_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_tailgate_sedan_sw221_lights_lod0_0.geometry} material={materials.sw221_lights_lod0} />
            <mesh geometry={nodes.sw221_tailgate_sedan_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_tailgate_sedan_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_tailgate_sedan_sw221_paint_0.geometry} material={materials.sw221_paint} />
            <mesh geometry={nodes.sw221_tailgate_sedan_sw221_carpet_0.geometry} material={materials.sw221_carpet} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_sunvisor_sw221_alcantara_0.geometry} material={materials.sw221_alcantara} />
            <mesh geometry={nodes.sw221_sunvisor_sw221_dvd_b_0.geometry} material={materials.sw221_dvd_b} />
          </group>
          <group position={[42.113, 91.373, 15.929]} rotation={[-2.794, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_steer_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_steer_sw221_badges_0.geometry} material={materials.sw221_badges} />
            <mesh geometry={nodes.sw221_steer_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_steer_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_steer_sw221_interior_d_0.geometry} material={materials.sw221_interior_d} />
            <mesh geometry={nodes.sw221_steer_sw221_wood_0.geometry} material={materials.sw221_wood} />
            <mesh geometry={nodes.sw221_steer_sw221_leather2_0.geometry} material={materials.sw221_leather2} />
            <mesh geometry={nodes.sw221_steer_sw221_stitching1_0.geometry} material={materials.sw221_stitching1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_seats_R_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_seats_R_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_seats_R_sw221_belt_0.geometry} material={materials.sw221_belt} />
            <mesh geometry={nodes.sw221_seats_R_sw221_perforated_0.geometry} material={materials.sw221_perforated} />
            <mesh geometry={nodes.sw221_seats_R_sw221_stitching1_0.geometry} material={materials.sw221_stitching1} />
            <mesh geometry={nodes.sw221_seats_R_sw221_alcantara1_b_0.geometry} material={materials.sw221_alcantara1_b} />
            <mesh geometry={nodes.sw221_seats_R_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>

          <group name='Body'>

            <group position={[-85.932, 97.767, 41.299]} rotation={[-Math.PI / 2, 0, 0.698]} scale={100}>
              <mesh geometry={nodes.sw221_mirror_R_fl_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_mirror_R_fl_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_mirror_R_fl_mirror_0.geometry} material={materials.mirror} />
              <mesh geometry={nodes.sw221_mirror_R_fl_sw221_paint_0.geometry} material={materials.sw221_paint} />
              <mesh geometry={nodes.sw221_mirror_R_fl_sw221_metal_0.geometry} material={materials.sw221_metal} />
              <mesh geometry={nodes.sw221_mirror_R_fl_sw221_signal_R_mirror_fl_0.geometry} material={materials.sw221_signal_R_mirror_fl} />
            </group>
            <group position={[96.773, 97.887, 41.299]} rotation={[-Math.PI / 2, 0, -0.698]} scale={100}>
              <mesh geometry={nodes.sw221_mirror_L_fl_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_mirror_L_fl_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_mirror_L_fl_mirror_0.geometry} material={materials.mirror} />
              <mesh geometry={nodes.sw221_mirror_L_fl_sw221_paint_0.geometry} material={materials.sw221_paint} />
              <mesh geometry={nodes.sw221_mirror_L_fl_sw221_signal_L_mirror_fl_0.geometry} material={materials.sw221_signal_L_mirror_fl} />
              <mesh geometry={nodes.sw221_mirror_L_fl_sw221_metal_0.geometry} material={materials.sw221_metal} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_intmirror_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
              <mesh geometry={nodes.sw221_intmirror_mirror_0.geometry} material={materials.mirror} />
              <mesh geometry={nodes.sw221_intmirror_sw221_alcantara_0.geometry} material={materials.sw221_alcantara} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_hood_fl_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_hood_fl_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_hood_fl_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
              <mesh geometry={nodes.sw221_hood_fl_sw221_paint_0.geometry} material={materials.sw221_paint} />
              <mesh geometry={nodes.sw221_hood_fl_sw221_grill_0.geometry} material={materials.sw221_grill} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_fender_R_fl_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_fender_R_fl_sw221_paint_0.geometry} material={materials.sw221_paint} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_fender_L_fl_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_fender_L_fl_sw221_paint_0.geometry} material={materials.sw221_paint} />
            </group>

            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_door_RR_sedan_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_door_RR_sedan_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_door_RR_sedan_sw221_paint_0.geometry} material={materials.sw221_paint} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_door_RL_sedan_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_door_RL_sedan_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_door_RL_sedan_sw221_paint_0.geometry} material={materials.sw221_paint} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_door_FR_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_door_FR_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_door_FR_sw221_paint_0.geometry} material={materials.sw221_paint} />
            </group>
            <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.sw221_door_FL_sw221_0.geometry} material={materials.sw221} />
              <mesh geometry={nodes.sw221_door_FL_sw221_b_0.geometry} material={materials.sw221_b} />
              <mesh geometry={nodes.sw221_door_FL_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
              <mesh geometry={nodes.sw221_door_FL_sw221_paint_0.geometry} material={materials.sw221_paint} />
            </group>
          </group>

          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_interior_d_0.geometry} material={materials.sw221_interior_d} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_wood_0.geometry} material={materials.sw221_wood} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_leather2_0.geometry} material={materials.sw221_leather2} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_ambient_b_0.geometry} material={materials.sw221_ambient_b} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_harmankardon_0.geometry} material={materials.sw221_harmankardon} />
            <mesh geometry={nodes.sw221_doorpanel_RR_sedan_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_interior_d_0.geometry} material={materials.sw221_interior_d} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_wood_0.geometry} material={materials.sw221_wood} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_leather2_0.geometry} material={materials.sw221_leather2} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_ambient_b_0.geometry} material={materials.sw221_ambient_b} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_harmankardon_0.geometry} material={materials.sw221_harmankardon} />
            <mesh geometry={nodes.sw221_doorpanel_RL_sedan_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_interior_d_0.geometry} material={materials.sw221_interior_d} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_wood_0.geometry} material={materials.sw221_wood} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_leather2_0.geometry} material={materials.sw221_leather2} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_ambient_b_0.geometry} material={materials.sw221_ambient_b} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_harmankardon1_0.geometry} material={materials.sw221_harmankardon1} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_harmankardon_0.geometry} material={materials.sw221_harmankardon} />
            <mesh geometry={nodes.sw221_doorpanel_FR_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_interior_d_0.geometry} material={materials.sw221_interior_d} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_wood_0.geometry} material={materials.sw221_wood} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_leather2_0.geometry} material={materials.sw221_leather2} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_ambient_b_0.geometry} material={materials.sw221_ambient_b} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_harmankardon1_0.geometry} material={materials.sw221_harmankardon1} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_harmankardon_0.geometry} material={materials.sw221_harmankardon} />
            <mesh geometry={nodes.sw221_doorpanel_FL_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_dash_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_dash_sw221_badges_0.geometry} material={materials.sw221_badges} />
            <mesh geometry={nodes.sw221_dash_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_dash_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_dash_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_dash_sw221_interior_d_0.geometry} material={materials.sw221_interior_d} />
            <mesh geometry={nodes.sw221_dash_sw221_wood_0.geometry} material={materials.sw221_wood} />
            <mesh geometry={nodes.sw221_dash_sw221_leather2_0.geometry} material={materials.sw221_leather2} />
            <mesh geometry={nodes.sw221_dash_sw221_ambient_b_0.geometry} material={materials.sw221_ambient_b} />
            <mesh geometry={nodes.sw221_dash_sw221_stitching1_0.geometry} material={materials.sw221_stitching1} />
            <mesh geometry={nodes.sw221_dash_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
            <mesh geometry={nodes.sw221_dash_sw221_screen_0.geometry} material={materials.sw221_screen} />
            <mesh geometry={nodes.sw221_dash_sw221_screen_b_0.geometry} material={materials.sw221_screen_b} />
            <mesh geometry={nodes.sw221_dash_sw221_priborka_0.geometry} material={materials.sw221_priborka} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_bumper_R_fl_amg_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_bumper_R_fl_amg_sw221_paint_0.geometry} material={materials.sw221_paint} />
          </group>
          <group name='Bumper' ref={bumperRef} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_bumper_F_fl_amg_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_bumper_F_fl_amg_sw221_glass_0.geometry} material={materials.sw221_glass} />
            <mesh geometry={nodes.sw221_bumper_F_fl_amg_sw221_paint_0.geometry} material={materials.sw221_paint} />
            <mesh geometry={nodes.sw221_bumper_F_fl_amg_sw221_foglight_fl_0.geometry} material={materials.sw221_foglight_fl} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_seat_FR_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_dvd_0.geometry} material={materials.sw221_dvd} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_harmankardon1_0.geometry} material={materials.sw221_harmankardon1} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_leather3_0.geometry} material={materials.sw221_leather3} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_perforated_0.geometry} material={materials.sw221_perforated} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_alcantara2_0.geometry} material={materials.sw221_alcantara2} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_stitching1_0.geometry} material={materials.sw221_stitching1} />
            <mesh geometry={nodes.sw221_seat_FR_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_seat_FL_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_dvd_0.geometry} material={materials.sw221_dvd} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_harmankardon1_0.geometry} material={materials.sw221_harmankardon1} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_leather3_0.geometry} material={materials.sw221_leather3} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_perforated_0.geometry} material={materials.sw221_perforated} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_alcantara2_0.geometry} material={materials.sw221_alcantara2} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_stitching1_0.geometry} material={materials.sw221_stitching1} />
            <mesh geometry={nodes.sw221_seat_FL_sw221_leather1_0.geometry} material={materials.sw221_leather1} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_exhausttip_R_c_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_exhausttip_R_c_sw221_nodamage_lod0_amg_0.geometry} material={materials.sw221_nodamage_lod0_amg} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.sw221_exhaust_R_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_exhaust_R_sw221_main_0.geometry} material={materials.sw221_main} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.sw221_exhaust_L_b_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_exhaust_L_b_sw221_main_0.geometry} material={materials.sw221_main} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_body_sedan_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_badges_0.geometry} material={materials.sw221_badges} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_paint_0.geometry} material={materials.sw221_paint} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_b_0.geometry} material={materials.sw221_b} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_lights_lod0_0.geometry} material={materials.sw221_lights_lod0} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_glass_0.geometry} material={materials.sw221_glass} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_carpet_0.geometry} material={materials.sw221_carpet} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_alcantara_0.geometry} material={materials.sw221_alcantara} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_belt_0.geometry} material={materials.sw221_belt} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_harmankardon1_0.geometry} material={materials.sw221_harmankardon1} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_leather3_0.geometry} material={materials.sw221_leather3} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_grill4_0.geometry} material={materials.sw221_grill4} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_interior_0.geometry} material={materials.sw221_interior} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_chmsl_0.geometry} material={materials.sw221_chmsl} />
            <mesh geometry={nodes.sw221_body_sedan_sw221_interior_lod0_b_0.geometry} material={materials.sw221_interior_lod0_b} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_sunvisor_b_sw221_dvd_0.geometry} material={materials.sw221_dvd} />
            <mesh geometry={nodes.sw221_sunvisor_b_sw221_alcantara_b_0.geometry} material={materials.sw221_alcantara_b} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_intmirror_b_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_intmirror_b_mirror_0.geometry} material={materials.mirror} />
            <mesh geometry={nodes.sw221_intmirror_b_sw221_ambient_b_0.geometry} material={materials.sw221_ambient_b} />
          </group>
          <group position={[30.327, 90.833, 43.988]} rotation={[-2.995, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_needle_tacho_sw221_interior_lod0_0.geometry} material={materials.sw221_interior_lod0} />
            <mesh geometry={nodes.sw221_needle_tacho_sw221_interior_emissive_lod0_0.geometry} material={materials.sw221_interior_emissive_lod0} />
          </group>
          <group position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_exhausttip_L_c_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_exhausttip_L_c_sw221_nodamage_lod0_amg_0.geometry} material={materials.sw221_nodamage_lod0_amg} />
          </group>
          <group position={[5.887, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_0.geometry} material={materials.sw221} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_b_0.geometry} material={materials.sw221_b} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_lights_lod0_0.geometry} material={materials.sw221_lights_lod0} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_lights_lod0_2_0.geometry} material={materials.sw221_lights_lod0_2} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_runninglight_fl_0.geometry} material={materials.sw221_runninglight_fl} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_signal_R_fl_0.geometry} material={materials.sw221_signal_R_fl} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_glass_0.geometry} material={materials.sw221_glass} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_lowbeam_fl_0.geometry} material={materials.sw221_lowbeam_fl} />
            <mesh geometry={nodes.sw221_headlight_R_fl_sw221_interior_hl_0.geometry} material={materials.sw221_interior_hl} />
          </group>

          <mesh geometry={nodes.sw221_needle_speedo_sw221_interior_emissive_lod1_0.geometry} material={materials.sw221_interior_emissive_lod1} position={[41.517, 92.375, 43.871]} rotation={[-2.995, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_wipers_sw221_b_0.geometry} material={materials.sw221_b} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_tubs_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_sideskirts_amg_sw221_paint_0.geometry} material={materials.sw221_paint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_roof_panoramic_glass_sw221_tinted_glass_0.geometry} material={materials.sw221_tinted_glass} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_radsupport_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_mirrorbase_R_fl_sw221_paint_0.geometry} material={materials.sw221_paint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_mirrorbase_L_fl_sw221_paint_0.geometry} material={materials.sw221_paint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_lettering_R_s63_sw221_0.geometry} material={materials.sw221} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_heatshield_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_headlightglass_R_fl_sw221_glass_0.geometry} material={materials.sw221_glass} position={[5.525, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_headlightglass_L_fl_sw221_glass_0.geometry} material={materials.sw221_glass} position={[5.525, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_chassis_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_badge_v8biturbo_R_sw221_0.geometry} material={materials.sw221} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_badge_v8biturbo_L_sw221_0.geometry} material={materials.sw221} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_badge_R_fl_sw221_0.geometry} material={materials.sw221} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_badge_hood_fl_sw221_0.geometry} material={materials.sw221} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_intercooler_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_upperarm_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_transfercase_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_tierod_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_tierod_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_swaybar_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_swaybar_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_subframe_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_subframe_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_strut_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_steeringbox_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_spring_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_shock_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.w221_radiator_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_lowerarm_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_lowerarm_F_b_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_lowerarm_F_a_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_hub_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_hub_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_halfshaft_R_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_halfshaft_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_fueltank_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_driveshaft_F_sw221_main_0.geometry} material={materials.sw221_main} position={[19.786, 29.811, 83.639]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_driveshaft_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, 31.032, -44.79]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_diff_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_diff_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_bumperbar_F_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_badge_dash_4matic_sw221_0.geometry} material={materials.sw221} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_spoiler_wald_sw221_paint_0.geometry} material={materials.sw221_paint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_spoiler_roof_wald_sw221_paint_0.geometry} material={materials.sw221_paint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_spoiler_brabus_sw221_paint_0.geometry} material={materials.sw221_paint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_exhaust_L_b001_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_exhaust_R001_sw221_main_0.geometry} material={materials.sw221_main} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} />
          <mesh geometry={nodes.sw221_doorglass_RL_sticker_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_RR_sticker_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_FR_sticker_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_FL_sticker_sw221_nodamage_lod0_0.geometry} material={materials.sw221_nodamage_lod0} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_backlight_sedan_defrost_sw221_b_0.geometry} material={materials.sw221_b} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_RR_sedan_tint_sw221_glass_tint_0.geometry} material={materials.sw221_glass_tint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_RL_sedan_tint_sw221_glass_tint_0.geometry} material={materials.sw221_glass_tint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_FR_tint_sw221_glass_tint_0.geometry} material={materials.sw221_glass_tint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_doorglass_FL_tint_sw221_glass_tint_0.geometry} material={materials.sw221_glass_tint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_backlight_sedan_tint_sw221_glass_tint_0.geometry} material={materials.sw221_glass_tint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.sw221_windshield_tint_sw221_glass_tint_0.geometry} material={materials.sw221_glass_tint} position={[5.42, -3.629, -2.714]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />



        </group>


      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
