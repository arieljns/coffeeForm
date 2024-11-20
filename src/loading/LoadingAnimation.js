import React from "react";
import { motion } from "framer-motion";
import './loading.css';
import { ReactComponent as NgadukKopiSVG } from '../assets/Asset Web/ngadukkopi.svg';

const LoadingAnimation = () => {
  return (
    <motion.div
      className="ball"
      animate={{
        scale: [1, 1.1, 1]  // This defines the scale animation loop
      }}
      transition={{
        duration: 2,   
        repeat: Infinity,  
        repeatType: "loop",  
        ease: "easeInOut"   
      }}
    >
      <NgadukKopiSVG width={200} height={200} />
      <h4>Performing Magic....</h4>
    </motion.div>
  );
};

export default LoadingAnimation;
