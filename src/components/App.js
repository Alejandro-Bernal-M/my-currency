import '../styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import CurrencyDescription from '../routes/CurrencyDescription';


function App() {

  return(
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<CurrencyDescription />} />
  </Routes>
  )
}

export default App;
