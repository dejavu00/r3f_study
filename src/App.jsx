import { Canvas } from "@react-three/fiber";
import { Index } from "./components/Index";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
      <Index />
    </Canvas>
  );
}

export default App;
