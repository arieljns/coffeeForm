import React from "react";
import ThankImg from '../assets/Asset Web/manualbrew.svg'
import { easeInOut, motion } from "framer-motion";

const ThankPage = () => {
  return (
    <div>
      <motion.p
        initial={{ y: 0 }}
        animate={{ y: -100 }}
        transition={{
          duration: 1,
          ease: easeInOut
        }}
      >Thank You For Trusting Blend Theory</motion.p>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -100 }}
        transition={{
          duration: 1,
          ease: easeInOut,
          delay: 0.5
        }}
      >
        <img src={ThankImg} alt="thank-you-image" width={200} height={200}></img>
      </motion.div>
    </div>
  )
}



export default ThankPage