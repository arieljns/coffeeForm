import './App.css';
import Form from './form/form';
import LoadingAnimation from './loading/LoadingAnimation';
import PaymentPage from './payment/payment';
import PostOrder from './submittedForm/PostOrder';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThankPage from './thank/ThankPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/post-order' element={<PostOrder />} />
          <Route path='/loading' element={<LoadingAnimation />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/thank' element={<ThankPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
