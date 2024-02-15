import {
  Environment,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  useScroll
} from '@react-three/drei';
import { useMotionValue, animate } from 'framer-motion';

import { Avatar } from './Avator';
import { motion } from 'framer-motion-3d';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
export function Experience(props) {
  const { animation, menuOpened } = props;
  const { viewport } = useThree();
  const data = useScroll();
  const [section, setSection] = useState(0)
  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();
  const [wireFrame, setWireFrame] = useState(false);
  useEffect(() => {
    animate(cameraPositionX, menuOpened ? 0 : 0);
    animate(cameraLookAtX, menuOpened ? 2 : 0);
  }, [menuOpened]);

  useFrame(state => {
    const offset = data.offset * data.pages;
    let curSelection = Math.floor(offset);
    if (offset >= 2.5) {
      curSelection = 2;
    } else if (offset >= 2 && offset < 2.5) {
      curSelection = 1;
    }
    if (curSelection !== section) {
      setSection(curSelection);
    }
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    let curSelection = Math.floor(data.offset * data.pages);
    if (curSelection > 2) {
      curSelection = 2;
    }
    if (curSelection !== section) {
      setSection(curSelection)
    }
  });

<<<<<<< HEAD
=======
  useEffect(() => {
    setCharacterAnimation('Flying');
    setTimeout(() => {
      setCharacterAnimation(section === 0 ? 'Typing' : 'Standing');
    }, 300);

    setWireFrame(section === 1);
  }, [section]);

>>>>>>> 83d78ad (chore: chore)
  return (
    <>
      <Background />
      <ambientLight />
      <Environment preset="sunset" />
      <motion.group
        scale={[2, 2, 2]}
        animate={section + ''}
        variants={{
          0: {
            y: -1.5
          },
          1: {
            y: -viewport.height - 4,
            scaleX: 2.8,
            scaleY: 2.8,
            scaleZ: 2.8
          },
          2: {
            y: -viewport.height * 2 + 1,
            x: -2,
            scaleX: 0.8,
            scaleY: 0.8,
            scaleZ: 0.8,
            rotateY: Math.PI / 2,
            rotateX: Math.PI / 8
          }
        }}
      >
        <Avatar wireFrame={wireFrame} animation={characterAnimation} />
      </motion.group>
      <motion.group
        position={[0, 0, 0]}
        scale={[2, 2, 2]}
        animate={section + ''}
        variants={
          {
            0: {
              y: -1.5
            },
            1: {
              y: -viewport.height
            },
            2: {
              y: -viewport.height * 2 + 0.5,
              scaleX: 3,
              scaleY: 3,
              scaleZ: 3,
              rotateY: -Math.PI / 4,
            },
          }
        }
      >
        <Avatar animation={section === 0 ? 'Flying' : 'Standing'} />
      </motion.group>


      <motion.group
        position={[0, 0, 0]}
        scale={[2, 2, 2]}
        animate={{
<<<<<<< HEAD
          y: section === 1 ? -viewport.height : -1.5,
=======
          y: section === 1 ? -viewport.height - 1.6 : -1.5
>>>>>>> 83d78ad (chore: chore)
        }}
      >
        <mesh position-x={2} position-y={1}>
          <sphereGeometry />
          <MeshDistortMaterial
            opacity={0.8}
            transparent
            distort={1}
            speed={5}
            color="yellow"
          />
        </mesh>
        <mesh position-y={2} scale={[0.5, 0.5, 0.5]}>
          <boxGeometry />
          <MeshWobbleMaterial
            opacity={0.8}
            transparent
            factor={2}
            speed={8}
            color={'blue'}
          />
        </mesh>
<<<<<<< HEAD
        <mesh>
          <meshNormalMaterial />
          <boxGeometry />
        </mesh>

=======
>>>>>>> 83d78ad (chore: chore)
      </motion.group>
      <Projects />
    </>
  );
}
