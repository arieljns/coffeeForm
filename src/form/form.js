import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./form.css";
import { ReactComponent as AeropressSVG } from "../assets/Asset Web/aeropress.svg"
import { ReactComponent as ManualBrewSVG } from "../assets/Asset Web/manualbrew.svg"
import { ReactComponent as LatteArtSVG } from "../assets/Asset Web/latteart.svg"
import { ReactComponent as MakingEspressoSVG } from "../assets/Asset Web/makingespresso.svg"
import { ReactComponent as TampingCoffeeSVG } from "../assets/Asset Web/tampingCoffee.svg"
import { useNavigate } from 'react-router-dom';
import { useUpload } from '../context/preferencesContext';

const ScrollableForm = () => {
  const { uploadPreferencesData } = useUpload()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    beverageType: '',
    sweetness: '',
    milk: '',
    creaminess: ''
  });
  const [selectedChoices, setSelectedChoices] = useState({});



  const navigate = useNavigate();

  const scrollRefs = {
    question1: useRef(null),
    question2: useRef(null),
    question3: useRef(null),
    question4: useRef(null),
    question5: useRef(null)
  };

  useEffect(() => {

    if (scrollRefs[`question${step}`] && scrollRefs[`question${step}`].current) {
      scrollRefs[`question${step}`].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center'
      });
    }
  }, [step]);

  const handleNext = (currentStep) => {
    console.log(currentStep)
    setStep(currentStep + 1);
  }

  const handleInputChange = (name, value, question) => {
    setFormData({
      ...formData,
      [name]: value
    });
    setSelectedChoices({
      ...selectedChoices,
      [question]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await uploadPreferencesData(formData)
      navigate('/post-order');
      localStorage.setItem("preferences", JSON.stringify(formData))
    } catch (error) {
      console.error("Failed to submit form data: ", error);
    }
  };

  const progressBar = (currentStep) => Math.floor((currentStep / 5) * 100);

  const svgAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  };

  const selectedStyle = {
    backgroundColor: "#37738c",
    color: "#fff"
  };

  return (

    <div className="form-container">

      <div className="progress-bar">
        <div className="percentage" style={{ width: `${progressBar(step)}%` }}></div>
      </div>

      <div className=" user-answers">
        <motion.div
          ref={scrollRefs.question1}
          initial={{ opacity: 1 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="questions-div"
        >
          <AeropressSVG width={250} height={250}></AeropressSVG>
          <h2>Hari Ini Kamu Mau Apa?</h2>
          <div className="choices-container">
            <div
              className="customer-choice"
              style={selectedChoices.question1 === 'Kopi' ? selectedStyle : {}}
              onClick={() => { handleInputChange('beverageType', 'Kopi', 'question1'); handleNext(1); }}
            >
              Kopi
            </div>
            <div
              className="customer-choice"
              style={selectedChoices.question1 === 'Teh' ? selectedStyle : {}}
              onClick={() => { handleInputChange('beverageType', 'Teh', 'question1'); handleNext(1); }}
            >
              Teh
            </div>
          </div>
        </motion.div>

        {step >= 2 && (
          <div ref={scrollRefs.question2} className="user-answers">
            <motion.div animate={svgAnimation}>
              <ManualBrewSVG width={250} height={250}></ManualBrewSVG>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              Mau {formData.beverageType} Yang Manis Atau Pekat?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="customer-choice"
              style={selectedChoices.question2 === 'manis' ? selectedStyle : {}}
              onClick={() => { handleInputChange('sweetness', 'manis', 'question2'); handleNext(2); }}
            >
              Sweet
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="customer-choice"
              style={selectedChoices.question2 === 'pekat' ? selectedStyle : {}}
              onClick={() => { handleInputChange('sweetness', 'pekat', 'question2'); handleNext(2); }}
            >
              Concentrated
            </motion.div>
          </div>
        )}

        {step >= 3 && (
          <div ref={scrollRefs.question3} className="user-answers">
            <motion.div animate={svgAnimation}>
              <LatteArtSVG width={250} height={250}></LatteArtSVG>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              Mau {formData.beverageType} nya Pakai Susu?
            </motion.h2>
            <motion.div
              className="customer-choice"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={selectedChoices.question3 === 'dengan susu' ? selectedStyle : {}}
              onClick={() => { handleInputChange('milk', 'dengan susu', 'question3'); handleNext(3); }}
            >
              Iya Pake Susu
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="customer-choice"
              style={selectedChoices.question3 === 'tanpa susu' ? selectedStyle : {}}
              onClick={() => { handleInputChange('milk', 'tanpa susu', 'question3'); handleNext(3); }}
            >
              Ga Pake Susu
            </motion.div>
          </div>
        )}

        {step >= 4 && (
          <div ref={scrollRefs.question4} className="user-answers">
            <motion.div animate={svgAnimation}>
              <MakingEspressoSVG width={250} height={250}></MakingEspressoSVG>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              Mau {formData.beverageType} nya Creamy?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="customer-choice"
              style={selectedChoices.question4 === 'creamy' ? selectedStyle : {}}
              onClick={() => { handleInputChange('creaminess', 'creamy', 'question4'); handleNext(4); }}
            >
              Iya Creamy
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="customer-choice"
              style={selectedChoices.question4 === 'tidak creamy' ? selectedStyle : {}}
              onClick={() => { handleInputChange('creaminess', 'tidak creamy', 'question4'); handleNext(4); }}
            >
              Ga Creamy
            </motion.div>
          </div>
        )}

        {step >= 5 && (
          <div ref={scrollRefs.question5} className="user-answers">
            <motion.div animate={svgAnimation}>
              <TampingCoffeeSVG height={250} width={250}></TampingCoffeeSVG>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
              Submit Order Kamu Disini
            </motion.h2>
            <motion.div
              className="customer-choice"
              onClick={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Submit Order
            </motion.div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ScrollableForm;
