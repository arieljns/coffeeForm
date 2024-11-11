import './App.css';
import Form from './form/form';
import LoadingAnimation from './loading/LoadingAnimation';
import PostOrder from './submittedForm/PostOrder';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/post-order' element={<PostOrder />} />
          <Route path='/loading' element={<LoadingAnimation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
