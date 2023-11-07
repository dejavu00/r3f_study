import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Demo() {
  useFrame(state => {
    state.camera.lookAt(0, 0, 0);
    const lookAtPoint = new THREE.Vector3();
    state.camera.getWorldDirection(lookAtPoint);
    lookAtPoint.add(state.camera.position);
    console.log('lookAtPoint: ', state.camera.position, lookAtPoint);
  });
  return (
    <mesh>
      <meshNormalMaterial />
      <boxGeometry />
    </mesh>
  );
}
function App() {
  return (
    <Canvas shadows camera={{ position: [4, 0, 10], fov: 30 }}>
      <Demo />
    </Canvas>
  );
}

export default App;
