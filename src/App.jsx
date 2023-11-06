import { Canvas } from '@react-three/fiber';
// import { Index } from "./pages/Index";
import { AvatorPage } from './pages/AvatorPage';

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
      <color attach="background" args={['#ececec']} />
      <AvatorPage />
    </Canvas>
  );
}

export default App;
