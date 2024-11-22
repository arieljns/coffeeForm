import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import LoadingAnimation from '../loading/LoadingAnimation';

const PreferencesContext = createContext();

export const useUpload = () => useContext(PreferencesContext);

export const UploadProvider = ({ children }) => {
  const [preferencesData, setPreferencesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const uploadPreferencesData = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:3000/coffee/form',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('this upload Preferences Data is fire', data.recipe.add_ons )
      setPreferencesData(data.recipe);
    } catch (error) {
      console.error('Failed to upload the data:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (preferencesData && Object.keys(preferencesData).length > 0) {
      localStorage.setItem('recipeData', JSON.stringify(preferencesData));
      console.log("data recipe is saved")
    }
  }, [preferencesData]);

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <PreferencesContext.Provider
      value={{ preferencesData, setPreferencesData, loading, uploadPreferencesData }}
    >
      {children}
      {error && (
        <p
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'red',
            fontWeight: 'bold',
            zIndex: 10000,
          }}
        >
          The App is having an error
        </p>
      )}
    </PreferencesContext.Provider>
  );
};
