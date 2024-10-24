import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./form.css"
import initialIllustration from "../assets/undraw_coffee_re_x35h.svg"
import concentratedIllustration from "../assets/undraw_conversation_re_c26v.svg"
import coffeeIllustration from "../assets/Brazuca - Pride Standing.png"
import CoffeeMakerOutlinedIcon from '@mui/icons-material/CoffeeMakerOutlined';
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
import CoffeeWithFriends from "../assets/undraw_coffee_with_friends_3cbj.svg"
import Choices from "../assets/undraw_choices.svg"
import Preferences from "../assets/undraw_preferences_re_49in.svg"

const ScrollableForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    beverageType: '',
    sweetness: '',
    milk: '',
    creaminess: ''
  });

  const scrollRefs = {
    question1: useRef(null),
    question2: useRef(null),
    question3: useRef(null),
    question4: useRef(null),
  };

  useEffect(() => {
    const nextQuestionRef = scrollRefs[`question${step}`]?.current;

    if (nextQuestionRef) {
      nextQuestionRef.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      console.error('Element not found');
    }
  }, [step]); // Runs when the step changes

  const handleNext = (currentStep) => {
    // Simply move to the next step
    setStep(currentStep + 1);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const progressBar = (currentStep) => {
    let res = Math.floor((currentStep / 4) * 100)
    return res
  }

  return (
    <div className="form-container">

      {/* PROGRESS BAR */}
      <div className='progress-bar'>
        <div className='percentage' style={{ width: `${progressBar(step)}%` }}></div>
      </div>
      {/* Question 1 */}
      <div className='questions-div' ref={scrollRefs.question1}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img className='initial-illustration' height={250} width={200} alt={formData.beverageType} src={Preferences} />
          <h2>Would You Like Some Coffee Or Tea?</h2>
          <div className='choices-container'>
            <div className='customer-choice' onClick={() => { handleInputChange('beverageType', 'coffee'); handleNext(1); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              coffee
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('beverageType', 'tea'); handleNext(1); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              tea
            </div>
          </div>
        </motion.div>
      </div>

      {/* Question 2 */}
      {step >= 2 && (
        <div className='user-answers' ref={scrollRefs.question2}>
          <img className='initial-illustration' height={160} width={160} alt={formData.beverageType} src={concentratedIllustration} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>A sweet {formData.beverageType} or a concentrated one?</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'sweet'); handleNext(2); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              sweet
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'concentrated'); handleNext(2); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              concentrated
            </div>
          </motion.div>
        </div>
      )}

      {/* Question 3 */}
      {step >= 3 && (
        <div className='user-answers' ref={scrollRefs.question3}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img className='initial-illustration' height={160} width={160} alt={formData.beverageType} src={CoffeeWithFriends} />
            <h2>Would you like your {formData.beverageType} with milk?</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'sweet'); handleNext(3); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              Yes
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'concentrated'); handleNext(3); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              No
            </div>
          </motion.div>
        </div>
      )}

      {/* Question 4 */}
      {step >= 4 && (
        <div className='user-answers' ref={scrollRefs.question4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img className='initial-illustration' height={160} width={160} alt={formData.beverageType} src={Choices} />
            <h2>Would you like your {formData.beverageType} to be creamy?</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'sweet'); handleNext(4); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              Yes
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'concentrated'); handleNext(4); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              No
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ScrollableForm;
