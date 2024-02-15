import { motion } from 'framer-motion-3d';
import { Image, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import { useMotionValue, animate } from 'framer-motion';
const projects = [
  {
    title: 'nice',
    url: 'imgs/logo.png'
  },
  {
    title: 'very nice',
    url: 'imgs/vite.jpeg'
  },
  {
    title: 'very very nice',
    url: 'imgs/react.png'
  },
  {
    title: 'very very very nice',
    url: 'imgs/d3.png'
  },
  {
    title: 'very very very very nice',
    url: 'imgs/js.png'
  }
];
export function Projects() {
  const { viewport } = useThree();
  const [currentProject, setCurrentProject] = useState(
    Math.floor(projects.length / 2)
  );

  useEffect(() => {}, [currentProject]);

  return (
    <group position-y={-viewport.height * 2 + 2}>
      {projects.map((item, index) => (
        <motion.group
          key={index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.8,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI
          }}
        >
          <Project {...item} highlighted={currentProject === index} />
        </motion.group>
      ))}

      <Text
        position-x={-2}
        position-y={-2}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
        onClick={() =>
          setCurrentProject(currentProject === 0 ? 4 : currentProject - 1)
        }
      >
        previous
      </Text>
      <Text
        fontSize={1}
        position-y={-2}
        anchorX="center"
        anchorY="middle"
        onClick={() =>
          setCurrentProject(currentProject === 0 ? 4 : currentProject - 1)
        }
      >
        Can
      </Text>
      <Text
        position-x={2}
        position-y={-2}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
        onClick={() =>
          setCurrentProject(currentProject === 4 ? 0 : currentProject + 1)
        }
      >
        next
      </Text>
    </group>
  );
}

function Project(props) {
  const { title, url, highlighted } = props;
  // 背景mesh的opacity的渐变，通过useMotionValue去处理，因为animate无法使用opacity
  const bgOpacity = useMotionValue(0.4);
  const backgroundRef = useRef();
  useEffect(() => {
    // 如果是高亮
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);
  useFrame(() => {
    backgroundRef.current.material.opacity = bgOpacity.get();
  });
  return (
    <group>
      <mesh ref={backgroundRef}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial color="black" transparent />
      </mesh>
      <Image position-z={0.002} scale={[2, 2, 1]} url={url} transparent />
      <Text fontSize={0.2} position-y={-1.5} anchorX="center" anchorY="middle">
        {title}
      </Text>
    </group>
  );
}
