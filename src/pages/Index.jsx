import {
  // OrbitControls,
  useTexture,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  CameraControls
} from '@react-three/drei';
import { easing } from 'maath';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Fish from '../components/Fish';
import Ninjia from '../components/Ninjia';
import Pigeon from '../components/Pigeon';
import { useState, useRef, useEffect } from 'react';
export const Index = () => {
  const controlsRef = useRef();
  const [activeName, setActive] = useState('');
  const [hovered, setHovered] = useState(null);
  const scene = useThree(state => state.scene);

  useCursor(hovered);
  useEffect(() => {
    if (activeName) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(activeName).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [activeName]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <MonsterStage
        name="小鱼儿"
        color="#38adcf"
        texture={'textures/anime_art_style_lava_world.jpg'}
        activeName={activeName}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === '小鱼儿'} />
      </MonsterStage>
      <MonsterStage
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        name="忍者"
        color="#2c2e3a"
        texture={
          'textures/anime_art_style_a_water_based_pokemon_like_environ.jpg'
        }
        activeName={activeName}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Ninjia scale={0.6} position-y={-1} hovered={hovered === '忍者'} />
      </MonsterStage>
      <MonsterStage
        name="鸽子"
        color="#6b4aa5"
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        texture={'textures/anime_art_style_cactus_forest.jpg'}
        activeName={activeName}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Pigeon scale={0.6} position-y={-1} hovered={hovered === '鸽子'} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  activeName,
  setActive,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();
  useFrame((_state, delta) => {
    const worldOpen = activeName === name;
    easing.damp(portalMaterial.current, 'blend', worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/ZCOOLKuaiLe-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={'bottom'}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(activeName === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
