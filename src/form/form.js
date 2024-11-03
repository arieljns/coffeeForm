import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./form.css"
import concentratedIllustration from "../assets/undraw_conversation_re_c26v.svg"
import CoffeeMakerOutlinedIcon from '@mui/icons-material/CoffeeMakerOutlined';
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
import CoffeeWithFriends from "../assets/undraw_coffee_with_friends_3cbj.svg"
import Choices from "../assets/undraw_choices.svg"
import Preferences from "../assets/undraw_preferences_re_49in.svg"
import SubmitIllustration from "../assets/undraw_publish_article_re_3x8h.svg"
import { useNavigate } from 'react-router-dom';


import uploadOrderData from '../api/uploadFormData';

const ScrollableForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    beverageType: '',
    sweetness: '',
    milk: '',
    creaminess: ''
  });
  //navigate to post-order page
  const navigate = useNavigate()
  const scrollRefs = {
    question1: useRef(null),
    question2: useRef(null),
    question3: useRef(null),
    question4: useRef(null),
    question5: useRef(null)
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
  }, [step]);

  const handleNext = (currentStep) => {
    setStep(currentStep + 1);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData)
  };

  const handleSubmit = async () => {

    try {
      let resultFormData = await uploadOrderData(formData)
      navigate('/post-order')
      console.log("berhasil mengirim Data", resultFormData)
    } catch (error) {
      console.error("gagal untuk mengirimkan form data: ", error)
    }

  }

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
          transition={{ duration: 0.1 }}
        >
          <img className='initial-illustration' height={250} width={200} alt={formData.beverageType} src={Preferences} />
          <h2>Would You Like Some Coffee Or Tea?</h2>
          <div className='choices-container'>
            <div className='customer-choice' onClick={() => { handleInputChange('beverageType', 'Kopi'); handleNext(1); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              Kopi
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('beverageType', 'Teh'); handleNext(1); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              Teh
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
            transition={{ duration: 0.1 }}
          >
            <h2>A sweet {formData.beverageType} or a concentrated one?</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'manis'); handleNext(2); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              sweet
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'pekat'); handleNext(2); handleSubmit() }}>
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
            transition={{ duration: 0.1 }}
          >
            <img className='initial-illustration' height={160} width={160} alt={formData.beverageType} src={CoffeeWithFriends} />
            <h2>Would you like your {formData.beverageType} with milk?</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('milk', 'dengan susu'); handleNext(3); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              Use Milk
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('milk', 'tanpa susu'); handleNext(3); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              Don't Use Milk
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
            transition={{ duration: 0.1 }}
          >
            <img className='initial-illustration' height={160} width={160} alt={formData.beverageType} src={Choices} />
            <h2>Would you like your {formData.beverageType} to be creamy?</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('creaminess', 'creamy'); handleNext(4); }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              Creamy
            </div>
            <div className='customer-choice' onClick={() => { handleInputChange('creaminess', 'tidak creamy'); handleNext(4); }}>
              <EmojiFoodBeverageOutlinedIcon style={{ height: 50, width: 50 }} />
              Not Creamy
            </div>
          </motion.div>
        </div>
      )}
      {step >= 5 && (
        <div className='user-answers' ref={scrollRefs.question5}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <img className='initial-illustration' height={160} width={160} alt={formData.beverageType} src={SubmitIllustration} />
            <h2>Klik Submit Untuk Konfirmasi Ordermu</h2>
            <div className='customer-choice' onClick={() => { handleInputChange('sweetness', 'sweet'); handleSubmit() }}>
              <CoffeeMakerOutlinedIcon style={{ height: 50, width: 50 }} />
              Submit
            </div>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ScrollableForm;
