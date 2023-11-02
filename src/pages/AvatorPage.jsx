import { useState, useRef, useEffect } from 'react';
import { Environment, CameraControls } from '@react-three/drei';
import { Avatar } from '../components/Avator';
export const AvatorPage = () => {
  const controlsRef = useRef();

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <group position-y={-1}>
        <Avatar />
      </group>
      {/* <mesh>
        <meshNormalMaterial/>
        <boxGeometry/>
      </mesh> */}
    </>
  );
};
