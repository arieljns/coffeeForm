import React from "react";
import { motion } from "framer-motion";
import './loading.css';
import { ReactComponent as NgadukKopiSVG } from '../assets/Asset Web/ngadukkopi.svg';
import ornamenLoading from '../assets/blendTheoryAssets/ornamenLoading.png'

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
      <img rel="preload"  src={ornamenLoading} alt='ornamen-loading' width={250} height={250} />
  
    </motion.div>
  );
};

export default LoadingAnimation;
