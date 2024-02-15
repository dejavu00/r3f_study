import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ScrollManager(props) {
  const { onSelectionChange, section } = props;
  const prevOffset = useRef(0);
  const isAnimation = useRef(false);
  const data = useScroll();

  //
  // 如何实现每次只划动一section, 由section驱动
  data.fill.classList.add('top-0');
  data.fill.classList.add('absolute');
  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimation.value = true;
      },
      onComplete: () => {
        isAnimation.value = false;
      }
    });
  }, [section]);

  useFrame(() => {
    if (isAnimation.value) {
      prevOffset.current = data.offset;
      return;
    }
    const curSelection = Math.floor(data.offset * data.pages);
    // data.offset
    if (data.offset > prevOffset.current && curSelection === 0) {
      console.log(' 向下划动');
      // 向下划动
      onSelectionChange(1);
    }

    if (data.offset < prevOffset.current && data.offset <  1 / (data.pages - 1)) {
      console.log(' 向上划动');
      // 向上划动
      onSelectionChange(0);
    }
    prevOffset.current = data.offset;
  });
}
