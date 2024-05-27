import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddResource from './components/AddResource';
import LoginPage from './components/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/GlobalStyles';
const App = () => {
  return (
    <Router>
    <GlobalStyle />

      <Routes>
      <Route exact path="/" element={<LoginPage/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/addresource" element={<AddResource />} />
      </Routes>
      <ToastContainer position="bottom-center" />
    </Router>
  );
};

export default App;
