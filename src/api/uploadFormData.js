import axios from "axios";


const uploadOrderData = async (formData) => {
  try {
    let res = await axios.post("http://localhost:3000/coffee/form", formData, {
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