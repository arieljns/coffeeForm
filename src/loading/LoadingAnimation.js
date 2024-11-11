import React from "react";
import { motion } from "framer-motion";
import './loading.css'

const LoadingAnimation = () => {
  return (
    <motion.div className="ball" animate={{x:100}} whileTap={{scale:100}} >

    </motion.div>
  )
}


export default LoadingAnimation