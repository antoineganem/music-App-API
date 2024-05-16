import {Routes,Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/DashBoard';
import Register from './components/Register';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  )
}

export default App
