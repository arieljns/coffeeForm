import staticData from "../staticData/staticData";
import useEmblaCarousel from "embla-carousel-react";
import "./addOns.css";
import { useState } from "react";

const AddOns = ({ recipe }) => {
  // Debugging log
  console.log("addons:", recipe?.add_ons);
  const [selectedIndex, setSelectedIndex] = useState(null)

  // Initialize carousel
  const [emblaRef] = useEmblaCarousel();

  // Handle missing recipe or add_ons
  if (!recipe || !recipe.add_ons) {
    return (
      <div className="add-ons-container">
        <p>No add-ons available</p>
      </div>
    );
  }

  const handleClick = (index) => {
    console.log(`index ${index} di klik`)
    setSelectedIndex(index)
  }
  return (
    <div className="add-ons-container">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {/* Render add-ons dynamically */}
          {recipe.add_ons.length > 0 ? (
            recipe.add_ons.map((item, index) => (
              <div className="embla__slide" key={index}
                onClick={() => { handleClick(index) }}
                style={selectedIndex === index ? 
                {background:' linear-gradient(to left, brown 20%, rgba(0, 0, 0, 0.9))',
                 boxShadow:"0 -2px 10px rgba(0, 0, 0, 0.2)" ,
                 transition: "background 0.7s ease-in-out, box-shadow 0.3s ease-in-out"
                 } : undefined}
              >
                <img
                  width={40}
                  height={40}
                  src={staticData[index + 1]?.imgSrc || ""}
                  alt="Addon-Image"
                />
                <div>
                  <p>{item}</p>
                  <p className="desc-add">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No add-ons available</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddOns;
