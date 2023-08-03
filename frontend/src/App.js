import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './pages/Form/Form';
import Apartments from './pages/Apartments/Apartments';
import Managers from './pages/Managers/Managers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/apartaments' element={<Apartments />} />
        <Route path='/managers' element={<Managers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;