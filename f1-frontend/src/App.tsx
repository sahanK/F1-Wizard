import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './views/Home/Home';
import Login from './views/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={ Home } />
        <Route path='/login' Component={ Login } />
      </Routes>
    </Router>
  );
}

export default App;
