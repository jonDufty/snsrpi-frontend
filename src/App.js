import './App.css';
import "antd/dist/antd.css";
import "./index.css";
import MainLayout from './components/MainLayout';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
