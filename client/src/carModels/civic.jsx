
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('../Civic/scene.gltf')

  const groupRef = useRef();
  const wheelsRef = useRef();


  const applyColorToGroup = (groupName, color, stock) => {
    // console.log(stock);

    if (groupRef && groupRef.current) {

      const selectedGroup = groupRef.current.getObjectByName(groupName);

      if (selectedGroup) {

        selectedGroup.traverse((child) => {

          if (props.colorMaterial && props.colorMaterial.material) {
            child.material = props.colorMaterial.material.clone(); // Cloning to ensure each mesh gets its own instance
          }

          if (child.isMesh) {

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
    <group {...props} dispose={null} ref={groupRef}>
      <group scale={0.25}>
        <group position={[0.048, 13.188, -2.03]} rotation={[0, Math.PI / 2, 0]}>
          <group position={[-34.101, -5.25, -0.004]}>
            <mesh geometry={nodes.fbumper_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[9.194, -2.473, 14.674]} />
          </group>
          <group position={[-35.717, -1.001, -0.004]}>
            <mesh geometry={nodes.frontpiece_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[10.81, -6.722, 14.674]} />
          </group>
          <group position={[-27.886, 1.293, -0.003]}>
            <mesh geometry={nodes.hood_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[2.979, -9.016, 14.674]} />
          </group>
          <group position={[-7.909, -2.907, -0.004]}>
            <mesh geometry={nodes.fdoor_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-16.998, -4.816, 14.674]} />
          </group>
          <group position={[9.227, -2.659, -0.004]}>
            <mesh geometry={nodes.rdoor_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-34.134, -5.064, 14.674]} />
          </group>
          <group position={[4.703, 9.374, -0.029]}>
            <mesh geometry={nodes.roof_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-29.61, -17.097, 14.698]} />
          </group>
          <group position={[15.727, 9.557, -0.005]}>
            <mesh geometry={nodes.Box003_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-0.088, -0.173, 0.097]} />
          </group>
          <group position={[30.795, 1.065, -0.004]}>
            <mesh geometry={nodes.trunk_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-55.702, -8.789, 14.674]} />
          </group>
          <group position={[29.521, -4.039, 0.002]}>
            <mesh geometry={nodes.rbumper_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-54.429, -3.684, 14.668]} />
          </group>
          <group position={[13.697, 0.635, -0.004]} rotation={[0, 0, 0.035]} scale={[0.972, 1.036, 1.119]}>
            <mesh geometry={nodes.handle002_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[0, 0, 12.38]} />
          </group>
          <group position={[20.827, 2.016, 13.374]}>
            <mesh geometry={nodes.gascap_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-45.734, -9.739, 1.295]} />
          </group>
          <group position={[-1.752, 0.574, -0.004]} rotation={[0, 0, 0.035]} scale={[0.972, 1.036, 1.119]}>
            <mesh geometry={nodes.handle001_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[0, 0, 12.039]} />
          </group>
          <mesh geometry={nodes.body_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[-24.907, -7.723, 14.67]} />
        </group>
        <group position={[0.044, 10.647, 36.108]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes['blk_Material_#86_0'].geometry} material={materials.Material_86} position={[13.231, -5.183, 14.674]} />
        </group>
        <group position={[0.044, 11.53, 31.699]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes['flight_Material_#85_0'].geometry} material={materials.Material_85} position={[8.821, -6.065, 14.674]} />
        </group>
        <group position={[0.044, 10.275, 33.854]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.plstc_plastic_dark_0.geometry} material={materials.plastic_dark} position={[10.977, -4.811, 14.674]} />
        </group>
        <group position={[0.044, 6.061, 34.681]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.frontplastic_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[11.803, -0.596, 14.674]} />
        </group>
        <group position={[0.044, 6.361, 33.728]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes['blkflow_Material_#86_0'].geometry} material={materials.Material_86} position={[10.85, -0.896, 14.674]} />
        </group>
        <group position={[0.044, 14.109, -32.713]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.rlight_rea_light_glass_0.geometry} material={materials.rea_light_glass} position={[-55.59, -8.644, 14.674]} />
        </group>
        <group position={[0.044, 11.53, 31.275]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.flightin_light_plastic_0.geometry} material={materials.light_plastic} position={[8.398, -6.065, 14.674]} />
        </group>
        <group position={[0.044, 14.788, -32.645]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes['rlightin_Material_#84_0'].geometry} material={materials.Material_84} position={[-55.522, -9.323, 14.674]} />
        </group>
        <group position={[0.044, 19.059, 12.305]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.fwind_Glass_Clear_Distorted2_0.geometry} material={materials.Glass_Clear_Distorted2} position={[-10.573, -13.594, 14.674]} />
        </group>
        <group position={[0.044, 19.027, -5.846]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.sideplastic_PVC_Black_Matte0_0.geometry} material={materials.PVC_Black_Matte0} position={[-28.724, -13.562, 14.674]} />
        </group>
        <group position={[0.044, 18.843, -5.895]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.sidegls_Glass_Clear_Distorted2_0.geometry} material={materials.Glass_Clear_Distorted2} position={[-28.773, -13.379, 14.674]} />
        </group>
        <group position={[0.044, 6.17, 37.024]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.fsmallplastic_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[14.147, -0.706, 14.674]} />
        </group>
        <group position={[0.044, 6.145, 36.418]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes['fbigblk_Material_#86_0'].geometry} material={materials.Material_86} position={[13.54, -0.68, 14.674]} />
        </group>
        <group position={[0.044, 5.414, -35.729]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.diffuser_Aluminium_Black_Anodized_0.geometry} material={materials.Aluminium_Black_Anodized} position={[-58.606, 0.051, 14.674]} />
        </group>
        <group position={[0.046, 3.615, 0.394]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes['skirtaccesory_Material_#120_0'].geometry} material={materials.Material_120} position={[-22.484, 1.85, 14.672]} />
        </group>
        <group position={[0.044, 11.698, 28.939]} scale={[1, 1, 0.471]}>
          <mesh geometry={nodes.inflight__0.geometry} material={materials.inflight__0} position={[8.932, 0.041, 12.302]} />
        </group>
        <group position={[0.044, 11.742, 31.279]} scale={[1, 1, 0.471]}>
          <mesh geometry={nodes.lightbar_front_lights_0.geometry} material={materials.front_lights} position={[8.932, -0.003, 7.334]} />
        </group>
        <group position={[0.239, 11.245, 30.611]} rotation={[0, 0.551, 0]}>
          <mesh geometry={nodes.inlights_Glass_Mirror0_0.geometry} material={materials.Glass_Mirror0} position={[10.219, 0.366, 6.158]} />
        </group>
        <group position={[0.232, 11.258, 30.178]} rotation={[0, 0.551, 0]}>
          <mesh geometry={nodes.inlsides__0.geometry} material={materials.inflight__0} position={[9.998, 0.353, 6.531]} />
        </group>
        <group position={[0.044, 11.782, 28.658]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.19]}>
          <mesh geometry={nodes.turnsinglL_Aluminium_Yellow_Anodized_0.geometry} material={materials.Aluminium_Yellow_Anodized} position={[0.026, 0.038, 71.432]} />
        </group>
        <group position={[0.044, 14.174, -32.401]} rotation={[Math.PI, 0, -Math.PI]}>
          <mesh geometry={nodes.taillightholder_Aluminium_Red_Anodized_0.geometry} material={materials.Aluminium_Red_Anodized} position={[-8.339, 0.734, 2.235]} />
        </group>
        <group position={[0.044, 14.034, -33.345]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.rearlight_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[-0.212, -0.037, 10.965]} />
        </group>
        <group position={[0.044, 14.109, -32.39]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.realightss_plastic_dark_0.geometry} material={materials.plastic_dark} position={[-55.268, -8.644, 14.674]} />
        </group>
        <group position={[0.044, 14.074, -30.662]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.rearsidelights_Aluminium_Red_Anodized_0.geometry} material={materials.Aluminium_Red_Anodized} position={[0.431, 0.183, 12.62]} />
        </group>
        <group position={[0.05, 9.22, -35.425]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.rsidl_Aluminium_Red_Anodized0_0.geometry} material={materials.Aluminium_Red_Anodized0} position={[-58.302, -3.756, 14.668]} />
        </group>
        <group position={[0.044, 5.301, -34.929]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.643, 0.991, 0.991]}>
          <mesh geometry={nodes.exhausts_Aluminium_Clean_0.geometry} material={materials.Aluminium_Clean} position={[-4.437, 0, -0.731]} />
        </group>
        <group position={[0.044, 5.301, -34.863]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.643, 0.991, 0.991]}>
          <mesh geometry={nodes['blk001_Material_#86_0'].geometry} material={materials.Material_86} position={[-4.437, 0, -0.218]} />
        </group>
        <group position={[0.044, 20.034, -25.012]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.rglass_Glass_Clear_Distorted2_0.geometry} material={materials.Glass_Clear_Distorted2} position={[-47.889, -14.569, 14.674]} />
        </group>
        <group position={[0.044, 10.207, 36.115]}>
          <mesh geometry={nodes.frontsmallgrille_plastic_dark_0.geometry} material={materials.plastic_dark} position={[4.586, 0.047, 1.142]} />
        </group>
        <group position={[0.044, 16.664, 10.675]} scale={[1, 1, 1.242]}>
          <group position={[0, 0.245, 0.459]}>
            <mesh geometry={nodes.mirrora_Carpaint_Flakes_Blue_0.geometry} material={materials.Carpaint_Flakes_Blue} position={[13.05, -1.048, 0.401]} />
          </group>
          <group position={[0.002, -0.04, 0.461]}>
            <mesh geometry={nodes.mirrorb_PVC_Black_Matte_0.geometry} material={materials.PVC_Black_Matte} position={[13.048, -0.763, 0.399]} />
          </group>
          <group position={[0.002, -1.378, 0.829]}>
            <mesh geometry={nodes.Object020_Rubber_Rough_0.geometry} material={materials.Rubber_Rough} position={[13.048, 0.575, 0.031]} />
          </group>
          <mesh geometry={nodes.mirror_Glass_Mirror_0.geometry} material={materials.Glass_Mirror} position={[13.05, -0.803, 0.897]} />
        </group>
        <group position={[0.043, 7.433, 0.349]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.wheelwell_plastic_dark_0.geometry} material={materials.plastic_dark} position={[-22.528, -1.968, 14.675]} />
        </group>
        <group position={[12.398, 5.361, 22.597]} rotation={[0, Math.PI / 2, 0]} scale={[0.954, 0.954, 1.566]}>
          <group position={[-0.021, -0.116, 0.783]} scale={[1.069, 1.069, 0.706]}>
            <mesh geometry={nodes.spokes_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[-0.898, -4.317, 0.815]} />
          </group>
          <group position={[0.032, -0.097, 0.458]} scale={[0.329, 0.329, 0.628]}>
            <mesh geometry={nodes.screws_Aluminium_Clean4_0.geometry} material={materials.Aluminium_Clean4} position={[-1.983, 2.934, -0.467]} />
          </group>
          <group position={[0.023, 0.018, 0.58]} scale={[0.169, 0.169, 0.103]}>
            <mesh geometry={nodes.logo001_light_plastic_0.geometry} material={materials.light_plastic} position={[0.143, -0.777, -0.06]} />
          </group>
          <group position={[0.02, -0.001, -0.308]} scale={[1.586, 1.586, 0.967]}>
            <mesh geometry={nodes['Cylinder005_Material_#103_0'].geometry} material={materials.Material_103} position={[0, 0, -0.109]} />
          </group>
          <group position={[-2.61, 0.193, -0.254]} scale={[1.323, 1.822, 0.987]}>
            <mesh geometry={nodes.blk__0.geometry} material={materials.inflight__0} position={[0.061, 0.02, -0.372]} />
          </group>
          <mesh geometry={nodes.rim_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[0, 0, -0.977]} />
        </group>
        <group position={[0.043, 10.773, 37.512]} scale={0.296}>
          <mesh geometry={nodes.logo_silver_0.geometry} material={materials.silver} position={[0.143, -0.777, -0.06]} />
        </group>
        <group position={[0.043, 10.535, 37.007]} scale={0.296}>
          <mesh geometry={nodes.backlogo_plastic_dark_0.geometry} material={materials.plastic_dark} position={[0.143, 0.027, 1.649]} />
        </group>
        <group position={[0.044, 15.701, -36.298]} rotation={[-2.913, 0, -Math.PI]} scale={[0.288, 0.273, 0.288]}>
          <mesh geometry={nodes.logo003_silver_0.geometry} material={materials.silver} position={[0.143, -0.777, -0.06]} />
        </group>
        <group position={[0.053, 14.215, -33.862]} rotation={[Math.PI, 0, -Math.PI]}>
          <mesh geometry={nodes.shinetail_rear_lights_0.geometry} material={materials.rear_lights} position={[-8.33, 0.693, 0.774]} />
        </group>
        <group position={[-0.092, 6.148, 36.513]} scale={[1.087, 0.995, 1.087]}>
          <mesh geometry={nodes.grille_plastic_dark_0.geometry} material={materials.plastic_dark} position={[0.128, -1.108, -0.585]} />
        </group>
        <group position={[-0.106, 12.247, 7.565]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.interioranddashboard_PVC_Black_Matte1_0.geometry} material={materials.PVC_Black_Matte1} position={[3.946, 1.444, -3.862]} />
        </group>
        <group position={[-0.006, 14.407, 12.08]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes['blkin_Material_#86_0'].geometry} material={materials.Material_86} position={[4.051, -0.757, 0.74]} />
        </group>
        <group position={[1.711, 14.203, 11.583]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.interior01__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[1.711, 14.203, 11.456]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.intbuttons06__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[11.015, 14.605, 12.357]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.interior02__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[11.015, 14.605, 12.23]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.intbuttons05__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[-4.666, 13.55, 11.293]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.dashj1_plastic_dark_0.geometry} material={materials.plastic_dark} position={[-0.832, 0.117, -0.062]} />
        </group>
        <group position={[1.694, 12.937, 11.227]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.072, 2.129, 2.129]}>
          <mesh geometry={nodes.interior03__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[1.694, 12.937, 10.951]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.072, 2.129, 2.129]}>
          <mesh geometry={nodes.intbuttons04__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[0.033, 12.937, 11.227]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.072, 2.129, 2.129]}>
          <mesh geometry={nodes.interior04__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[0.033, 12.937, 10.951]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.072, 2.129, 2.129]}>
          <mesh geometry={nodes.intbuttons03__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[-1.582, 12.937, 11.227]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.072, 2.129, 2.129]}>
          <mesh geometry={nodes.interior05__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[-1.582, 12.937, 10.951]} rotation={[Math.PI, 0, -Math.PI]} scale={[2.072, 2.129, 2.129]}>
          <mesh geometry={nodes.intbuttons02__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[7.107, 14.711, 9.322]} rotation={[-2.9, -0.054, -3.125]} scale={[0.734, 0.715, 0.715]}>
          <group position={[0.009, 0.199, 0.968]} scale={0.153}>
            <mesh geometry={nodes.logo006_Aluminium_Clean2_0.geometry} material={materials.Aluminium_Clean2} position={[0.143, -0.777, -0.06]} />
          </group>
          <group position={[0.019, 0.086, 0.255]}>
            <mesh geometry={nodes.steeringwheel2__0.geometry} material={materials.inflight__0} position={[-2.498, 0.051, -0.315]} />
          </group>
          <group position={[-0.017, -2.043, 0.269]}>
            <mesh geometry={nodes.steeringwheel3__0.geometry} material={materials.inflight__0} position={[0.203, -0.736, -0.082]} />
          </group>
          <mesh geometry={nodes.steeringwheelmain__0.geometry} material={materials.inflight__0} position={[-0.106, -0.049, -0.798]} />
          <mesh geometry={nodes.steeringwheel4__0.geometry} material={materials.inflight__0} position={[-0.088, 0.335, 0.453]} scale={1.116} />
        </group>
        <group position={[-1.605, 14.203, 11.583]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.interior06__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[-1.605, 14.203, 11.456]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.intbuttons01__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[-11.029, 14.203, 11.583]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.interior07__0.geometry} material={materials.inflight__0} position={[0, 0, -0.129]} />
        </group>
        <group position={[-11.029, 14.203, 11.456]} rotation={[Math.PI, 0, -Math.PI]} scale={[0.954, 0.981, 0.981]}>
          <mesh geometry={nodes.intbuttons00__0.geometry} material={materials.inflight__0} position={[0, 0, -0.259]} />
        </group>
        <group position={[0.045, 18.942, 9.502]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.fwindshielfside_plastic_dark_0.geometry} material={materials.plastic_dark} position={[-13.375, -13.477, 14.673]} />
        </group>
        <group position={[0.072, 12.257, -11.652]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.rearseats__0.geometry} material={materials.inflight__0} position={[-4.515, 11.236, 3.88]} />
        </group>
        <group position={[0.033, 10.466, -0.908]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.indoor__0.geometry} material={materials.inflight__0} position={[0.472, -0.177, 12.262]} />
        </group>
        <group position={[7.244, 12.932, -0.194]} rotation={[-Math.PI / 2, 0, 0]} scale={1.464}>
          <mesh geometry={nodes.seat_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[1.375, -2.064, -3.467]} />
        </group>
        <group position={[7.264, 17.342, -4.488]} rotation={[-Math.PI / 2, 0, -Math.PI / 6]} scale={[1.464, 1.464, 1.052]}>
          <mesh geometry={nodes.st_Aluminium_Clean3_0.geometry} material={materials.Aluminium_Clean3} position={[0.657, 0.383, -0.687]} />
        </group>
        <group position={[-7.093, 12.932, -0.194]} rotation={[-Math.PI / 2, 0, 0]} scale={1.464}>
          <mesh geometry={nodes.seat001_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[1.375, -2.064, -3.467]} />
        </group>
        <group position={[-7.074, 17.342, -4.488]} rotation={[-Math.PI / 2, 0, -Math.PI / 6]} scale={[1.464, 1.464, 1.052]}>
          <mesh geometry={nodes.st001_Aluminium_Clean3_0.geometry} material={materials.Aluminium_Clean3} position={[0.657, 0.383, -0.687]} />
        </group>
        <group position={[0.02, 22.476, -6.732]} rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.inroof_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[-29.61, -17.011, 14.698]} />
        </group>
        <group position={[12.398, 5.361, -21.618]} rotation={[0, Math.PI / 2, 0]} scale={[0.954, 0.954, 1.566]}>
          <group position={[0.02, -0.001, -0.308]} scale={[1.586, 1.586, 0.967]}>
            <mesh geometry={nodes['Cylinder017_Material_#103_0'].geometry} material={materials.Material_103} position={[0, 0, -0.109]} />
          </group>
          <group position={[-2.61, 0.193, -0.254]} scale={[1.323, 1.822, 0.987]}>
            <mesh geometry={nodes.blk002__0.geometry} material={materials.inflight__0} position={[0.061, 0.02, -0.372]} />
          </group>
          <group position={[0.023, 0.018, 0.58]} scale={[0.169, 0.169, 0.103]}>
            <mesh geometry={nodes.logo007_light_plastic_0.geometry} material={materials.light_plastic} position={[0.143, -0.777, -0.06]} />
          </group>
          <group position={[0.032, -0.097, 0.458]} scale={[0.329, 0.329, 0.628]}>
            <mesh geometry={nodes.screws001_Aluminium_Clean4_0.geometry} material={materials.Aluminium_Clean4} position={[-1.983, 2.934, -0.467]} />
          </group>
          <group position={[-0.021, -0.116, 0.783]} scale={[1.069, 1.069, 0.706]}>
            <mesh geometry={nodes.spokes001_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[-0.898, -4.317, 0.815]} />
          </group>
          <mesh geometry={nodes.rim001_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[0, 0, -0.977]} />
        </group>
        <group position={[-12.303, 5.361, -21.707]} rotation={[0, -Math.PI / 2, 0]} scale={[0.954, 0.954, 1.566]}>
          <group position={[0.02, -0.001, -0.308]} scale={[1.586, 1.586, 0.967]}>
            <mesh geometry={nodes['Cylinder018_Material_#103_0'].geometry} material={materials.Material_103} position={[0, 0, -0.109]} />
          </group>
          <group position={[-2.61, 0.193, -0.254]} scale={[1.323, 1.822, 0.987]}>
            <mesh geometry={nodes.blk003__0.geometry} material={materials.inflight__0} position={[0.061, 0.02, -0.372]} />
          </group>
          <group position={[0.023, 0.018, 0.58]} scale={[0.169, 0.169, 0.103]}>
            <mesh geometry={nodes.logo008_light_plastic_0.geometry} material={materials.light_plastic} position={[0.143, -0.777, -0.06]} />
          </group>
          <group position={[0.032, -0.097, 0.458]} scale={[0.329, 0.329, 0.628]}>
            <mesh geometry={nodes.screws002_Aluminium_Clean4_0.geometry} material={materials.Aluminium_Clean4} position={[-1.983, 2.934, -0.467]} />
          </group>
          <group position={[-0.021, -0.116, 0.783]} scale={[1.069, 1.069, 0.706]}>
            <mesh geometry={nodes.spokes002_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[-0.898, -4.317, 0.815]} />
          </group>
          <mesh geometry={nodes.rim002_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[0, 0, -0.977]} />
        </group>
        <group position={[-12.303, 5.361, 22.508]} rotation={[0, -Math.PI / 2, 0]} scale={[0.954, 0.954, 1.566]}>
          <group position={[0.02, -0.001, -0.308]} scale={[1.586, 1.586, 0.967]}>
            <mesh geometry={nodes['Cylinder019_Material_#103_0'].geometry} material={materials.Material_103} position={[0, 0, -0.109]} />
          </group>
          <group position={[-2.61, 0.193, -0.254]} scale={[1.323, 1.822, 0.987]}>
            <mesh geometry={nodes.blk004__0.geometry} material={materials.inflight__0} position={[0.061, 0.02, -0.372]} />
          </group>
          <group position={[0.023, 0.018, 0.58]} scale={[0.169, 0.169, 0.103]}>
            <mesh geometry={nodes.logo009_light_plastic_0.geometry} material={materials.light_plastic} position={[0.143, -0.777, -0.06]} />
          </group>
          <group position={[0.032, -0.097, 0.458]} scale={[0.329, 0.329, 0.628]}>
            <mesh geometry={nodes.screws003_Aluminium_Clean4_0.geometry} material={materials.Aluminium_Clean4} position={[-1.983, 2.934, -0.467]} />
          </group>
          <group position={[-0.021, -0.116, 0.783]} scale={[1.069, 1.069, 0.706]}>
            <mesh geometry={nodes.spokes003_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[-0.898, -4.317, 0.815]} />
          </group>
          <mesh geometry={nodes.rim003_Carpaint_Simple_Onyx_0.geometry} material={materials.Carpaint_Simple_Onyx} position={[0, 0, -0.977]} />
        </group>
        <group position={[0.043, 12.801, -36.208]} rotation={[-3.078, 0, Math.PI]} scale={[1.362, 1.13, 1.336]}>
          <group position={[0, 0, -0.118]}>
            <mesh geometry={nodes['licence_plate_Material_#133_0'].geometry} material={materials.Material_133} />
            <mesh geometry={nodes['licence_plate_Material_#121_0'].geometry} material={materials.Material_121} />
          </group>
        </group>
        <group position={[7.244, 12.932, -0.194]} rotation={[-Math.PI / 2, 0, 0]} scale={1.464}>
          <mesh geometry={nodes.headrest_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[1.375, -2.064, -3.467]} />
        </group>
        <group position={[-7.093, 12.932, -0.194]} rotation={[-Math.PI / 2, 0, 0]} scale={1.464}>
          <mesh geometry={nodes.headrest001_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[1.375, -2.064, -3.467]} />
        </group>
        <group position={[7.244, 12.148, -14.365]} rotation={[-Math.PI / 2, 0, 0]} scale={1.464}>
          <mesh geometry={nodes.headrest002_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[1.375, -2.064, -3.467]} />
        </group>
        <group position={[-7.093, 12.148, -14.365]} rotation={[-Math.PI / 2, 0, 0]} scale={1.464}>
          <mesh geometry={nodes.headrest003_plastic_medium_dark_0.geometry} material={materials.plastic_medium_dark} position={[1.375, -2.064, -3.467]} />
        </group>
        <group position={[7.264, 16.959, -18.658]} rotation={[-Math.PI / 2, 0, -Math.PI / 6]} scale={[1.464, 1.464, 1.052]}>
          <mesh geometry={nodes.st002_Aluminium_Clean3_0.geometry} material={materials.Aluminium_Clean3} position={[0.657, 0.383, -0.687]} />
        </group>
        <group position={[-7.074, 16.959, -18.658]} rotation={[-Math.PI / 2, 0, -Math.PI / 6]} scale={[1.464, 1.464, 1.052]}>
          <mesh geometry={nodes.st003_Aluminium_Clean3_0.geometry} material={materials.Aluminium_Clean3} position={[0.657, 0.383, -0.687]} />
        </group>
        <mesh geometry={nodes.newtire_Rubber_0.geometry} material={materials.Rubber} position={[14.666, 5.351, 22.587]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1.596]} />
        <mesh geometry={nodes.newtire001_Rubber_0.geometry} material={materials.Rubber} position={[-14.568, 5.351, 22.587]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 1.596]} />
        <mesh geometry={nodes.newtire002_Rubber_0.geometry} material={materials.Rubber} position={[14.666, 5.351, -21.604]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 1.596]} />
        <mesh geometry={nodes.newtire003_Rubber_0.geometry} material={materials.Rubber} position={[-14.568, 5.351, -21.605]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 1.596]} />
        <mesh geometry={nodes.Text001_silver_0.geometry} material={materials.silver} position={[9.597, 15.893, -34.972]} rotation={[Math.PI, 0.189, -Math.PI]} scale={0.006} />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
