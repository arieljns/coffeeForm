import './App.css';
import Form from './form/form';
import PostOrder from './submittedForm/PostOrder';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/post-order' element={<PostOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
