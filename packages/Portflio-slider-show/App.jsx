import { Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Experience } from './Experience';
import { ScrollManager } from './ScrollManager';
import { MotionConfig } from 'framer-motion';
import { Introduce } from './Introduce';
import { motion } from 'framer-motion';
const framerMotionConfig = {
  duration: 0.5,
  type: 'string'
};

function App() {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <>
      <MotionConfig
        transition={{
          ...framerMotionConfig
        }}
      >
        <button
          onClick={() => setMenuOpened(!menuOpened)}
          className="z-20 fixed top-12 right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
        >
          <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? 'rotate-45  translate-y-0.5' : ''
              }`}
          />
          <div
            className={`bg-white h-0.5 rounded-md w-full my-1 ${menuOpened ? 'hidden' : ''
              }`}
          />
          <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${menuOpened ? '-rotate-45' : ''
              }`}
          />
        </button>
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 42 }}>
          <color attach="background" args={['#e6e7ff']} />
          <ScrollControls pages={3} damping={0.1}>
            <ScrollManager

              section={section}
              onSelectionChange={setSection}
            />
            <Scroll>
              <Experience menuOpened={menuOpened} animation="Flying" section={section} />
            </Scroll>
            <Scroll html>
              <Introduce />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </MotionConfig>
    </>
  );
}

export default App;
