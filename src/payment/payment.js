import React from "react";
import Qris from "../assets/qris.png"
import { useNavigate } from "react-router-dom";


const PaymentPage = () => {

  const navigateThank= useNavigate()

  const handleNextEvent= ()=>{
    navigateThank('/thank')
  }
  return (
    <div>
      <p>Sqan QR dibawah Untuk Melanjutkan</p>
      <img src={Qris} width={250}></img>
      <button onClick={handleNextEvent}>Lanjut</button>
    </div>
  )
}



export default PaymentPage