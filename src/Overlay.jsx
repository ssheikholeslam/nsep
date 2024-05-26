// Import useState and useEffect hooks
import React, { useRef, useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineArrowLeft, AiFillShopping } from 'react-icons/ai';
import { FaArrowRight, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'; 
import { useSnapshot } from 'valtio';
import { state } from './store';
import $ from "jquery";
import "turn.js";
import TurnBook from "./TurnBook";
import './styles.css';

export function Overlay() {
  const snap = useSnapshot(state);
  const transition = { type: 'spring', duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  };

  const turnContainer = useRef(null);

  const options = {
    width: 800,
    height: 600,
    autoCenter: true,
    display: "double",
    acceleration: true,
    elevation: 50,
    gradients: !$.isTouch,
    when: {
      turned: function (e, page) {
        console.log("Current view: ", $(this).turn("view"));
      },
    },
  };

  const handlePrevPage = () => {
    if (turnContainer.current) {
      $(turnContainer.current).turn('previous');
    }
  };

  const handleNextPage = () => {
    if (turnContainer.current) {
      $(turnContainer.current).turn('next');
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        style={{ padding: '30px 50px', zIndex: '100'}}
      >
        <a href="#">
          <img src="./Logo.svg" alt="Logo" width="40" height="40" onClick={() => window.location.reload()} />
        </a>
        <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
          <a href="https://www.amazon.com/Reflections-9-Stories-11-Poems/dp/B0B112GRKS" target="_blank">
            <AiFillShopping size="2.5em" color="#444" />
          </a>
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                <h1>NEVER FORGET.</h1>
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
                  }}>
                  <p>
                    A poignant collection capturing the <strong>vivid perspectives</strong> of individuals touched by the events of <strong>9/11</strong>
                  </p>
                  <button style={{ background: snap.color }} onClick={() => { state.intro = false; state.show3DAsset = false; state.showHTMLFlipBook = true; }}>
                    LEARN MORE <FaArrowRight size="1.3em" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            {snap.showHTMLFlipBook && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <div className="flipbook-container">
                  <TurnBook options={options} className="magazine drop-shadow" turnContainerRef={turnContainer} />
                </div>
              </div>
            )}
            <Pages onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
            <button className="exit" style={{ background: snap.color, zIndex: 200 }} onClick={() => { state.intro = true; state.show3DAsset = true; state.showHTMLFlipBook = false }}>
              GO BACK
              <AiOutlineArrowLeft size="1.3em" />
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pages({ onPrevPage, onNextPage }) {
  const snap = useSnapshot(state);
  return (
    <div className="pages">
      <div className="navBtns">
        <div className={`circle`} style={{ background: "#CCC" }} onClick={onPrevPage}>
          <FaArrowLeft size="1.1em" color="#f8f8ff" style={{ verticalAlign: 'middle' }} />
        </div>
        <div className={`circle`} style={{ background: "#CCC" }} onClick={onNextPage}>
          <FaArrowRight size="1.1em" color="#f8f8ff" style={{ verticalAlign: 'middle' }} />
        </div>
      </div>
      <form action="https://www.amazon.com/Reflections-9-Stories-11-Poems/dp/B0B112GRKS" method="get" target="_blank">
        <button type="submit" className="share" style={{ background: snap.color }}>
          PURCHASE
          <FaShoppingCart size="1.3em" />
        </button>
      </form>
    </div>
  );
}
