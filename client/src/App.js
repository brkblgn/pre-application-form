import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Form from './pages/Form';
import Answer from './pages/Answer';
import Answers from './pages/Answers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />}/>
          <Route path='/answers' element={<Answers />}/>
          <Route path='/answer/:id' element={<Answer />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;