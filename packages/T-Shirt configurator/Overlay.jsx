import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function OverLay() {
  const [snap] = useState({
    intro: true,
    color: ''
  });
  const transition = { type: 'spring', duration: 0.8 };

  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  };
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      {snap.intro ? (
        <motion.section key="main" {...config}>
          <div className="section--container">
            <motion.div
              key="title"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                damping: 5,
                stiffness: 40,
                restDelta: 0.001,
                duration: 0.3
              }}
            >
              <h1>LET'S DO IT.</h1>
            </motion.div>
            <div className="support--content">
              <motion.div
                key="p"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  damping: 7,
                  stiffness: 30,
                  restDelta: 0.001,
                  duration: 0.6,
                  delay: 0.2,
                  delayChildren: 0.2
                }}
              >
                <p>
                  Create your unique and exclusive shirt with our brand-new 3D
                  customization tool. <strong>Unleash your imagination</strong>{' '}
                  and define your own style.
                </p>
                {/* <button
                    style={{ background: snap.color }}
                    onClick={() => (state.intro = false)}
                  >
                    CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                  </button> */}
              </motion.div>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.section key="custom" {...config}>
          {/* <Customizer /> */}
        </motion.section>
      )}
    </div>
  );
}
