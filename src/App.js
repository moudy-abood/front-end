import { BrowserRouter, Routes, Route } from 'react-router-dom';

import User from './containers/User/User';
import Address from './containers/Address';
import Profile from './containers/User/Profile';
import Layout from './components/Layout/Layout';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route path="/user" element= {<User/>} />
      <Route path="/user/profile" element={<Profile/>} />
      <Route path="/address" element= {<Address/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
