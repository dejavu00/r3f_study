// import { ARButton, XR } from '@react-three/xr';
// import { Canvas } from '@react-three/fiber';

// function App() {
//     navigator.xr?.isSessionSupported('immersive-ar').then(console.log)
//   return (
//     <>
//       <ARButton />
//       <Canvas>
//         <XR>
//           <mesh>
//             <boxGeometry />
//             <meshBasicMaterial color="blue" />
//           </mesh>
//         </XR>
//       </Canvas>
//     </>
//   );
// }

// export default App;

import { useState } from 'react';

const collect = [];

export const MultiCount = () => {
  const [count, setCount] = useState(0);

  const click = () => {
    setCount(count + 1);
  };

  collect.push(() => count);

  const logCollect = () => {
    collect.forEach(fn => console.log(fn()));
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={click}>count++</button> <br/>
      <button onClick={logCollect}>log {'>>'} collect</button>
    </div>
  );
};

export default MultiCount;
