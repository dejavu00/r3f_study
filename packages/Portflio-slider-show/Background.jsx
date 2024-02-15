import { Sphere, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useRef } from 'react';
export function Background() {
  const t1 = useRef();
  const material = useRef();
  const color = useRef({
    color: '#b9bcff'
  });
  const data = useScroll();
  useFrame(() => {
    // t1.current.seek(data.offset * t1.current.duration())
    t1.current && t1.current.progress(data.offset);
    material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    t1.current = gsap.timeline();
    t1.current.to(color.current, {
      color: '#212121'
    });
    t1.current.to(color.current, {
      color: '#7a7ca5'
    });
  }, []);
  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
}
