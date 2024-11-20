import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as TampingCoffeeSVG } from "../assets/Asset Web/tampingCoffee.svg"
import { useUpload } from "../context/preferencesContext"
import staticData from "../staticData/staticData"
import './post-order.css'
import { easeInOut, motion } from "framer-motion"
import CoffeePng from "../assets/3d/iced coffee.png"

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
          <h1>{recipe.title}</h1>
            <img className="responsive-img" src={CoffeePng} alt="coffee"></img>
          </div>
          <p className="taste-profile">{recipe.description}</p>
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
                    <img src={ingredient.name.includes("coffee") || ingredient.name.includes("kopi") ? staticData[0].imgSrc : staticData[index].imgSrc} alt="icons-ingredient" />
                    <p className="desc">{staticData[index].description}</p>
                  </div>
                  <hr></hr>
                </div>
              ))}
            </div>
          
        </motion.div>}
      <div className="add-ons">
        
        <div className="ingredient-container">

          <div >
            <div className="addons-name">
              <p>Foam</p>
              <input type="radio" name="ingredient" value="Foam" />
            </div>
            <div className="ingredient-desc">
              <img src={staticData[0].imgSrc} alt="icons-ingredient" />
              <p className="desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit quis aspernatur a!</p>
            </div>
            <hr />
            <div className="addons-name">
              <p>Caramel Syrup</p>
              <input type="radio" name="ingredient" value="Foam" />
            </div>

            <div className="ingredient-desc">
              <img src={staticData[1].imgSrc} alt="icons-ingredient" />
              <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam!</p>
            </div>
            <hr />
            <div className="addons-name">
              <p>Pystachio Syrup</p>
              <input type="radio" name="ingredient" value="Foam" />
            </div>
            <div className="ingredient-desc">
              <img src={staticData[2].imgSrc} alt="icons-ingredient" />
              <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <hr />
          </div>

        </div>
      </div>
      <div className='button-container'>
 
        <button onClick={handleSubmit} className="payment">Pembayaran </button>
      </div>

    </div>
  )
}



export default PostOrder