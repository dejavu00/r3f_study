import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';
import { useControls } from 'leva';
export function Avatar(props) {
  const { animation, wireFrame } = props;
  const group = useRef();
  const { nodes, materials } = useGLTF('models/6543567ecc14c7b0c462d719.glb');
  const { animations: prayingAnimations } = useFBX('animations/Praying.fbx');
  const { animations: typingAnimations } = useFBX('animations/Typing.fbx');
  const { animations: flyFlipAnimations } = useFBX(
    'animations/Falling Idle.fbx'
  );
  const { animations: standingAnimations } = useFBX(
    'animations/Standing Idle.fbx'
  );

  prayingAnimations[0].name = 'Praying';
  typingAnimations[0].name = 'Typing';
  flyFlipAnimations[0].name = 'Flying';
  standingAnimations[0].name = 'Standing';

  const { actions } = useAnimations(
    [
      prayingAnimations[0],
      typingAnimations[0],
      flyFlipAnimations[0],
      standingAnimations[0]
    ],
    group
  );

  const { headFllow, cursorFllow } = useControls({
    headFllow: true,
    cursorFllow: false,
    wireFrame: false,
    animation: {
      value: 'Flying',
      options: ['Praying', 'Typing', 'Flying', 'Standing']
    }
  });

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => {
      actions[animation].reset().fadeOut(0.5);
    };
  }, [animation]);

  // useFrame(state => {
  //   if (headFllow) {
  //     group.current.getObjectByName('Head').lookAt(state.camera.position);
  //   }
  //   if (cursorFllow) {
  //     group.current
  //       .getObjectByName('Spine2')
  //       .lookAt(new THREE.Vector3(state.mouse.x, state.mouse.y, 1));
  //   }
  // });

  useEffect(() => {
    Object.values(materials).forEach(material => {
      material.wireframe = wireFrame;
    });
  }, [wireFrame]);
  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation-x={-Math.PI / 2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          name="EyeLeft"
          frustumCulled={false}
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          frustumCulled={false}
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          frustumCulled={false}
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          frustumCulled={false}
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          frustumCulled={false}
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('models/6543567ecc14c7b0c462d719.glb');
