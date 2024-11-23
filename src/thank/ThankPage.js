import React from "react";
import loadingOrnament from '../assets/blendTheoryAssets/ornamenLoading.png'

const ThankPage = () => {
  return (
    <div>
      <div className="thank-container">
        <img rel="preload" src={loadingOrnament} alt="thank-img" width={300} height={300} />
      </div>

      <p>Makasih ya Sudah Berbelanja Sama Blend Theory</p>
    </div>
  )
}



export default ThankPage