import { useRef, useLayoutEffect } from 'react';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
export function Robot(props) {
  const { nodes } = useGLTF('/models/phantoms-transformed.glb');
  const robot = useRef();
  const data = useScroll();
  const tl = useRef();
  useFrame(() => {
    // ! scroll.offset的值范围0-1，下面代码的意思是滑动到某个位置，转换成整个事件轴的动画时刻，位置->时刻
    console.log('scroll is', data.offset, data)
    tl.current.seek(data.offset * tl.current.duration());

  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 2, ease: 'power1.out' }
    });

    tl.current
      .to(robot.current.rotation, { y: -1 }, 2)
      .to(robot.current.position, { x: 1 }, 2)

      .to(robot.current.rotation, { y: 1 }, 6)
      .to(robot.current.position, { x: -1 }, 6)

      .to(robot.current.rotation, { y: 0 }, 11)
      .to(robot.current.rotation, { x: 1 }, 11)
      .to(robot.current.position, { x: 0 }, 11)

      .to(robot.current.rotation, { y: 0 }, 13)
      .to(robot.current.rotation, { x: -1 }, 13)
      .to(robot.current.position, { x: 0 }, 13)

      .to(robot.current.rotation, { y: 0 }, 16)
      .to(robot.current.rotation, { x: 0 }, 16)
      .to(robot.current.position, { x: 0 }, 16)

      .to(robot.current.rotation, { y: 0 }, 20)
      .to(robot.current.rotation, { x: 0 }, 20)
      .to(robot.current.position, { x: 0 }, 20);
  }, []);
  return (
    <group {...props} ref={robot} dispose={null}>
      <group
        position={[-0.214, 0.163, 0.365]}
        rotation={[0, -0.152, 0]}
        scale={0.146}
      >
        <mesh geometry={nodes.Cube003.geometry} castShadow>
          <meshPhysicalMaterial
            color="#aaa"
            roughness={0.2}
            metalness={1}
            reflectivity={0.5}
            iridescence={0.3}
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 1000]}
          />
        </mesh>
        <mesh castShadow geometry={nodes.Cube003_1.geometry}>
          <meshPhysicalMaterial
            color="#000000"
            roughness={1}
            emissive={'#000'}
            clearcoat={1}
            reflectivity={0.2}
            metalness={0}
            iridescence={0.1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[100, 1000]}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('/models/phantoms-transformed.glb');
