import { Canvas, useFrame } from '@react-three/fiber';
import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
  OrbitControls,
  Center
} from '@react-three/drei';
import { useRef } from 'react';
import { OverLay } from './OverLay';
import { easing } from 'maath';
import './styles.css';
export default function App() {
  return (
    <Canvas shadows camera={{ position: [4, 2.5, 8], fov: 35 }}>
      <group>
        <Center top position={[2.5, 0, 1]}>
          <mesh castShadow rotation={[0, Math.PI / 4, 0]} position-y={1}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </Center>
        <AccumulativeShadows
          temporal
          frames={200}
          color="orange"
          colorBlend={2}
          toneMapped={true}
          alphaTest={0.75}
          opacity={2}
          scale={12}
        >
          <RandomizedLight
            intensity={2}
            amount={12}
            radius={4}
            ambient={0.5}
            position={[5, 5, -10]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
      <Environment preset="city" />
    </Canvas>
  );
}

function Experience() {
  const shadows = useRef(null);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

      <OrbitControls />

      {/* <Center position-x={4}>
        <mesh position-x={-0.5}>
          <meshNormalMaterial />
          <boxGeometry />
        </mesh>

        <mesh rotation-x={-Math.PI / 2} position-y={-0.5}>
          <planeGeometry args={[4, 4, 4]} />
          <meshBasicMaterial color={'red'} />
        </mesh>
        <mesh scale={2.53} material-color="black">
          <ringGeometry args={[0.955, 1, 4]} />
        </mesh>
      </Center> */}
      <group>
        <AccumulativeShadows
          temporal
          frames={100}
          color="orange"
          colorBlend={2}
          toneMapped={true}
          alphaTest={0.75}
          opacity={2}
          scale={12}
        >
          <RandomizedLight
            intensity={Math.PI}
            amount={8}
            radius={4}
            ambient={0.5}
            position={[5, 5, -3]}
            bias={0.001}
          />
        </AccumulativeShadows>
        <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* <mesh rotation-x={-Math.PI / 2} position-y={-0.5}>
          <planeGeometry args={[4, 4, 4]} />
          <meshBasicMaterial color={'red'} />
        </mesh> */}
        <mesh scale={2.53} material-color="black">
          <ringGeometry args={[0.955, 1, 4]} />
        </mesh>
      </group>
    </>
  );
}
