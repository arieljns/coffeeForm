import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUpload } from "../context/preferencesContext"
import staticData from "../staticData/staticData"
import './post-order.css'
import { easeInOut, motion } from "framer-motion"
import AddOns from "../components/AddOns"
import CoffeePng from "../assets/icons/SVG/Cold-brew.svg"


const PostOrder = () => {
  //make a routing 
  const navigateOrder = useNavigate()
  const navigateRegenerate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const { uploadPreferencesData } = useUpload()




  const handleRegenerate = () => {

    let retrievePreferences = localStorage.getItem("preferences");
    if (retrievePreferences) {
      try {

        const preferences = JSON.parse(retrievePreferences);
        console.log('preferences from local', JSON.stringify(preferences, null, 2));
        uploadPreferencesData(preferences);
      } catch (error) {
        console.error('Error parsing preferences:', error);
      }
    }

    navigateRegenerate("/post-order");
  }



  useEffect(() => {
    let responseLocal = JSON.parse(localStorage.getItem("recipeData"))
    if (responseLocal) {
      setRecipe(responseLocal)
      console.log("this is recipe: ", recipe)
    } else {
      console.log('failed to retrieve data from local storage')
    }
  }, [])


  const handleSubmit = () => {
    navigateOrder("/payment")
  }

  return (
    <div className="post-order">
      {recipe &&
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: easeInOut
          }}

          className="parent">

          <div className="img-container">
            <div className="container-title">
              <h1>{recipe.title}</h1>
              <img className="responsive-img" width={100} height={100} src={CoffeePng} alt="coffee"></img>
            </div>
            <hr></hr>
            <p className="taste-profile">{recipe.description}</p>
          </div>

          <div className="decoy">
            <div className="information-container">
              <div className="time-estimation">
                <h3>Estimasi Waktu</h3>
                <p>{recipe.prep_time_minutes} menit</p>
              </div>
              <div className="servings">
                <h3>Servings</h3>
                <p>12 Oz </p>
              </div>
            </div>
          </div>
          <p className="desc question">Tidak Suka Dengan Menunya?</p>
          <button onClick={handleRegenerate} className="regenerate">Beri Saya Menu Lain</button>

          <div className="decoy"></div>
          <div className="ingredient-container">
            {recipe.ingredients.map((ingredient, index) => (
              <div className="ingredient-name" key={index}>
                <p>{ingredient.name}</p>
                <div className="ingredient-desc">
                  <img width={40} height={40} src={ingredient.name.includes("coffee") || ingredient.name.includes("kopi") ? staticData[0].imgSrc : staticData[index].imgSrc} alt="icons-ingredient" />
                  <p className="desc">{staticData[index].description}</p>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>

        </motion.div>}
      <div className="add-ons">
      <p>Add Ons:</p>
        <AddOns 
          recipe={recipe}
        />
      </div>

      <div className='button-container'>

        <button onClick={handleSubmit} className="payment">Pembayaran </button>
      </div>

    </div>
  )
}



export default PostOrder