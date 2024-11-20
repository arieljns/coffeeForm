import axios from "axios";
import { useState } from "react";


const uploadOrderData = async (formData) => {
  try {
    let res = await axios.post("http://localhost:8080/coffee/form", formData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(res.data)
  } catch (error) {
    console.error(error)
    throw error
  }
}


export default uploadOrderData