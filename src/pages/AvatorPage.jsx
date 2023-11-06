import { useState, useRef, useEffect } from 'react';
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Sky
} from '@react-three/drei';
import { Avatar } from '../components/Avator';
import { useControls } from 'leva';

export const AvatorPage = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sky />
      <OrbitControls />

      <group position-y={-1}>
        <ContactShadows
          opacity={1}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#333"
        />

        <Avatar />

        <mesh position-y={-0.6}>
          <meshStandardMaterial color={'white'} />
          <boxGeometry />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position-y={-1}>
          <meshStandardMaterial color={'white'} />
          <planeGeometry args={[5, 5]} />
        </mesh>
      </group>
    </>
  );
};
